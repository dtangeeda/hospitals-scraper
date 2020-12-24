module.exports = {
      // id should match file name
      id: 'files_sample',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.hopkinsmedicine.org/patient_care/patients-visitors/billing-insurance/_docs/fee-schedules/fee-schedule-summary-hopkins.xls',
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
  home: 'https://www.hopkinsmedicine.org/',
  collection: 'MD',
  common_name: 'Johns Hopkins Medicine',
  location: {
    street: '600 N. Wolfe Street',
    city: 'Baltimore City',
    state: 'MD',
    zip: '21231'
  },
  contact: {
    phone_local: '4109552585',
    email: 'socialmedia@jhmi.edu'
  }
};
