const express = require( 'express' );
const router = express.Router();

router.all( '/', (req, res) => {
    res.json( { status: 'Error', errorCode: '500', description: 'The server has issues... apparently, this is one of them.' } );
} );

module.exports = router;
