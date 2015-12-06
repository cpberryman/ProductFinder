var AWS = require("aws-sdk");

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

AWS.config.endpoint = "https://dynamodb.eu-west-1.amazonaws.com";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Products",
    KeySchema: [
        { AttributeName: "ID", KeyType: "HASH"}  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "ID", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
