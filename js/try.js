var locations = [
        {
            name : 'Palace of Fine Arts',
            lat : 37.80288814426483,
            lng : -122.44841247797011
         },
            {
            name: 'Ghirardelli Square',
            lat: 37.80588333008106,
            lng: -122.42303703974015
        }, {
            name: 'Coit Tower',
            lat: 37.8024286,
            lng: -122.4058044
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
            lat: 37.8098305727594,
            lng: -122.4103707075119
        }
    ]
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
         center : {lat : 37.80588333008106, lng: -122.42303703974015}
    });
    ko.applyBindings(new viewModel);
}


var createLocation = function(data){
    var self = this;
    this.name = data.name;
    this.lat = data.lat;
    this.lng = data.lng;
    this.streetName = "";
    this.city = "";
    this.phone = "";
    this.url = "";
}

function apiResponse(lat,lng){
    clientID = "2KQZ3MUMNVWNHCQPQ4BXUVWNQ4UJG0SEVNYH1DWUGAGFBPCZ";
    clientSecret = "LQ1DPDKXQYZEH344RRSRTXK53JYSYV2T52FSSGXUAU5LUX5K";

    var foursquareURL = 'https://api.foursquare.com/v2/'+
    'venues/search?ll='+lat + ',' + lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&v=20180124';

}

var viewModel = function () {
    var self = this;

    this.locationList = ko.observableArray([]);


    locations.forEach(function(locationItem){
        self.locationList.push(new createLocation(locationItem));
        self.marker = new google.maps.Marker({
        map: map
        , animation: google.maps.Animation.DROP
        , position: new google.maps.LatLng(self.lat, self.lng)
        , title: self.name
    });
    });

    locations.forEach(function(locationItem) {
       self.marker = new google.maps.Marker({
        map: map
        , animation: google.maps.Animation.DROP
        , position: new google.maps.LatLng(self.lat, self.lng)
        , title: self.name
    });
});



        this.filter = ko.observable();

}
