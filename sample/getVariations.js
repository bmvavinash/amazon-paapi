const amazonPaapi = require('amazon-paapi');
// const ck = require('ckey'); // access .env variables


const commonParameters = { 
  'AccessKey'  : 'AKIAIC7STS7ZQHBDA7GQ',
  'SecretKey'  : 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
  'PartnerTag' : 'trfacts2-21', // yourtag-20
  'PartnerType': 'Associates', // Default value is Associates. 
  'Marketplace': 'www.amazon.in' // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
}

const requestParameters = {
    'ASIN' : 'B0C1YWFHK5',
    'Resources' : [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'Offers.Listings.Price',
        'VariationSummary.VariationDimension'
      ]
};

/** Promise */
amazonPaapi.GetVariations(commonParameters, requestParameters)
    .then(data => {
        // do something with the success response.
        console.log(data);
    })
    .catch(error => {
        // catch an error.
        console.log(error)
    });
