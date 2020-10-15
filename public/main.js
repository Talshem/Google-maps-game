
// Initialize and add the map
let markers = [];

let easy = [
{ name:"Tel Aviv", lat: 32.109333, lng: 34.85549 },
{ name:"Ashdod", lat: 31.801447, lng: 34.643497 },
{ name:"Nazareth", lat: 32.699635, lng: 35.303547 },
{ name:"Bat Yam", lat: 32.017136, lng: 34.745441 },
{ name:"Haifa", lat: 32.794044, lng: 34.989571 },
{ name:"Herzliya", lat: 32.166313, lng: 34.843311 },
{ name:"Rehovot", lat: 31.894756, lng: 34.809322 },
{ name:"Jerusalem", lat: 31.771959, lng: 35.217018 },
{ name:"Sderot", lat: 31.527321, lng: 34.592941 },
{ name:"Ra'anana", lat: 32.184448, lng: 34.870766 },
{ name:"Eilat", lat:29.55805, lng: 34.94821}
]

let hard = [
{ name:"Dimona", lat: 31.069420, lng: 35.033363 },
{ name:"Sgula", lat: 31.669546, lng: 34.778427 },
{ name:"Caesarea", lat: 32.519016, lng: 34.904545 },
{ name:"Hura", lat: 31.300400, lng: 34.935688 },
{ name:"Karmiel", lat: 32.919945, lng: 35.290146 },
{ name:"Kefar Sava", lat: 32.180264, lng: 34.899788 },
{ name:"Shoham", lat: 31.995758, lng: 34.948841 },
{ name:"Kinneret", lat: 32.723785, lng: 35.565243 },
{ name:"Netanya", lat: 32.321457, lng: 34.853195 },
]

var difficulty = easy;
let random = Math.floor(Math.random() * difficulty.length);
let getCity = document.getElementById('getCity')
getCity.innerText = 'Pin ' + difficulty[random].name;

let button = document.getElementById('difficulty')
button.addEventListener("click", setMode)

function setMode(){
if (button.innerText === 'Easy Mode'){
button.innerText = 'Hard Mode'
difficulty = hard
random = Math.floor(Math.random() * difficulty.length);
getCity.innerText = 'Pin ' + difficulty[random].name;
} else {
button.innerText = 'Easy Mode'
difficulty = easy
random = Math.floor(Math.random() * difficulty.length);
getCity.innerText = 'Pin ' + difficulty[random].name;
}
}


function initMap() {
  // The location of Israel
  var israel = {lat: 	31.371959, lng: 35};
  // The map, centered at Israel
  var map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 7.7,
      center: israel,
          gestureHandling: 'none',
          zoomControl: false,
      styles: [{
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    });
  // The marker, positioned at Israel

  var listener = map.addListener("click", (event) => {
    addMarker(event.latLng);
  });

// Adds a marker to the map and push to the array.
function addMarker(location) {

google.maps.event.removeListener(listener);
  marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.BOUNCE
  });

  markers.push(marker);
    marker = new google.maps.Marker({
    position: {lat: difficulty[random].lat, lng: difficulty[random].lng} ,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: {
    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    }
  });
  markers.push(marker);
let results = determinePoints(markers[0].position, markers[1].position)

setTimeout(() => {
alert(
results.distance > 10 ?
`Your pin is ${results.distance}km from the destination, you got ${results.points} points`
:
`Good job! you got ${results.points} points`
)
for (let i = 0; i < markers.length; i++) {
   markers[i].setMap(null);
   }
markers = []
random = Math.floor(Math.random() * difficulty.length);

getCity.innerText = 'Pin ' + difficulty[random].name;
  listener = map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
}, 1000);
}



function determinePoints(marker, city){
let points = 1000;
let distance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(marker,city) / 1000)
points = points - distance * 5
return { points: points > 0 ? points : 0, distance }
}

}
