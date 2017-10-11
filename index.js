
let service;
let food;
let town;
let value;


$('.beginButton').on('click', function(){
	$('.firstPage').css('display', 'none')
	$('.secondPage').css('display', 'block')
})




function search(){
$('.searchButton').on('click', function(event){
	event.preventDefault();
	food = $('.food').val()
	town = $('.location').val()
	value = town +" " + food
initialize(value)
console.log(value)
})


function initialize (searchterm) {
  service = new google.maps.places.PlacesService($('.location, .food').get(0));

service.textSearch({
  query: searchterm
  
}, function(place){
  console.log(place)
});
    
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



}

search();