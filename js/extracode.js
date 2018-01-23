function printLocations() {
    /*var list = document.createElement('ul');
    list.setAttribute("class", "nav nav-sidebar");
    list.setAttribute("id", "myUL");
    document.body.appendChild(list);*/
    for (var i = 0; i < locations.length; i++) {
        var list2 = document.createElement("li");
        var atag = document.createElement('A');
        atag.setAttribute("href", "#");
        atag.innerHTML = locations[i].name;
        list2.appendChild(atag);
        document.getElementById("myUL").appendChild(list2);
    }
    document.getElementById("love").appendChild(myUL);
}

/*function searchFunction() {
    var input, filter, ul, li, i, a;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            filteredParameter = a.innerHTML;
        } else {
            li[i].style.display = "none";
        }
    }
    createFilteredMap();
}

function createFilteredMap() {
    var newArray = [];
    var i;
    for(var i = 0; i <locations.length; i++){
        if(filteredParameter == locations[i].name){
            console.log(true);
            var newMarker = new google.maps.Marker({
            position : locations[i],
            icon: image,
          });
        }
    }
}


*/


/*function createAllMarkers() {
    for (var k = 1; k < locations.length; k++) {
        var marker = new google.maps.Marker({
            position: locations[k],
            map:map,
        });
        marker.setMap(map);
    }
    printLocations();
}*/

//createAllMarkers();



   /* var marker = new google.maps.Marker({
        position: locations[0],
        map: map,
        animation: google.maps.Animation.DROP
    }); */