module.exports = {
      // id should match file name
      id: 'medstarwashington',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://ct1.medstarhealth.org/content/uploads/sites/6/2019/01/MWHC-July-2019-CDM-Transparency-File.xlsx?',
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
  home: 'https://www.medstarwashington.org/',
  collection: 'NW',
  common_name: 'MedStar Washington Hospital Center',
  location: {
    street: '110 Irving St',
    city: 'Washington, DC',
    state: 'NW',
    zip: '20010'
  },
  contact: {
    phone_local: ' 2028773627',
    phone_free: '2028777000'
  }
};
