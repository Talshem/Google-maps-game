
// Initialize and add the map
let markers = [];
let cities = [
{ name:"Tel Aviv", lat: 32.109333, lng: 34.85549 },
{ name:"Ashdod", lat: 31.801447, lng: 34.643497 },
{ name:"Nazareth", lat: 32.699635, lng: 35.303547 },
{ name:"Bat Yam", lat: 32.017136, lng: 34.745441 },
{ name:"Haifa", lat: 32.794044, lng: 34.989571 },
{ name:"Herzliya", lat: 32.166313, lng: 34.843311 },
{ name:"Rehovot", lat: 31.894756, lng: 34.809322 },
{ name:"Jerusalem", lat: 31.771959, lng: 35.217018 },
{ name:"Karmiel", lat: 32.919945, lng: 35.290146 },
{ name:"Ra'anana", lat: 32.184448, lng: 34.870766 },
]

let random = Math.floor(Math.random() * cities.length);
let getCity = document.getElementById('getCity')

getCity.innerText = 'Pin ' + cities[random].name;

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
    position: {lat: cities[random].lat, lng: cities[random].lng} ,
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
`Your pin ${results.distance}km from the destination, you got ${results.points} points`
:
`Good job! you got ${results.points} points`
)
for (let i = 0; i < markers.length; i++) {
   markers[i].setMap(null);
   }
markers = []
random = Math.floor(Math.random() * cities.length);

getCity.innerText = 'Pin ' + cities[random].name;
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
