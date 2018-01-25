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

//Map Creation and initialization. Knockout bindings are also being called from here.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
         center : {lat : 37.80588333008106, lng: -122.42303703974015}
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
    this.url = "";

    clientID = "2KQZ3MUMNVWNHCQPQ4BXUVWNQ4UJG0SEVNYH1DWUGAGFBPCZ";
    clientSecret = "LQ1DPDKXQYZEH344RRSRTXK53JYSYV2T52FSSGXUAU5LUX5K";


    this.isVisible = ko.observable(true);

    var foursquareURL = 'https://api.foursquare.com/v2/'+
    'venues/search?ll='+this.lat + ',' + this.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&v=20180124';

     $.getJSON(foursquareURL).done(function(data){
        var apiResults = data.response.venues[0];
        self.streetName = apiResults.location.formattedAddress[0];
        self.city = apiResults.location.formattedAddress[1];
        self.phone = apiResults.contact.formattedPhone;
        self.url = apiResults.url;
        //console.log(self.url);

        if(!(self.phone)){
            self.phone = 'Phone Number not available';
        }
     }).fail(function(){
        //alert('Something went wrong with the 4square api');
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
            currMarker.setIcon('https://goo.gl/Htiu8j'); //change the icon color to the default one which is red

            unhighlightLeftNav(currMarker.title);
        }
        self.infoWindow.open(map, self.marker);
        self.marker.setIcon('https://goo.gl/iDKehU'); //change the icon color to green
        self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b>" +
            '<a href="' + self.url +'"> (website) </a></div>' +
            '<div class="content">' + self.streetName + "</div>" +
            '<div class="content">' + self.city + "</div>" +
            '<div class="content">' + self.phone + "</a></div></div>";
        self.contentString += '<img class="images" src= http://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + self.lat + "," + self.lng + '>';
        self.infoWindow.setContent(self.contentString);
        currWindow = self.infoWindow;
        currMarker = self.marker;
        clickedItem = self.name;
     //  console.log(clickedItem);
     highlightLeftNav();
    });

var highlightLeftNav = function () {
    var elem = document.getElementById(clickedItem);
        elem.style.backgroundColor = "#F0FFFF";
        elem.style.color = "white";
        elem.style.fontWeight = "700";
    }
}

var unhighlightLeftNav = function (data){
    var elem = document.getElementById(data);
        elem.style.backgroundColor = "transparent";
        elem.style.fontWeight = "400";
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


