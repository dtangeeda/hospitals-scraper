require('dotenv/config');
const fs = require( 'fs' );
const path = require( 'path' );
const { MongoClient } = require( 'mongodb' );
const uri = process.env.DB_CONNECTION;
const { uuid } = require( './common' ).strings;

module.exports = {
  save: async ( data, placeId, collectionName ) => {
    return new Promise ( ( resolve, reject ) => {
      const client = new MongoClient( uri, { useNewUrlParser: true } );
      let scrapeId = uuid();
      let timestamp = new Date().toISOString();
      client.connect( async err => {
        if ( !err ) {
          let db = client.db( 'hospitalPrices' );
          let scrapeLogs = db.collection( 'scrape_log' );
          let log = {
            id: scrapeId,
            collection: collectionName,
            place: placeId,
            stamp: timestamp
          };
          await scrapeLogs.insertOne( log );
          let targetCollection = db.collection( collectionName );
          data.forEach( obj => {
            obj.scrapeId = scrapeId;
          } );
          await targetCollection.insertMany( data, ( err, res ) => {
            if ( err ) {
              reject( err );
            }
            resolve( res );
            client.close();
          } );
        } else {
          reject( err );
        }
      } );      
    } );
  },

  addNewPlace: async placeId => {
    const client = new MongoClient( uri, { useNewUrlParser: true } );
    const base = path.parse( path.resolve() ).dir;
    const filePath = path.join( base, 'hospitals-pricedata/places', placeId );
    const file = filePath + '.js';
    return new Promise( ( resolve, reject ) => {
      if ( fs.existsSync( file ) ) {
        let place = require( filePath );
        let location = place.location;
        let contact = place.contact;
        let dataSource = place.data_source.map( o => {
          if ( o.evaluator ) {
            o.evaluator = o.evaluator.toString();
          }
          return o;
        } );
        let saveObject = {
          'id': place.id,
          'home': place.home,
          'collection': place.collection,
          'data_source': dataSource,
          'common_name': place.common_name
        };
        if ( location ) {
          for ( let p in location ) {
            saveObject[ 'location.' + p ] = location[ p ];
          }
        }
        if ( contact ) {
          for ( let p in contact ) {
            saveObject[ 'contact.' + p ] = contact[ p ];
          }
        }
        let filter = { id: place.id }
        let update = {
          $set: saveObject
        };
        let options = {
          upsert: true
        };
        let callBack = ( err, res ) => {
          if ( err ) {
            reject( err );
          }
          resolve( res );
        };
        client.connect( async err => {
          let db = client.db( 'hospitalPrices' );
          let places = db.collection( 'places' );
          await places.updateOne( filter, update, options, callBack );
          client.close();
        } );
      } else {
        reject( 'file not found' );
      }
    } );
  },

  exportToJSON: config => {
    return new Promise( ( resolve, reject ) => {
      const client = new MongoClient( uri, { useNewUrlParser: true } );
      let { dbName, collectionName, query, fileName } = config;
      query = JSON.parse( query );
      client.connect( err => {
        if ( !err ) {
          const collection = client.db( dbName ).collection( collectionName );
          let cursor = collection.find( query, { projection: { _id: 0 } } );
          cursor.toArray( ( err, items ) => {
            if ( !err ) {
              items = items.reduce( ( prev, curr ) => {
                curr = JSON.stringify( curr );
                return prev + curr + '\n';
              }, '' );
              fs.writeFile( `./exports/${fileName}.json`, items, 'utf8', resolve );
            } else { 
              reject( err );
            }
          } );
          cursor.once( 'end', () => client.close() );
        }
      } );
    } );
  }
};
