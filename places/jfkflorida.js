module.exports = {
      // id should match file name
      id: 'jfkflorida',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://core.secure.ehc.com/src/util/detail-price-list/EastFloridaDivision_JFKMedicalCenter_CM.csv',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
          // exclude: [],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'procedure', 'description', 'price' ],
            range: 2  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://jfkmc.com',
  collection: 'FL',
  common_name: 'JFK Medical Center',
  location: {
    street: '5301 South Congress Ave',
    city: 'Atlantis',
    state: 'FL',
    zip: '33462'
  },
  contact: {
    phone_local: '5619657300',
    phone_free: '5619657300'
  }
};