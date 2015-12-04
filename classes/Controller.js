/**
 * Constructor of the Controller class which initialises DynamoDB connection
 *
 * Modification history
 * Version	Modifier	Date		Change				         Reason
 * 0.1.0	Chris		25-11-2015	First release	         Requirements
 * 0.2.0	Chris		29-11-2015	Amazon Cognito config	 Requirements
 */
var Controller = function() {

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
 dynamodbDoc = new AWS.DynamoDB.DocumentClient();

}


/**
 * Lists all product titles and associated information in the DOM
 *
 * Modification history
 * Version	Modifier	Date		Change				               Reason
 * 0.1.0	Chris		25-11-2015	First release	               Requirements
 * 0.2.0	Chris		29-11-2015  Added author variable 	     Requirements
 * 1.0.0	Chris		01-12-2015  Changed function signature 	 Requirements
 * 1.1.0	Chris		04-12-2015  Extracts data from DB 	     Requirements
 */
 Controller.prototype.listProducts = function() {

  var params = {
      ProjectionExpression:
          "Title.TitleText, Contributor, #lang, Publisher, SupplyDetail, CountryOfPublication",
      ExpressionAttributeNames: {
        "#lang": "Language"
      },
      TableName: "Products"
  };

  dynamodb.scan(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          var items = data.Items;

          for (i = 0;i < items.length; i++) {
            var title = items[i].Title.TitleText;
            var contributor = items[i].Contributor;
            var contributorStr = "";
            if(contributor instanceof Array) {
              for (j = 0; j < contributor.length; j++) {
                if(j === contributor.length - 1) {
                  contributorStr += contributor[j].KeyNames;
                } else {
                  contributorStr += contributor[j].KeyNames + ", ";
                }
              }
            } else {
              contributorStr = contributor.KeyNames;
            }

            var language = items[i].Language.LanguageCode;
            var publisher = items[i].Publisher.PublisherName;
            var supplierName = items[i].SupplyDetail.SupplierName;
            var productAvailability = items[i].SupplyDetail.ProductAvailability;
            var countryOfPublication = items[i].CountryOfPublication;

            var info =   '<div class="product">'
                         + '<div class="item row">'
                         + '<div class="col-xs-3">'
                         + '</div>'
                         + '<div class="col-xs-6">'
                         + '<p class="title">'+title+'</p>'
                         + '</div>'
                         + '<div class="col-xs-3">'
                         + '</div>'
                         + '</div>'
                         + '<div class="description row">'
                         + '<div class="col-xs-3">&nbsp;</div>'
                         + '<div class="col-xs-6">'
                         + '<h1>'+title+'</h1>'
                         + '<p>Contributors: '+contributorStr+'</p>'
                         + '<p>Language: '+language+'</p>'
                         + '<p>Publisher: '+publisher+'</p>'
                         + '<p>Supplier: '+supplierName+'</p>'
                         + '<p>Availability: '+productAvailability+'</p>'
                         + '<p>Country of publication: '+countryOfPublication+'</p>'
                         + '</div>'
                         + '</div>'
                         + '</div>'
                         + '</div>';

              $('.products').append(info);
              $('.product').click(function() {
                $('.product').removeClass('current');
                $('.description').hide();
                $(this).addClass('current');
                $(this).children('.description').show();
              });
          }
  });
 }

 /**
  * Lists all products which partially match a search term in the DOM
  *
  * @param term(String) the search term
  *
  * Modification history
  * Version	Modifier	Date		Change				               Reason
  * 0.1.0	Chris		25-11-2015	First release	               Requirements
  * 0.2.0	Chris		29-11-2015  Added author variable 	     Requirements
  * 1.0.0	Chris		01-12-2015  Changed function signature 	 Requirements
  * 1.1.0	Chris		04-12-2015  Extracts data from DB 	     Requirements
  */
 Controller.prototype.findProduct = function(searchTerm) {

  var termUpperCase = searchTerm.toUpperCase();
  var termLowerCase = searchTerm.toLowerCase();
  var params = {
      ProjectionExpression:
          "Title.TitleText, Contributor, #lang, Publisher, SupplyDetail, CountryOfPublication",

      FilterExpression: "contains(Title.TitleText, :title1) OR contains(Title.TitleText, :title2)",

      ExpressionAttributeValues: {
          ":title1": termUpperCase,
          ":title2": termLowerCase
      },
      ExpressionAttributeNames: {
        "#lang": "Language"
      },
      TableName: "Products"
  };

  dynamodb.scan(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          var items = data.Items;

          for (i = 0;i < items.length; i++) {
            var title = items[i].Title.TitleText;
            var contributor = items[i].Contributor;
            var contributorStr = "";
            if(contributor instanceof Array) {
              for (j = 0; j < contributor.length; j++) {
                if(j === contributor.length - 1) {
                  contributorStr += contributor[j].KeyNames;
                } else {
                  contributorStr += contributor[j].KeyNames + ", ";
                }
              }
            } else {
              contributorStr = contributor.KeyNames;
            }


          var language = items[i].Language.LanguageCode;
          var publisher = items[i].Publisher.PublisherName;
          var supplierName = items[i].SupplyDetail.SupplierName;
          var productAvailability = items[i].SupplyDetail.ProductAvailability;
          var countryOfPublication = items[i].CountryOfPublication;

         var info =   '<div class="product">'
                       + '<div class="item row">'
                       + '<div class="col-xs-3">'
                       + '</div>'
                       + '<div class="col-xs-6">'
                       + '<p class="title">'+title+'</p>'
                       + '</div>'
                       + '<div class="col-xs-3">'
                       + '</div>'
                       + '</div>'
                       + '<div class="description row">'
                       + '<div class="col-xs-3">&nbsp;</div>'
                       + '<div class="col-xs-6">'
                       + '<h1>'+title+'</h1>'
                       + '<p>Contributors: '+contributorStr+'</p>'
                       + '<p>Language: '+language+'</p>'
                       + '<p>Publisher: '+publisher+'</p>'
                       + '<p>Supplier: '+supplierName+'</p>'
                       + '<p>Availability: '+productAvailability+'</p>'
                       + '<p>Country of publication: '+countryOfPublication+'</p>'
                       + '</div>'
                       + '</div>'
                       + '</div>'
                       + '</div>';

                       $('.products').append(info);
                       $('.product').click(function() {
                         $('.product').removeClass('current');
                         $('.description').hide();
                         $(this).addClass('current');
                         $(this).children('.description').show();
                       });
              }
  });

}
