var source, destination;
var directionsDisplay;
var directionsDisplay2;
var directionsDisplay3;
var directionsService = new google.maps.DirectionsService();
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('txtSource'));
    new google.maps.places.SearchBox(document.getElementById('txtDestination'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    directionsDisplay2 = new google.maps.DirectionsRenderer({ 'draggable': true });
    directionsDisplay3 = new google.maps.DirectionsRenderer({ 'draggable': true });
});

function GetRoute() {
    $.ajax("/getall").done(function(res) {
        console.log('res')
        $("#underDiv").text(JSON.parse(res))
    })
    var barcelona = new google.maps.LatLng(41.3947688, 2.0787279);
    var mapOptions = {
        zoom: 7,
        center: barcelona
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay2.setMap(map);
    directionsDisplay3.setMap(map);
    directionsDisplay.setOptions({
        polylineOptions: {
            strokeColor: 'red'
        }
    });
    directionsDisplay2.setOptions({
        polylineOptions: {
            strokeColor: 'green'
        }
    });
    directionsDisplay3.setOptions({
        polylineOptions: {
            strokeColor: 'purple'
        }
    });

    //*********DIRECTIONS AND ROUTE**********************//
    source = document.getElementById("txtSource").value;
    destination = document.getElementById("txtDestination").value;

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay2.setDirections(response);
            directionsDisplay2.setRouteIndex(1);
            directionsDisplay3.setDirections(response);
            directionsDisplay3.setRouteIndex(2);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
           dvDistance.innerHTML = "";
            dvDistance.innerHTML += "Distance: " + distance + "<br />";
            dvDistance.innerHTML += "Duration:" + duration;

        } else {
            alert("Unable to find the distance via road.");
        }
    });
}

document.getElementById("get-route").addEventListener("click", GetRoute);