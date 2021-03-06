const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBqeM8YMx4gZ3byhtZ0rhaAPTXUiJW6OKA&callback=initMap&libraries=geometry"

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
getCity.innerText = 'Mark: ' + difficulty[random].name;

let modeButton = document.getElementById('difficulty')
modeButton.addEventListener("click", setMode)

function setMode(){
if (modeButton.innerText === 'Easy Mode'){
modeButton.innerText = 'Hard Mode'
difficulty = hard
random = Math.floor(Math.random() * difficulty.length);
getCity.innerText = 'Mark: ' + difficulty[random].name;
initMap()
} else {
modeButton.innerText = 'Easy Mode'
difficulty = easy
random = Math.floor(Math.random() * difficulty.length);
getCity.innerText = 'Mark: ' + difficulty[random].name;
initMap()
}
}


function initMap() {
  let points = 1000;
  var israel = {lat: 	31.371959, lng: 35};
  var map = new google.maps.Map(
      document.getElementById('map'), {
      zoom: 7.7,
      center: israel,
          gestureHandling: 'none',
          zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
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

let circle;

  var listener = map.addListener("click", (event) => {
    addMarker(event.latLng);
  });

let hintButton = document.getElementById('hint')
hintButton.addEventListener("mousedown", showHint)
hintButton.addEventListener("mouseup", () => {
circle.setMap(null);
circle = null
})

function showHint(){
points -= 50;
let end = 1
let start = -1
var range = end - start;
var result = Math.random() * range;
result += start;
let number = 1 - result / 100

  circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      animation: google.maps.Animation.BOUNCE,
      center: {lat: difficulty[random].lat*number, lng: difficulty[random].lng*number},
      radius: 1000 * 100,
    });
}


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
let results = determinePoints(markers[0].position, markers[1].position, points)

setTimeout(() => {
alert(
results.distance > 10 ?
`Your pin is ${results.distance}km from the destination, you got ${results.points} points`
:
`Good job! you got ${results.points} points`
)
markers = []
random = Math.floor(Math.random() * difficulty.length);
getCity.innerText = 'Pin ' + difficulty[random].name;
initMap();
}, 1000);
}



function determinePoints(marker, city, score){
let distance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(marker,city) / 1000)
points = score - distance * 5
return { points: points > 0 ? points : 0, distance }
}

}
