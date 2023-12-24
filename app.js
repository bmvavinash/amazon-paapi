

const { ApiClient } = require('amazon-paapi/SDK');
const paapiSdk = require('./SDK/src/index'); // Official SDK from NPM is currently not working. This is downloaded straight from PAAPI website.
const marketplaceList = require('./marketplace.json');
const cors = require('cors'); 

const express = require('express');
// const axios = require('axios');

const app = express();
app.use(cors());

app.use(express.json());

const port = 3001; // You can choose any available port




const defaultClient = paapiSdk.ApiClient.instance;
const api = new paapiSdk.DefaultApi();

const apiRequest = async (Options) => {
  let commonParameters = Options.commonParameters;
  defaultClient.accessKey = commonParameters.AccessKey;
  defaultClient.secretKey = commonParameters.SecretKey;

  let marketPlaceDetails = await getMarketplaceDetails(commonParameters.Marketplace);
  defaultClient.host = marketPlaceDetails.Host;
  defaultClient.region = marketPlaceDetails.Region;

  let operationOptions = getDefaultOperation(Options.Operations);
  operationOptions['PartnerTag'] = commonParameters.PartnerTag;
  operationOptions['PartnerType'] = commonParameters.PartnerType;
  Object.assign(operationOptions, Options.requestParameters);

  return await api[Options.Operations](operationOptions);
};

const GetItems = async (commonParameters, requestParameters) => {
  console.log("In Get Items")
  let Options = { commonParameters, requestParameters, Operations : "getItems" };
  try{
  return await apiRequest(Options);
  }
  catch(e){
    console.log("error",e)
  }
};


// api.get('/products', async (req, res) => {
//   // Get the search term from the request query
//   const searchTerm = req.query.searchTerm;

//   // Search for products using the PA API
//   const products = await defaultClient.searchItems({
//     keywords: "Camera",
//     // keywords: searchTerm,
//   });

//   // Send the products back to the client
//   console.log("Products are",products)
//   res.json(products);
// });


const GetBrowseNodes = async (commonParameters, requestParameters) => {
  let Options = { commonParameters, requestParameters, Operations : "getBrowseNodes" };
  return await apiRequest(Options);
};

const GetVariations = async (commonParameters, requestParameters) => {
  let Options = { commonParameters, requestParameters, Operations : "getVariations" };
  return await apiRequest(Options);
};

const SearchItems = async (commonParameters, requestParameters) => {
  let Options = { commonParameters, requestParameters, Operations : "searchItems" };
  return await apiRequest(Options);
};

const getDefaultOperation = method => {
  switch (method) {
    case 'getItems':
      return new paapiSdk.GetItemsRequest();
      break;
    case 'getBrowseNodes':
      return new paapiSdk.GetBrowseNodesRequest();
      break;
    case 'getVariations':
      return new paapiSdk.GetVariationsRequest();
      break;
    case 'searchItems':
      return new paapiSdk.SearchItemsRequest();
  }
};

const getMarketplaceDetails = marketplace => new Promise ((resolve, reject) => {
  if(isUndefined(marketplace)) { // set US as default
    let marketPlaceDetail = marketplaceList.Marketplace.filter(x => x.Web === "www.amazon.com")[0];
    resolve(marketPlaceDetail); 
  } else { 
    let marketPlaceDetail = marketplaceList.Marketplace.filter(x => x.Web === marketplace.toLowerCase())[0];
    if(isUndefined(marketPlaceDetail)) reject("Invalid Marketplace Value.");
    resolve(marketPlaceDetail);
  }
});

const getPartnerType = partnerType =>  new Promise ((resolve, reject) => {
  if (isUndefined(partnerType)) resolve('Associates');
  else resolve(partnerType);
});

const isUndefined = value => typeof value === 'undefined'; 

const amazonPaapi = { GetItems, GetBrowseNodes, GetVariations, SearchItems };




// ... (Your existing imports)


// ... (Your existing code)

// Add an API route for each function


app.post('/getItems', async (req, res) => {
  try {
    // Hard code common parameters (replace with your actual values)
    const commonParameters = {
            AccessKey: 'AKIAIC7STS7ZQHBDA7GQ',
            SecretKey: 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
            PartnerTag: 'trfacts2-21', // yourtag-20
            PartnerType: 'Associates', // Default value is Associates.
            Marketplace: 'www.amazon.in', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
          };

    

    // Extract request parameters from the request body
    console.log("Req is ",req)
    console.log("Req.body is ",req.body)
    const requestParameters = req.body;
    console.log("request Pramas are ",requestParameters)
    const result = await GetItems(commonParameters, requestParameters);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/SearchItems', async (req, res) => {
  try {
    // Hard code common parameters (replace with your actual values)
    const commonParameters = {
            AccessKey: 'AKIAIC7STS7ZQHBDA7GQ',
            SecretKey: 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
            PartnerTag: 'trfacts2-21', // yourtag-20
            PartnerType: 'Associates', // Default value is Associates.
            Marketplace: 'www.amazon.in', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
          };

    

    // Extract request parameters from the request body
    console.log("Req is ",req)
    console.log("Req.body is ",req.body)
    const requestParameters = req.body;
    console.log("request Pramas are ",requestParameters)
    const result = await SearchItems(commonParameters, requestParameters);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/getVariations', async (req, res) => {
  try {
    // Hard code common parameters (replace with your actual values)
    const commonParameters = {
            AccessKey: 'AKIAIC7STS7ZQHBDA7GQ',
            SecretKey: 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
            PartnerTag: 'trfacts2-21', // yourtag-20
            PartnerType: 'Associates', // Default value is Associates.
            Marketplace: 'www.amazon.in', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
          };

    

    // Extract request parameters from the request body
    console.log("Req is ",req)
    console.log("Req.body is ",req.body)
    const requestParameters = req.body;
    console.log("request Pramas are ",requestParameters)
    const result = await GetVariations(commonParameters, requestParameters);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/getBrowseNodes', async (req, res) => {
  try {
    // Hard code common parameters (replace with your actual values)
    const commonParameters = {
            AccessKey: 'AKIAIC7STS7ZQHBDA7GQ',
            SecretKey: 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
            PartnerTag: 'trfacts2-21', // yourtag-20
            PartnerType: 'Associates', // Default value is Associates.
            Marketplace: 'www.amazon.in', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
          };

    

    // Extract request parameters from the request body
    console.log("Req is ",req)
    console.log("Req.body is ",req.body)
    const requestParameters = req.body;
    console.log("request Pramas are ",requestParameters)
    const result = await GetBrowseNodes(commonParameters, requestParameters);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// app.get('/getItems', async (req, res) => {
//   try {
//     // const commonParameters = {/*...*/}; // Set your common parameters
//     // const requestParameters = {/*...*/}; // Set your request parameters

        
//     const commonParameters = {
//       AccessKey: 'AKIAIC7STS7ZQHBDA7GQ',
//       SecretKey: 'm30UrYQDN5TyCpBem0c4Wuqbfd4ghCKr1TPd/IiQ',
//       PartnerTag: 'trfacts2-21', // yourtag-20
//       PartnerType: 'Associates', // Default value is Associates.
//       Marketplace: 'www.amazon.in', // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
//     };

//     const requestParameters = {
//       'ItemIds'   : ['B0C1YWFHK5', 'B0BZ8T21V4'], // array of ASIN ID. Maximum is 10.
//       'ItemIdType': 'ASIN', // Optional. Default value is 'ASIN' and the only value available. If you wish to use UPC and other types please use searchItems.
//       'Condition' : 'New', 
//       'Resources' : [ /** Array of resources. For more details, refer: https://webservices.amazon.com/paapi5/documentation/get-items.html#resources-parameter */
//           // 'Images.Primary.Medium', 
//           'ItemInfo.Title',
//           'Offers.Listings.Price'
//           ]
//       // CurrencyOfPreference : , //Optional properties...
//       // LanguagesOfPreference : ,
//       // Merchant : ,
//       // OfferCount : ,
//       // Properties : 
//   };

// console.log("hit the api")
//     const result = await GetItems(commonParameters, requestParameters);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/getBrowseNodes', async (req, res) => {
  // Similar structure as above, modify for getBrowseNodes
});

app.get('/getVariations', async (req, res) => {
  // Similar structure as above, modify for getVariations
});

app.get('/searchItems', async (req, res) => {
  // Similar structure as above, modify for searchItems
});

// ... (Your existing code)

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});







module.exports = { ...amazonPaapi, default : amazonPaapi}; // Allow use of default import syntax in TypeScript.

