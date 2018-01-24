var locations = [
        {
            name : 'San Francisco center',
            lat : 37.7793,
            lng : -122.4193
         },
            {
            name: 'Ghirardelli Square',
            lat: 37.8059,
            lng: -122.4230
        }, {
            name: 'Palace of Fine Arts',
            lat: 37.8020,
            lng: -122.4487
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
            lat:37.8087,
            lng: -122.4098
        }
    ]

//Map Creation and initialization. Knockout bindings are also being called from here.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
         center : locations[1]
    });
    ko.applyBindings(new viewModel);
}

//Formating the phone number to a readable format
function formatPhoneNumber(number) {
  var substring = (""+number).replace(/\D/g, '');
  var main = substring.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!main) ? null : "(" + main[1] + ") " + main[2] + "-" + main[3];
}

var locationConstructor = function (data) {
    var self = this;
    this.name = data.name;
    this.lat = data.lat;
    this.lng = data.lng;
    this.streetName = "";
    this.city = "";
    this.phone = "";

    this.isVisible = ko.observable(true);

    var foursquareURL = 'https://api.foursquare.com/v2/'+
    'venues/search?ll='+this.lat + ',' + this.lng +'&oauth_token=LF3CEFA3JTZG0R4NNRMZM5ZW5GNQU3FMLTQWPI4FUM1TNXKX&v=20180122';

     $.getJSON(foursquareURL).done(function(data){
        var apiResults = data.response.venues[0];
        self.streetName = apiResults.location.formattedAddress[0];
        self.city = apiResults.location.formattedAddress[1];
        self.phone = apiResults.contact.phone;
        self.phone = formatPhoneNumber(self.phone);
        self.URL = apiResults.url;

        if(!(self.phone)){
            self.phone = 'Phone Number not available';
        }
        else {
                }
     }).fail(function(){
        alert('Something went wrong with the 4square api');
     });

     this.marker = new google.maps.Marker({
        map: map
        , animation: google.maps.Animation.DROP
        , position: new google.maps.LatLng(data.lat, data.lng)
        , title: self.name
    });

    //Opening InfoWindow with a click
    this.infoWindow = new google.maps.InfoWindow({content: self.contentString});

     currWindow = false;

     this.marker.addListener('click', function () {
        if(currWindow){
            currWindow.close(); //To close any already open info windows so that there is only one infowindow open at a given time.
        }
        self.infoWindow.open(map, self.marker);
        self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
        '<div class="content">' + self.streetName + "</div>" +
        '<div class="content">' + self.city + "</div>" +
        '<div class="content">' + self.phone + "</a></div></div>";
        self.infoWindow.setContent(self.contentString);
        currWindow = self.infoWindow;
    });

    this.highlightMarkerOnClick = function () {
     }
}

var viewModel = function () {
    var self = this;
    this.locationList = ko.observableArray([]);
    locations.forEach(function(locationItem){
        self.locationList.push(new locationConstructor(locationItem));
    });

    this.query = ko.observable('');
}

var filteredList = function() {
    viewModel.locations = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(locations, function(beer) {
            return beer.name.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);
}

//Make the cat show up in a list.

//make the current cat change when you click on one of cat in the list.


