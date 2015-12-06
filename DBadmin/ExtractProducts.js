var AWS = require("aws-sdk");
var fs = require('fs');

//--for DynamoDB local --//
/*AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});*/

AWS.config = new AWS.Config();
AWS.config.region = 'eu-west-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:dc260b3f-e468-4482-9885-b674b707bbb1',
});

AWS.config.credentials.get(function(){
  var accessKeyId = AWS.config.credentials.accessKeyId;
  var secretAccessKey = AWS.config.credentials.secretAccessKey;
  var sessionToken = AWS.config.credentials.sessionToken;
});

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var allItems = JSON.parse(fs.readFileSync('ELSIO-Graph-Example.json', 'utf8'));
var products = allItems.worksById;

  for (var key in products) {
    if (products.hasOwnProperty(key)) {
      var obj = products[key];
      var id = key;
      var notificationType = obj.NotificationType;
      var productIdentifier = obj.ProductIdentifier;
      var barcode = obj.Barcode;
      var productForm = obj.ProductForm;
      var title = obj.Title;
      var contributor = obj.Contributor;
      var language = obj.Language;
      var audienceCode = obj.AudienceCode;
      var imprint = obj.Imprint;
      var publisher = obj.Publisher;
      var countryOfPublication = obj.CountryOfPublication;
      var publishingStatus = obj.PublishingStatus;
      var publicationDate = obj.PublicationDate;
      var salesRights = obj.SalesRights;
      var supplyDetail = obj.SupplyDetail;
      var ppmData = obj.PpmData;
      var chapters = obj.chapters;

      var params = {
          TableName: "Products",
          Item: {
              "ID": id,
              "NotificationType": notificationType,
              "ProductIdentifier": productIdentifier,
              "Barcode": barcode,
              "ProductForm": productForm,
              "Title": title,
              "Contributor": contributor,
              "Language": language,
              "AudienceCode": audienceCode,
              "Imprint": imprint,
              "Publisher": publisher,
              "CountryOfPublication": countryOfPublication,
              "PublishingStatus": publishingStatus,
              "PublicationDate": publicationDate,
              "SalesRights": salesRights,
              "SupplyDetail": supplyDetail,
              "PpmData": ppmData,
              "chapters": chapters

          }
      };

      dynamodbDoc.put(params, function(err, data) {
         if (err) {
             console.error("Unable to add product", title, ". Error JSON:", JSON.stringify(err, null, 2));
         } else {
             console.log("PutItem succeeded:", title);
         }
      });
    }
  }
