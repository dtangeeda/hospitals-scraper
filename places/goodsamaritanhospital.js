module.exports = {
      // id should match file name
      id: 'goodsamaritanhospital',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.goodsam.org/documents/Internet-CDM-and-DRG-Total-Charge-List.xlsx',
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
  home: 'https://www.goodsam.org/',
  collection: 'CA',
  common_name: 'Good Samaritan Hospital',
  location: {
    street: '1225 Wishire Blvd',
    city: ' Los Angeles',
    state: 'CA',
    zip: '90017'
  },
  contact: {
    phone_local: '2139772121',
    email: 'jsales@goodsam.org'
  }
};
