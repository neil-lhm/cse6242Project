var map;
function initMap() {
  var res = [{lat: 42, lng: -82}, {lat: 35, lng: -70}];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.3543266,lng: -79.9007057},
    zoom: 6
  });
  for (i in res) {
    var latlng = new google.maps.LatLng(res[i]);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
  };
}