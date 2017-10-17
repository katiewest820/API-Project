
let service;
let food;
let town;
let value;
let result = 0;
let imgResult = 0;
let photos;
let hours;
let phone;
let review;
let reviewNum = 0;




function lightboxOpen(){
$('.beginButton').on('click', function(){
	$('.beginButton').css('visibility', 'hidden');
	$('.lightbox').fadeIn(200).css('display', 'block');
})
}


function search(){

initialize(value);
console.log(value);

$('.firstPage').fadeOut(300);
$('.lightbox').fadeOut(300);
$('.loadScreen').css('display', 'block').delay(3000).fadeOut(400);
setTimeout(function(){
	$('.resultsPage').css('display', 'grid');
}, 3000)


}

function nothingFound(){
	$('.searchButton').on('click', function(event){
		event.preventDefault();
		food = $('.dropdown').val();
		town = $('.location').val();
		value =  'brewery ' + town + " " + food;
	if( !food || !town ){
		$('.lightbox').fadeOut(300);
		$('.makeASelectionScreen').css('display', 'block').delay(3000).fadeOut(100);
		setTimeout(function(){
			$('.lightbox').fadeIn(200).css('display', 'block');
}, 3000)
	} else {
		search()
	}
})
}



function initialize (searchterm) {
  service = new google.maps.places.PlacesService($('.location, .food').get(0));
		service.textSearch({ query: searchterm, type: 'bar'}, function(place){
  		console.log(place[0])
  		checkBeginningReset(place)
  			if(place[0] == undefined){
  		$('.firstPage').css('display', 'block');		
		$('.makeASelectionScreen').css('display', 'block').delay(3000).fadeOut(100);
		setTimeout(function(){
			$('.lightbox').fadeIn(200).css('display', 'block');
		}, 3000)
	} else {
		getDetails(place[result])
	}
})
}

 
function getDetails(place){
	service.getDetails({ placeId: place.place_id }, function callback(placeId){
		console.log(placeId)
		photos = placeId.photos
		hours = placeId.opening_hours
		phone = placeId.formatted_phone_number
		review = placeId.reviews
		
		console.log(placeId)
		displayImages()
		displayHours()
		displayPhone()
		reviews()
	});
	displayResults(place)
}

function checkBeginningReset(place){
	if(place[result] == undefined){
		result = 0
	}
}


function displayImages (){
	clearResults()
	$('.resultsImg').append(`<img class="locationImg" src="${photos[imgResult].getUrl({maxWidth: 400, maxHeight: 400})}">`)
}

function displayResults (place){
	$('.results').html(`<h1 class="name">${place.name}</h1>
						<address><a href="https://www.google.com/maps?q=${place.formatted_address}" target="_blank"><p class="address">${place.formatted_address}</p></a></address>`)

	result++
}

function displayPhone(){
	$('.results').append(`<p class="phone">${phone}</p>`)
}

function displayHours(){
	$('.hours').html(`<ul>
	<li> ${hours.weekday_text[0]}</li>
	<li> ${hours.weekday_text[1]}</li>
	<li> ${hours.weekday_text[2]}</li>
	<li> ${hours.weekday_text[3]}</li>
	<li> ${hours.weekday_text[4]}</li>
	<li> ${hours.weekday_text[5]}</li>
	<li> ${hours.weekday_text[6]}</li>
						</ul>`)
}

function reviews(){
	$('.reviewSection').html(`<h2 class="rating">${review[reviewNum].rating} out of 5</h2>
								<p class="review">${review[reviewNum].text}</p>`)
	
}

function nextReview(){
	$('.rightRev').on('click', function(){
		reviewNum = reviewNum + 1;
		
		if(review[reviewNum] == undefined ){
			 reviewNum = 0;
		}
		reviews()
	})
}

function prevReview(){
	$('.leftRev').on('click', function(){
		reviewNum = reviewNum -1;
		if(review[reviewNum] == undefined ){
			reviewNum = 4;
		}
		reviews()
	})
}

function nextOption(){
	$('.nextOption').on('click', function(){
		initialize(value)
		imgResult = 0;
		reviewNum = 0;

	})

}

function nextImg(){
	$('.rightImg').on('click', function(){
		imgResult = imgResult + 1;
		if(photos[imgResult] == undefined){
			imgResult = 0
	}
		displayImages()


	})

}

function prevImg(){
	$('.leftImg').on('click', function(){
		imgResult = imgResult -1;
		if(photos[imgResult] == undefined){
			imgResult = 9
		}
		displayImages()


	})
}

function clearResults(){
	$('.resultsImg').empty()

}

function newSearch(){
	$('.newSearch').on('click', function(){
		 	$('.location').val('')
		$('.resultsPage').css('display', 'none')
		$('.firstPage').fadeIn(300).css('display', 'block')
		$('.lightbox').fadeIn(300).css('display', 'block')
	})
}



nextOption()
nextImg()
prevImg()
lightboxOpen()
nothingFound()
nextReview()
prevReview()
newSearch()