
let service;
let food;
let town;
let value;
let result = 0;
let imgResult = 0;
let photos;
let hours;




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

$('.secondPage').css('display', 'none')
$('.resultsPage').css('display', 'block')

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
		hours = placeId.opening_hours
		console.log(hours)

		displayImages()
		displayHours()
	});
	
	displayResults(place)
	console.log(place)

}


function displayImages (){
	clearResults()
	$('.resultsImg').append(`<img class="locationImg" src="${photos[imgResult++].getUrl({maxWidth: 400, maxHeight: 400})}">`)
}

function displayResults (place){
	$('.results').html(`<h1 class="name">${place.name}</h1>
						<p class="address">${place.formatted_address}</p>`)
						
	result++
}

function displayHours(){
	$('.hours').html(`<ul>Hours
	<li> ${hours.weekday_text[0]}</li>
	<li> ${hours.weekday_text[1]}</li>
	<li> ${hours.weekday_text[2]}</li>
	<li> ${hours.weekday_text[3]}</li>
	<li> ${hours.weekday_text[4]}</li>
	<li> ${hours.weekday_text[5]}</li>
	<li> ${hours.weekday_text[6]}</li>
						</ul>`)

}

function nextOption(){
	$('.nextOption').on('click', function(){
		initialize(value)
		imgResult = 0

	})

}

function nextImg(){
	$('.fa-arrow-circle-right').on('click', function(){
		displayImages()


	})

}

function prevImg(){
	$('.fa-arrow-circle-left').on('click', function(){
		imgResult = imgResult -2
		displayImages()


	})
}

function clearResults(){
	$('.resultsImg').empty()
	
	if(imgResult == 10){
		return imgResult = 0
	}return

}



nextOption()
nextImg()
prevImg()
startPage()
search()