global.__basedir = __dirname;

const express = require( 'express' );
const morgan = require('morgan');

const { createRoutes } = require( './router' );

const app = express();

app.use(morgan('combined'));

createRoutes( app );
console.log("Loading the index.js file for the Scraper Tool");

//Start Server for Scraper Engine
app.listen( 5000, () => console.log( 'Listening the Price Scraper Engine on port 5000' ) );

module.exports = app;
