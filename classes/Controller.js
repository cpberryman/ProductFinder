/**
 * Constructor of the Controller class which initialises DynamoDB connection
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 */
var Controller = function() {
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "###########";
  AWS.config.secretAccessKey = "############";
  AWS.config.region = "us-west-2";
  AWS.config.endpoint = "http://localhost:8000";

  dynamodbDoc = new AWS.DynamoDB.DocumentClient();
}


/**
 * Lists all product titles and associated information in the DOM
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
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
          var items = data.Items;
          for (i=0;i<items.length;i++) {
            var title = items[i].TitleText;
            var publisher = items[i].Publisher.PublisherName;
            var language = items[i].Language.LanguageCode;
            var availability = items[i].SupplyDetail.ProductAvailability;
            var p = new Product(title, publisher, language, availability);
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
            var publisher = items[i].Publisher.PublisherName;
            var language = items[i].Language.LanguageCode;
            var availability = items[i].SupplyDetail.ProductAvailability;
            var p = new Product(title, publisher, language, availability);
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
