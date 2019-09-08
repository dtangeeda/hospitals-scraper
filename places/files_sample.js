module.exports = {
      // id should match file name
      id: 'files_sample',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.atlanticare.org/assets/images/services/price-transparency/2019finalpricetransparencyforjan1.csv',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'service', 'price' ],
            range: 1  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.atlanticare.org',
  collection: 'NJ',
  common_name: 'AtlantiCare Regional Medical Center',
  location: {
    street: '1925 Pacific Avenue',
    city: 'Atlantic City',
    state: 'NJ',
    zip: '08401'
  },
  contact: {
    phone_local: '6093454000',
    phone_free: '8885691000'
  }
};