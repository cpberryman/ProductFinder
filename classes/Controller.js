/**
 * Constructor of the Controller class which initialises DynamoDB connection
 *
 * Modification history
 * Version	Modifier	Date		Change				         Reason
 * 0.1.0	Chris		25-11-2015	First release	         Requirements
 * 0.2.0	Chris		29-11-2015	Amazon Cognito config	 Requirements
 */
var Controller = function() {

  // Initialize the Amazon Cognito credentials provider
  AWS.config = new AWS.Config();
  AWS.config.region = 'eu-west-1'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-1:dc260b3f-e468-4482-9885-b674b707bbb1',
  });

  AWS.config.credentials.get(function(){
    // Credentials will be available when this function is called.
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
});

  AWS.config.endpoint = "https://dynamodb.eu-west-1.amazonaws.com";
  dynamodbDoc = new AWS.DynamoDB.DocumentClient();
}


/**
 * Lists all product titles and associated information in the DOM
 *
 * Modification history
 * Version	Modifier	Date		Change				            Reason
 * 0.1.0	Chris		25-11-2015	First release	           Requirements
 * 0.2.0	Chris		25-11-2015  Added author variable 	 Requirements
 */
Controller.prototype.listTitles = function() {
  var params = {
      TableName: "Products"
  };
  var products = [];
  dynamodbDoc.scan(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
         console.log(data);
          var items = data.Items;
          for (i=0;i<items.length;i++) {
            var title = items[i].TitleText;
            var author = items[i].Author;
            var publisher = items[i].PublisherName;
            var language = items[i].LanguageCode;
            var p = new Product(title, author, publisher, language);
            products.push(p);
          }
          for(i=0;i<products.length;i++) {
              $('.products').append(products[i].getInformation());
          }
          $('.product').click(function() {
            $('.product').removeClass('current');
            $('.description').hide();
            $(this).addClass('current');
            $(this).children('.description').show();
          });
  });
}

/**
 * Lists all product titles which partially match a search term in the DOM
 *
 * @param term(String) the search term
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 * 0.2.0	Chris		25-11-2015  Added author variable 	 Requirements
 */
Controller.prototype.searchForTitle = function(term) {
  var searchTerm = term.toUpperCase();
  var params = {
      TableName: "Products"
  };
  var products = [];
  dynamodbDoc.scan(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          var items = data.Items;
          for (i=0;i<items.length;i++) {
            var title = items[i].TitleText;
            var author = items[i].Author;
            var publisher = items[i].PublisherName;
            var language = items[i].LanguageCode;
            var p = new Product(title, author, publisher, language);
            products.push(p);
          }
          for(i=0;i<products.length;i++) {
            var s = products[i].getTitle().toUpperCase();
            if (s.indexOf(searchTerm) > -1) {
              $('.products').append(products[i].getInformation());
            }
            $('.product').click(function() {
              $('.product').removeClass('current');
              $('.description').hide();
              $(this).addClass('current');
              $(this).children('.description').show();
            });
          }
  });
}
