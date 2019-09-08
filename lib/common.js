const { Readable } = require( 'stream' );

const typeCheck = ( str, method ) => {
  if ( typeof str !== 'string' ) {
      throw new TypeError( method + ' requires input of type string, got type ' + typeof str );
  } else {
      return true;
  }
};

module.exports = {
  objects: {
    isEmpty: o => {
      for ( let p in o ) {
        return false;
      }
      return true;
    }
  },
  streams: {
    toReadStream: data => {
      let readStream;
      if ( data instanceof Readable ) {
        readStream = data;
      } else {
        readStream = new Readable( { objectMode: true } );
        readStream._read = () => {};
        readStream.push( data );
        readStream.push( null );
      }
      return readStream;
    }
  },
  strings: {
    titleCase: str => {
      typeCheck( str, 'titleCase' );
      let toTitleCase = ( s, i ) => {
          let a = s.charAt( 0 );
          let articles = /^(?:a|an|and|of|the)$/i;
          if ( i === 0 || articles.test( s ) === false ) {
              s = a.toUpperCase() + s.slice( 1 );
          }
          return s;
      };
      str = str.toLowerCase();
      return str ? str.split( ' ' ).map( toTitleCase ).join( ' ' ) : str;
    },
    trim: str => {
      typeCheck( str, 'trim' );
      return str.replace( /\s{2,}/g, ' ' ).replace( /^\s|\s$/g, '' );
    },
    uuid: () => {
      let a = 0;
      let b = '';
      for ( ; a++ < 36; b += a * 51 & 52 ? ( a ^ 15 ? 8 ^ Math.random() * ( a ^ 20 ? 16 : 4 ) : 4 ).toString( 16 ) : '' ) {}
      return b;
    }
  }
};