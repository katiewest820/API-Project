
let service;
let food;
let town;
let value;
let result = 0;



function startPage(){
$('.beginButton').on('click', function(){
	$('.firstPage').css('display', 'none')
	$('.secondPage').css('display', 'block')
})
}


function search(){
$('.searchButton').on('click', function(event){
	event.preventDefault();
	food = $('.food').val();
	town = $('.location').val();
	value = town + " " + food;
initialize(value)
console.log(value)
})
}


function initialize (searchterm) {
  service = new google.maps.places.PlacesService($('.location, .food').get(0));

service.textSearch({
  query: searchterm
  
}, function(place){
  console.log(place)
  displayResults(place)
});
}

function displayResults (place){
	$('.results').html(`<p class="name">${place[result].name}</p>
						<p class="address">${place[result].formatted_address}</p>`)
	result++
}

function nextOption(){
	$('.nextOption').on('click', function(){
		console.log(result)
		initialize(value)

	})

}

nextOption()
startPage()
search()