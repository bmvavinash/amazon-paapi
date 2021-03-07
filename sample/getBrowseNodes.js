const amazonPaapi = require('amazon-paapi');
const ck = require('ckey'); // access .env variables


const commonParameters = { 
  'AccessKey'  : ck.AWS_ACCESS_KEY,
  'SecretKey'  : ck.AWS_SECRET_KEY,
  'PartnerTag' : ck.AWS_TAG, // yourtag-20
  'PartnerType': 'Associates', // Default value is Associates. 
  'Marketplace': 'www.amazon.com' // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
}

const requestParameters = {
  'BrowseNodeIds' : ['3040', '3045'],
  'LanguagesOfPreference' : ['es_US'],
  'Resources' : ['BrowseNodes.Ancestor', 'BrowseNodes.Children']
};

/** Promise */
amazonPaapi.GetBrowseNodes(commonParameters, requestParameters)
    .then(data => {
        // do something with the success response.
        console.log(data);
    })
    .catch(error => {
        // catch an error.
        console.log(error)
    });
