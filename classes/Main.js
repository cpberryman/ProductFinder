/**
 * This class handles events from the user
 *
 * Modification history
 * Version	Modifier	Date		Change				               Reason
 * 0.1.0	Chris		25-11-2015	First release	               Requirements
 * 0.2.0	Chris		04-11-2015	updated method invocations	 Requirements
 */
var main = function() {

var c = new Controller();

  $('#search-button').click(function() {
    $('.product').remove();
    var searchTerm =  $('#search-text').val();
    c.findProduct(searchTerm);
  });

  $('#browse-link').click(function() {
     c.listProducts();
  });

}

$(document).ready(main);
