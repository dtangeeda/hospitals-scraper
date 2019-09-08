const express = require( 'express' );
const router = express.Router();

router.all( '/', ( req, res ) => {
    res.json( { status: 'Error', errorCode: '404', description: 'These are not the droids you are looking for...' } );
} );

module.exports = router;
