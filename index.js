
var service;


$('.beginButton').on('click', function(){
	$('.firstPage').css('display', 'none')
	$('.secondPage').css('display', 'block')
})









window.initialize = function () {
  service = new google.maps.places.PlacesService($('.service').get(0));

//service.textSearch({
 // query: 'portland gluten free'
  
//}, function(place){
//  console.log(place)
//});
    
let information = {
 placeId: 'ChIJK2yd6HQKlVQRKbkRWt1eBAQ',
}
  service.getDetails(information, second);

function second(place){
  //console.log(place)
 console.log(place.reviews[0].text)
 console.log(place.opening_hours)
}

}