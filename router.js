const express = require( 'express' );
const path = require( 'path' );
const { scrape, scrapeLink } = require( './lib/pricepuppet' );
const { addNewPlace, exportToJSON } = require( './lib/mongo' );
const pub = path.join( global.__basedir, 'client', 'build' );

 /******************
     * This is Router file to support the Scraper Tool's endpoints that call the pricepuppet.js and the mongo.js *
 ******************/

module.exports = {
  createRoutes: app => {

    /******************
     * default route  *
     ******************/
    app.use( express.static( pub ) );
    app.get( '/', ( req, res ) => res.sendFile( path.join( pub, 'index.html' ) ) );
    
    /******************
     * service routes *
     ******************/

    /*ADD the Place Data to Database */
    app.get( '/addPlace/:placeID', ( req, res ) => {
      const placeName = req.params.placeID;
      if ( placeName ) {
        addNewPlace( placeName ).then( report => res.send( report ) ).catch( e => res.send( e ) );
      } else {
        res.send( 'Error: Missing placeID' );
      }
    } );

    /*Scrape the Hospital Price webpage based on the URL */
    app.get( '/scrapeLink/:url', ( req, res ) => {
      const wwwReg = /^(https?)?[:\/\s]*(www)?[.\s]?[^\s\/$.?#-%]{3,}\.[a-z]{2,5}[\/\w$.?#-%]*/i;
      const url = decodeURIComponent( req.params.url );
      if ( url && wwwReg.test( url ) ) {
        scrapeLink( url ).then( page => {
          res.send( page );
          console.log( `Scraped ${url}` );
        } ).catch( e => res.send( e ) );
      } else {
        res.send( 'Error: Missing URL' );
      }
    } );

    const scraper = ( res, placeName, willSave ) => {
      scrape( placeName, willSave ).then( data => {
        res.send( data );
        console.log( `Scraped ${placeName}` );
      } ).catch( e => res.send( e ) );
    };

    /*Scrape the data and Save to DB by passing the place id. It will look up the info from places folder or database */
    app.get( '/scrape/:placeID/save', ( req, res ) => {
      const placeName = req.params.placeID;
      if ( placeName ) {
        scraper( res, placeName, true );
      } else {
        res.send( 'Error: Missing placeID' );
      }
    } );

    /*Scrape the data. Do not Save to DB. By passing the place id. It will look up the info from places folder or database */
    app.get( '/scrape/:placeID', ( req, res ) => {
      const placeName = req.params.placeID;
      if ( placeName ) {
        scraper( res, placeName, false );
      } else {
        res.send( 'Error: Missing placeID' );
      }
    } );

    app.get( '/export', ( req, res ) => {
      if ( Object.keys( req.query ).length === 4 ) {
        exportToJSON( req.query ).then( status => res.send( status ) ).catch( e => res.send( e ) );
      } else {
        res.send( `Error: ${4 - Object.keys( req.query ).length} Missing arguments` );
      }
    } );

    /****************
     * error routes *
     ****************/
    app.use( '/favicon.ico', ( req, res ) => {
      res.writeHead( 200, { 'Content-Type': 'image/x-icon' } );
      res.end();
    } );

    app.use( '/404', require( './routes/404' ) );

    app.use( '/500', require( './routes/500' ) );

    // redirect bad routes
    app.all( '*', ( req, res ) => res.redirect( '/404' ) );

    // all other errors...
    app.use( ( req, res ) => res.redirect( '/500' ) );
  }
};