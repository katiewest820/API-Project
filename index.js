
let service;
let food;
let town;
let value;
let result = 0;
let imgResult = 0;
let photos;




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
		service.textSearch({ query: searchterm }, function(place){
  		console.log(place)
  		getDetails(place[result])
	})
}

 
function getDetails(place){
	service.getDetails({ placeId: place.place_id }, function callback(placeId){
		console.log(placeId)
		photos = placeId.photos
		displayImages()
	});
	
	displayResults(place)
	console.log(place)
}

function displayImages (){
	clearResults()
	$('.resultsImg').append(`<img src="${photos[imgResult++].getUrl({maxWidth: 200, maxHeight: 200})}">
		<img src="${photos[imgResult++].getUrl({maxWidth: 300, maxHeight: 300})}">
		<img src="${photos[imgResult++].getUrl({maxWidth: 200, maxHeight: 200})}">
		<img src="${photos[imgResult++].getUrl({maxWidth: 200, maxHeight: 200})}">
		<img src="${photos[imgResult++].getUrl({maxWidth: 200, maxHeight: 200})}">`)

	
	}

function displayResults (place){
	$('.results').html(`<p class="name">${place.name}</p>
						<p class="address">${place.formatted_address}</p>`)
	result++
}

function nextOption(){
	$('.nextOption').on('click', function(){
		initialize(value)
		imgResult = 0

	})

}

function nextImg(){
	$('.nextImg').on('click', function(){
		displayImages()

	})

}

function clearResults(){
	$('.resultsImg').empty()

}



nextOption()
nextImg()
startPage()
search()