/**
 * This class handles events from the user
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 */
var main = function() {

var c = new Controller();

  $('#search-button').click(function() {
    $('.product').remove();
    var searchTerm =  $('#search-text').val();
    c.searchForTitle(searchTerm);
  });

  $('#browse-link').click(function() {
    console.log("clicked");
    c.listTitles();
  });

}

$(document).ready(main);
