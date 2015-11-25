/**
 * Constructor of the Product class
 *
 * @param	title(String)	the title of the product
 * @param	publisher(String)	the publisher of the product
 * @param	language(String) the language of the product
 * @param availability(String) the avaliability of the product
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 */
var Product = function(title, publisher, language, availability) {
  this.title = title;
  this.publisher = publisher;
  this.language = language;
  this.availability = availability;
}

/**
 * Returns information associated with a product
 *
 * @return the product information as a string.
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 */
Product.prototype.getInformation = function(){
   var info =   '<div class="product">'
                + '<div class="item row">'
                + '<div class="col-xs-3">'
                + '</div>'
                + '<div class="col-xs-6">'
                + '<p class="title">'+this.title+'</p>'
                + '</div>'
                + '<div class="col-xs-3">'
                + '</div>'
                + '</div>'
                + '<div class="description row">'
                + '<div class="col-xs-3">&nbsp;</div>'
                + '<div class="col-xs-6">'
                + '<h1>'+this.title+'</h1>'
                + '<p>Publisher: '+this.publisher+'</p>'
                + '<p>Language: '+this.language+'</p>'
                + '<p>Availability: '+this.availability+'</p>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
   return info;
}

/**
 * Returns the title of a product
 *
 * @return the product information as a string.
 *
 * Modification history
 * Version	Modifier	Date		Change				 Reason
 * 0.1.0	Chris		25-11-2015	First release	 Requirements
 */
Product.prototype.getTitle = function(){
  return this.title;
}
