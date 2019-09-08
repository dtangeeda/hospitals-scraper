module.exports = {
    id: 'uvahealth',
    home: 'https://uvahealth.com',
    common_name: 'University of Virginia Health System',
    location: {
      street: '1215 Lee Street',
      city: 'Charlottesville',
      state: 'VA',
      zip: '22903'
    },
    contact: {
      phone_local: '4349240000',
      phone_free: '4349240000',
      email: ''
    },
    data: [
      {
        url: 'https://uvahealth.com/services/billing-insurance/common-prices',
        evaluator: () => {
          let data = [];
          let h2List = document.querySelectorAll( '#block-uva-content > article > div > div > h2' );
          let serviceTypes = [];
          let clean = str => str.replace( /^\s|\s$|[\n\r]/g, '' ).replace( /\s\s/g, ' ' ).replace( /\$\s/g, '$' );
          h2List.forEach( h2 => {
            serviceTypes.push( clean( h2.innerText ) );
          } );
          serviceTypes = serviceTypes.filter( txt => txt !== '' );
          let tables = document.querySelectorAll( '#block-uva-content > article > div > div > div > table' );
          let tableCounter = 0;
          tables.forEach( table => {
            let json = {};
            table.querySelectorAll( 'tr' ).forEach( tr => {
              let cells = tr.querySelectorAll( 'td' );
              if ( cells.length ) {
                let service = cells[0].querySelector('p');
                let term = cells[1].querySelector('h6') || cells[1].querySelector('p');
                let price = cells[2].querySelector('p');
                json.service = clean( service.innerText );
                if ( term ) {
                  json.billing_term = term.outerText;
                }
                json.price = clean( price.innerText );
                json.service_type = serviceTypes[ tableCounter ];
                data.push( json );
                json = {};
              }
            } );
            tableCounter += 1;
          } );
          return data;
        }
      }
    ]

};