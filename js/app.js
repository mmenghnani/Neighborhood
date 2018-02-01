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

var createLocation = function (data) {
    var self = this;
    var def = $.Deferred();
    var retVal = {
        name: data.name,
        lat: data.lat,
        lng: data.lng,
        streetName: "",
        city: "",
        phone: "",
        url: "",
        contentString: "",
        marker: undefined,
        infoWindow: undefined
    };

    retVal.marker = new google.maps.Marker({
        map: map
        , animation: google.maps.Animation.DROP
        , position: new google.maps.LatLng(data.lat, data.lng)
        , title: self.name
    });

    currWindow = false;

    retVal.marker.addListener('click', function () {
        if(currWindow){
            undoClickActions(currWindow,currMarker,scope);
        }
        this.infoWindow.setContent(this.contentString);
        ClickActions(this);
        currWindow = this.infoWindow;
        currMarker = this.marker;
        scope = this.name;
    }.bind(retVal));

    clientID = "2KQZ3MUMNVWNHCQPQ4BXUVWNQ4UJG0SEVNYH1DWUGAGFBPCZ";
    clientSecret = "LQ1DPDKXQYZEH344RRSRTXK53JYSYV2T52FSSGXUAU5LUX5K";

    var foursquareURL = 'https://api.foursquare.com/v2/'+
    'venues/search?ll='+retVal.lat + ',' + retVal.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&v=20180124';

    $.getJSON(foursquareURL).done(function(data){
            var apiResults = data.response.venues[0];
            retVal.streetName = apiResults.location.formattedAddress[0];
            retVal.city = apiResults.location.formattedAddress[1];
            retVal.phone = apiResults.contact.formattedPhone;
                if(!(retVal.phone)){
                    retVal.phone = 'Phone Number not available';
                }
            retVal.url = apiResults.url;
            retVal.contentString = '<div class="info-window-content"><div class="title"><b>' + retVal.name + "</b>" +
                '<a href="' + retVal.url +'"> (website) </a></div>' +
                '<div class="content">' + retVal.streetName + "</div>" +
                '<div class="content">' + retVal.city + "</div>" +
                '<div class="content">' + retVal.phone + "</a></div></div>";
            retVal.contentString += '<img class="images" src= http://maps.googleapis.com/maps/api/streetview?'
            +'size=200x100&location=' + retVal.lat + "," + retVal.lng + '>';
            //Opening InfoWindow with a click
            retVal.infoWindow = new google.maps.InfoWindow({content: retVal.contentString});
            def.resolve(retVal);
        }).fail(function(){
            console.log('Something went wrong with the 4square api');
        })
        return def.promise();
}

    var clickActions = function (data) {
        data.infoWindow.open(map,data.marker);
        data.marker.setIcon('https://goo.gl/iDKehU');
        var elem = document.getElementById(data.name);
            elem.style.backgroundColor = "#505050";
            elem.style.color = "white";
            elem.style.fontWeight = "700";
        }

    var undoClickActions = function (window,marker,scope){
        window.close();//To close any already open info windows so that there is only one infowindow open at a given time.
        marker.setIcon('https://goo.gl/Htiu8j'); //change the icon color to the default one which is red
    var elem = document.getElementById(scope);
        elem.style.backgroundColor = "transparent";
        elem.style.fontWeight = "400";
        elem.style.color = "#337ab7";
}

    var leftNavClickActions = function() {
       // self.
    }

var viewModel = function () {
    var self = this;

    this.locationList = ko.observableArray([]);

    locations.forEach(function(locationItem){
        createLocation(locationItem).then(function(data) {
            self.locationList.push(data);
        })
    });

    this.query = ko.observable('');

    this.filteredList = ko.computed(function () {
        return ko.utils.arrayFilter(self.locationList, function (locationItem) {
            //if any character matches any marker
            console.log(self.query());
             if(locationItem.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0){
                locationItem.marker.setMap(map);
             }
             else {
                locationItem.marker.setMap(null);
             }
         });

    this.navclick = ko.observable();

    this.clickListItem = function (click){
        self.navclick(click);
        if(click != null){
            //self.navclick().leftNavClickActions();
            console.log("I am here");
        }
    };

    });


}




