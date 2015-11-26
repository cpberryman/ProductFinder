var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var allProducts = JSON.parse(fs.readFileSync('products.json', 'utf8'));
allProducts.forEach(function(product) {
    var params = {
        TableName: "Products",
        Item: {

            "TitleText": product.Title.TitleText,
            "ProductIdentifier":  product.ProductIdentifier,
            "Contributor": product.Contributor,
            "Language": product.Language,
            "AudienceCode": product.AudienceCode,
            "Imprint": product.Imprint,
            "Publisher": product.Publisher,
            "PublishingStatus": product.PublishingStatus,
            "PublicationDate": product.PublicationDate,
            "SalesRights": product.SalesRights,
            "SupplyDetail": product.SupplyDetail,
            "PpmData": product.PpmData,
            "chapters": product.chapters

        }
    };

    dynamodbDoc.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", product.Title.TitleText, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", product.Title.TitleText);
       }
    });
});
