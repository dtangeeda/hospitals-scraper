module.exports = {
      // id should match file name
      id: 'osuwexner',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://wexnermedical.osu.edu/-/media/files/wexnermedical/patient-care/patient-and-visitor-guide/patient-pricing-lists/2019-price-transparency-cdmfinal.xlsx',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'description', 'charge' ],
            range: 1  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://wexnermedical.osu.edu/patient-and-visitor-guide/patient-pricing-lists',
  collection: 'OH',
  common_name: 'Ohio State University Hospital',
  location: {
    street: '410 W. 10th Ave.',
    city: 'Columbus',
    state: 'OH',
    zip: '43210'
  },
  contact: {
    phone_local: '614-293-8000',
    phone_free: '614-293-8000'
  }
};