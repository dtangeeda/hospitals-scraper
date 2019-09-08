module.exports = {
      // id should match file name
    id: 'eval_sample',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        url: 'https://www.nationwidechildrens.org/your-visit/billing-and-insurance/pay-my-bill/price-information-list',
        evaluator: () => {
          let data = [];
          let h2List = document.querySelectorAll( '#main > article > div.article__rtf.rtf > div:nth-child(2) > div > div > h2' );
          let serviceTypes = [];
          let clean = str => str.replace( /^\s|\s$|[\n\r]/g, '' ).replace( /\s\s/g, ' ' ).replace( /\$\s/g, '$' );
          h2List.forEach( h2 => {
            serviceTypes.push( clean( h2.innerText ) );
          } );
          serviceTypes = serviceTypes.filter( txt => txt !== '' && txt !== 'Labor and Delivery Charges' );
          let tables = document.querySelectorAll( '#main > article > div.article__rtf.rtf > div:nth-child(2) > div > div > table' );
          let tableCounter = 0;
          tables.forEach( table => {
            let json = {};
            table.querySelectorAll( 'tr' ).forEach( tr => {
              let cells = tr.querySelectorAll( 'td' );
              json.service = clean( cells[ 0 ].innerText );
              json.price = clean( cells[ 1 ].innerText );
              json.service_type = serviceTypes[ tableCounter ];
              data.push( json );
              json = {};
            } );
            tableCounter += 1;
          } );
          return data;
        }
      }
    ],
      // if this is a new place, add place data here...
      // or use to update an existing place.
    home: 'https://www.nationwidechildrens.org',
    collection: 'OH',
    common_name: 'Nationwide Children\'s Hospital',
    location: {
      street: '700 Children\'s Drive',
      city: 'Columbus',
      state: 'OH',
      zip: '43205'
    },
    contact: {
      phone_local: '6147222000',
      phone_free: '8007928401',
      email: 'CommunityRelations@NationwideChildrens.org'
    }
};