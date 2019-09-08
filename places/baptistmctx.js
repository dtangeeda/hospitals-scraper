module.exports = {
      // id should match file name
      id: 'baptistmctx',
      // data is an array of objects
      // if scraping html, url property and value are required
      // if scraping html, evaluator property and method are required
      // if scraping csv, only the files property is required to provide an array of file urls
    data_source: [
      {
        file: 'https://www.baptisthealthsystem.com/docs/librariesproviderbaptist/chargemasters/baptist-medical-center-11-01-18-part-1.xlsx',
        schema: {
            // exclude <array> fields to remove from returned objects... nothing to remove in this data set
           //exclude: ['CDM NAME', 'HOSPITAL'],
            // options object for xlsx node module https://docs.sheetjs.com/#json
          options: {
            raw: true,
            header: [ 'description', 'charge' ],
            range: 2  // don't include header row as data (start at row 2)
          }
        }
      }
    ],
    // if this is a new place, add place data here...
    // or use to update an existing place.
  home: 'https://www.baptisthealthsystem.com/patients/pricing-info-estimates/hospital-pricing-information',
  collection: 'TX',
  common_name: 'Baptist Medical Center',
  location: {
    street: '111 Dallas Street',
    city: 'San Antonio',
    state: 'TX',
    zip: '78205'
  },
  contact: {
    phone_local: '866-309-2873',
    phone_free: '866-309-2873'
  }
};