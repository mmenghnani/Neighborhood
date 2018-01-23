
var filteredParameter;

locations = [{
            name : 'San Francisco center',
            lat : 37.7793,
            lng : -122.4193
         },
            {
            name: 'San Francisco Zoo',
            lat: 37.7331,
            lng: -122.5052
        }, {
            name: 'Twin Peaks',
            lat: 37.7553,
            lng: -122.4478
        },
        {
            name: 'Golden Gate',
            lat: 37.8199,
            lng: -122.4783
        },
        {
            name: 'Alcatraz Island',
            lat: 37.8267,
            lng: -122.4230
        },
        {
            name: 'Pier 39',
            lat: 37.8087,
            lng: -122.4098
        }
    ]


var location = function(data){
    this.longitude = ko.observable(data.longitude);
    this.latitude = ko.observable(data.latitude);
    this.name = ko.observable(data.name);

}

function ViewModel() {
    var self = this;
    this.locationList = ko.observableArray();

    locations.forEach(function(locationItem){
        self.locationList.push(new location(locationItem));

    });
        this.currentLocation = ko.observable(this.catList()[0]);
console.log(this.currentLocation.name);

    this.currentLocation = ko.observable();
}

var map;

image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: locations[0]
    });
}

    /*for (var k = 0; k < locations.length; k++) {
         var infowindow = new google.maps.InfoWindow({
          content: "Content for InfoWindow",
          maxWidth: 200
        });

         console.log(infowindow);
        var marker = new google.maps.Marker({
            position: locations[k],
            animation: google.maps.Animation.DROP,
            map:map
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        InfoWindow = new google.maps.InfoWindow();
        marker.setMap(map);
    } */
//    printLocations();
//}
//when you click on a left nav item, it should highlight

//var vm = new ViewModel();
ko.applyBindings(new ViewModel);
