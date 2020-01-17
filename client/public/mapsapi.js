var map;
function initMap(lat, lng) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 8
    });
}

