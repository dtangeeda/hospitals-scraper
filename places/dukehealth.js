module.exports = {
      // id should match file name
      id: 'dukehealth',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.dukehealth.org/sites/default/files/duh_compliant_cy19.xlsx',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
          exclude: [ 'Number' ],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'Number',	'Description', 'Uninsured', 'Insurance' ],
            range: 1  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.dukehealth.org',
  collection: 'NC',
  common_name: 'Duke University Hospital',
  location: {
    street: '5213 S Alston Ave',
    city: 'Durham',
    state: 'NC',
    zip: '27713'
  },
  contact: {
    phone_local: '9195513488',
    phone_free: '9195513488'
  }
};