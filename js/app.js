var locations = [
        {
            lat : 37.8027066,
            lng : -122.4494161
         },
            {
            lat: 37.80588333008106,
            lng: -122.42303703974015
        },
        {
            lat: 37.8024286,
            lng: -122.4058044
        },
        {
            lat : 37.77990729540689,
            lng : -122.41996637269969
        },
        {
            lat: 37.8199924,
            lng: -122.4788889
        },
        {
            lat: 37.828125,
            lng: -122.422844
        },
        {
            lat: 37.8098305727594,
            lng: -122.4103707075119
        },

        {
            lat : 37.769951624839024,
            lng : -122.46643060712651
        },
        {
            lat : 37.7762593,
            lng : -122.432758
        }
    ]

prevScope = null; //setting up a global state variable for left nav item and marker clicks. Everytime, either one of them is clicked, the current object is stored in this variable to undo the highlight settings

//Map Creation and initialization. The ko binding is also being called from here.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
          },
         center : {lat : 37.8040051173 , lng: -122.436809919}
    });
    ko.applyBindings(new viewModel);
}

//Formating the phone number to a readable format
function formatPhoneNumber(number) {
  var substring = (""+number).replace(/\D/g, '');
  var main = substring.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!main) ? null : "(" + main[1] + ") " + main[2] + "-" + main[3];
}

//Creating a single location object after calling the foursquare api.
var createLocationObject = function (data) {
    var self = this;
    var def = $.Deferred();
    var retVal = {
        name: "",
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

    //Creating Map Markers
    retVal.marker = new google.maps.Marker({
        map: map
        , animation: google.maps.Animation.DROP
        , position: new google.maps.LatLng(data.lat, data.lng)
        , title: self.name
    });

    //Creating a click event listener on the marker and updating stylees and closing infoWindow for the previously clicked marker.
    retVal.marker.addListener('click', function () {
        if(prevScope){
            undoClickActions(prevScope);
        }
        this.infoWindow.setContent(this.contentString);
        prevScope = this;
        clickActions(this);
         }.bind(retVal));


    //Autorization keys for the API
    clientID = "C2BEK4YGZW2O5TGDFVDIE3MFJWH3U1WZ3N2VJJ3BLYM4PIHE";
    clientSecret = "R1WVGB43T21Z1FYTIIY4DH2X5AB3O14TNNKNV5UQVHILUPXJ";

    //Creating the API url to make the call
    var foursquareURL = 'https://api.foursquare.com/v2/'+
    'venues/search?ll='+data.lat + ',' + data.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&v=20180124';

//create an object(retVal) for each lat long with data returned from foursqaure api
    $.getJSON(foursquareURL).done(function(data){
            var apiResults = data.response.venues[0];
            retVal.name = apiResults.name;
            retVal.streetName = apiResults.location.formattedAddress[0]; //the first
            retVal.city = apiResults.location.formattedAddress[1];
            retVal.phone = apiResults.contact.formattedPhone;
                if(!(retVal.phone)){
                    retVal.phone = '';
                }
            retVal.url = apiResults.url;
                if(!(retVal.url)){
                    retVal.url = null;
                }
            retVal.contentString = '<div class="info-window-content"><div class="title"><b>' + retVal.name + "</b>" + //building the content for the infowindow
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


    //Function to update the left navigation styling on click
    var highlightLeftNavStyle = function (data) {
         var elem = document.getElementById(data.name);
            elem.style.backgroundColor = "#505050";
            elem.style.color = "white";
            elem.style.fontWeight = "700";
    }

    //Function to update the left navigation styling on click at another link
    var unhighlightLeftNavStyle = function(data){
         var elem = document.getElementById(data);
        elem.style.backgroundColor = "transparent";
        elem.style.fontWeight = "400";
        elem.style.color = "#337ab7";
    }

    //Function to opening the infoWindow,highlight left navigation and changing the color of the marker to green
    var clickActions = function (data) {
        data.infoWindow.open(map,data.marker);
        data.marker.setIcon('https://goo.gl/iDKehU');
        highlightLeftNavStyle(data);
        }

    //Function to close infoWindow,un-highlight left navigation and changing the color of the marker back to red
    var undoClickActions = function (data){
        data.infoWindow.close();//To close any already open info windows so that there is only one infowindow open at a given time.
        data.marker.setIcon('https://goo.gl/Htiu8j'); //change the icon color to the default one which is red
        unhighlightLeftNavStyle(data.name);
    }

    var leftNavClickActions = function(data) {
       clickActions(data);
    }

 var viewModel = function () {

    var self = this;

    this.query = ko.observable('');

    //iterating through the location list and generating object for each one of them
    this.locationList = ko.observableArray([]);
    locations.forEach(function(locationItem){
        createLocationObject(locationItem).then(function(data) {
            self.locationList.push(data);
        })
    });

    this.navclick = ko.observable();

    //comparing the value entered in search field and returning it to update the list view
    this.filteredList = ko.computed(function () {
        return ko.utils.arrayFilter(self.locationList(), function (locationItem) {
            //if any character matches any marker
             if(locationItem.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0){
                locationItem.marker.setMap(map);
             }
             else {
                locationItem.marker.setMap(null);
             }
             return locationItem.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
         });
    },this);

   //tracking the click on the listItem and based on that updating the marker and opening the corresponding infoWindow
    this.clickListItem = function (click){
       self.navclick(click);
       if((click!=null)){
            currScope = self.navclick();
            if((prevScope!=null)){
               undoClickActions(prevScope);
            }
            leftNavClickActions(currScope);
            prevScope = currScope;
        }
    }
}






