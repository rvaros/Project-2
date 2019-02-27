var OpenMapSurfer_Roads = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var OpenStreetMap_BlackAndWhite = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps = {
    "Traditional": OpenMapSurfer_Roads,
    "Topographical": OpenTopoMap,
    "Satellite": Esri_WorldImagery,
    "Greyscale": OpenStreetMap_BlackAndWhite
}

var overlayMaps = {
    "Earthquakes": quakeMarkers,
    "Tectonic Plates": plateLayer
}

var myMap = L.map("map", {
    center: [37, -100],
    zoom: 4,
    layers: [OpenMapSurfer_Roads, quakeMarkers]
});

// Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = ["<2.5", "2.5-3.5", "3.5-4.5", ">4.5"];
    var colors = ["#ffffb2", "#ffff00", "#ff9900", "#ff0000"];
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Magnitude</h1>"
    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\">"+limit+"</li>");
    });

    div.innerHTML += "<ul class=\"list-unstyled\">" + labels.join("") + "</ul>";
    return div;
};

// Adding legend to the map
legend.addTo(myMap);

L.control.layers(baseMaps, overlayMaps).addTo(myMap);