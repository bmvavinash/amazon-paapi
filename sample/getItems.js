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
    'ItemIds'   : ['B0C1YWFHK5', 'B0BZ8T21V4'], // array of ASIN ID. Maximum is 10.
    'ItemIdType': 'ASIN', // Optional. Default value is 'ASIN' and the only value available. If you wish to use UPC and other types please use searchItems.
    'Condition' : 'New', 
    'Resources' : [ /** Array of resources. For more details, refer: https://webservices.amazon.com/paapi5/documentation/get-items.html#resources-parameter */
        // 'Images.Primary.Medium', 
        'ItemInfo.Title',
        'Offers.Listings.Price'
        ]
    // CurrencyOfPreference : , //Optional properties...
    // LanguagesOfPreference : ,
    // Merchant : ,
    // OfferCount : ,
    // Properties : 
};

/** Promise */
amazonPaapi.GetItems(commonParameters, requestParameters)
    .then(data => {
        // do something with the success response.
        console.log(data);
        console.log("data");
        console.log(data.ItemsResult);
    })
    .catch(error => {
        // catch an error.
        console.log(error)
    });
