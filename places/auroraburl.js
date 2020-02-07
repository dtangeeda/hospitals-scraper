module.exports = {
      // id should match file name
      id: 'auroraburl',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.aurorahealthcare.org/-/media/aurorahealthcareorg/documents/billing-insurance/hospital-standard-charges/burlington-standard-charges.csv',
        schema: {
          // fields to remove from returned objects
          exclude: [ 'location' ],
          // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'location', 'charge_code', 'service', 'price' ],
            range: 2
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.aurorahealthcare.org',
  collection: 'WI',
  common_name: 'Aurora Medical Center in Burlington',
  location: {
    street: '750 W Virginia St',
    city: 'Milwaukee',
    state: 'WI',
    zip: '53204'
  },
  contact: {
    phone_local: '8003262250',
    phone_free: '8003262250'
  }
};