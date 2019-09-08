const puppeteer = require( 'puppeteer' );
const fetch = require('node-fetch');
const csvtojson = require( 'csvtojson' );
const XLSX = require( 'xlsx' );
const { MongoClient } = require( 'mongodb' );
const { save } = require( './mongo' );
const uri = process.env.DB_CONNECTION;

const launchBrowser = async () => {
  return await puppeteer.launch( {
    args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080',
    "--proxy-server='direct://'",
    '--proxy-bypass-list=*'
    ],
  } );
};

const parseFile = async ( file, schema ) => {
    let csvFunc = async () => {
      return await fetch( file ).then( res => res.body.pipe( csvtojson() ) );
    };
    let xlsxFunc = async () => {
      return await fetch( file ).then( async res => {
        let buffer = await res.buffer();
        let workbook = XLSX.read( buffer, { type: 'buffer' } );
        let ws = workbook.Sheets[ workbook.SheetNames[ 0 ] ];
        let jsonWB = XLSX.utils.sheet_to_json( ws, schema.options );
        if ( schema.exclude ) {
          jsonWB = jsonWB.map( obj => {
            let keys = Object.keys( obj ).filter( k => !schema.exclude.includes( k ) );
            let newObj = {};
            keys.forEach( k => newObj[ k ] = obj[ k ] );
            return newObj;
          } );
        }
        return jsonWB;
      } );
    };
    let zipXlsxFunc = async () => {
      return await fetch( file ).then( async res => {
        let buffer = await res.buffer();
        let workbook = XLSX.read( buffer, { type: 'buffer' } );
        let ws = workbook.Sheets[ workbook.SheetNames[ 0 ] ];
        let jsonWB = XLSX.utils.sheet_to_json( ws, schema.options );
        if ( schema.exclude ) {
          jsonWB = jsonWB.map( obj => {
            let keys = Object.keys( obj ).filter( k => !schema.exclude.includes( k ) );
            let newObj = {};
            keys.forEach( k => newObj[ k ] = obj[ k ] );
            return newObj;
          } );
        }
        return jsonWB;
      } );
    };

    let components = file.split( '/' );
    components = components[ components.length - 1 ];
    let ext =  /[^\.]+\.(.+)/.test( components ) && RegExp.$1;
    let processingFunc = ext === 'csv' ? csvFunc : ext === 'xlsx' ? xlsxFunc : null;
  
  return await processingFunc();
};

const processRobots = async ( url = '' ) => {
  let httpRoot = url.match( /https?:\/\/w{3}\.[^\/]+/i );
  let robotsPath = httpRoot && httpRoot[ 0 ] + '/robots.txt';
  if ( robotsPath ) {
    let robots = await fetch( robotsPath ).then( async res => await res.text() );
    let disallow = robots.split( /[\n\r]/g )
                      .filter( val => /^disallow/i.test( val ) )
                      .map( val => httpRoot + val.replace( /disallow:\s+/i, '' ) );
    if ( disallow.includes( url ) ) {
      return true;
    }
  }
};

const puppet = {
  scrapeLink: async url => {
    let content = '';
    if ( url ) {
      let banned = await processRobots( url );
      if ( banned ) {
        return `${url} violates robots.txt for this site.`;
      }
      let browser = await launchBrowser();
      let page = await browser.newPage();
      await page.goto( url, { timeout: 0 } );
      content = await page.content();
      browser.close();
    }
    return content;
  },

  scrape: async ( placeName, saveToMongo ) => {
    return await new Promise( ( resolve, reject ) => {
      const client = new MongoClient( uri, { useNewUrlParser: true } );
      client.connect( async err => {
        let collection = client.db( 'hospitalPrices' ).collection( 'places' );
        let place = await collection.find( { 'id': placeName } ).toArray();
        place = place.length && place[ 0 ];
        if ( !place ) {
          // attempt to load flat file
          try {
            place = require( '../places/' + placeName );
          } catch ( err ) {
            reject( placeName + ' not found. ' + err );
          }
        }
        // only process the first data source for now...
        // todo: loop over data array
        let source = place.data_source && place.data_source[ 0 ];
        let data = '';
        if ( source ) {
          let url = source.url;
          if ( url ) {
            // check robots.txt
            let banned = await processRobots( url );
            if ( banned ) {
              reject( `${url} violates robots.txt for this site.` );
            }
            let browser = await launchBrowser();
            let page = await browser.newPage();
            await page.setRequestInterception( true );
            page.on( 'request', req => {
              let resourceType = req.resourceType();
              if ( resourceType === 'stylesheet' || resourceType === 'font' || resourceType === 'image' ) {
                req.abort();
              } else {
                req.continue();
              }
            } );
            await page.goto( url, { timeout: 0 } );
            data = await page.evaluate( eval( source.evaluator ) );
            browser.close();
          } else if ( source.file && source.schema ) {
            data = await parseFile( source.file, source.schema );
          }
        } else {
          reject( 'Source not found.' );
        }
        if ( data && saveToMongo ) {
          data = await save( data, placeName, place.collection );
        }
        resolve( data );
      } );
    } );
  }
};

module.exports = puppet;
