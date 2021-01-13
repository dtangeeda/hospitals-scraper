module.exports = {
      // id should match file name
      id: 'eicaminohealth',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.elcaminohealth.org/sites/default/files/2020-12/el-camino-hospital-chargemaster-01012021.xlsx',
        file: 'https://www.elcaminohealth.org/sites/default/files/2020-12/el-camino-hospital-chargemaster-gross-charges-01012021.csv',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
          exclude: [ 'number' ],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'number', 'service', 'price' ],
            range: 1  // If value is 1, means it starts at row 2.
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.elcaminohealth.org/',
  collection: 'CA',
  common_name: 'El Camino Health',
  location: {
    street: '2500 Grant Road,',
    city: 'Mountain View',
    state: 'CA',
    zip: '94040'
  },
  contact: {
    phone_free: '6509625836'
    email: 'mycarehelp@elcaminohealth.org'
  }
};
