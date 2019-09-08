module.exports = {
      // id should match file name
      id: 'mvhohio',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.premierhealth.com/docs/default-source/default-document-library/mvh-chargemaster.csv',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'description', 'charge' ],
            range: 3  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.premierhealth.com/search/?indexCatalogue=full-search-results&wordsMode=AllWords&searchQuery=chargemaster',
  collection: 'OH',
  common_name: 'Miami Valley Hospital',
  location: {
    street: 'One Wyoming St.',
    city: 'Dayton',
    state: 'OH',
    zip: ''
  },
  contact: {
    phone_local: '937-208-8000',
    phone_free: '937-208-8000'
  }
};