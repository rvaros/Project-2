var foreclosureJSON = '../../CurrentRecessionForeclosure.json';

var foreclosureMarkers = L.layerGroup();

d3.json(foreclosureJSON, function(err,data) {
    if(err) console.log("error fectching data");
    var features = data.features;
    features.forEach((foreclosure,i) => {
        var format = {
            color: "#4169E1",
            fillColor: "#4169E1",
            fillOpacity: "3",
            weight: "1",
            radius: foreclosure.current * 11000
        };
        foreclosureMarkers.addLayer(L.circle([foreclosure.latitude,foreclosure.longitude], format)
        );
    });
});

d3.json(foreclosureJSON, function(err,data) {
    if(err) console.log("error fectching data");
    var features = data.features;
    console.log(features);
    features.forEach((foreclosure,i) => {
        var format = {
            color: "#B22222",
            fillColor: "#B22222",
            fillOpacity: "0.5",
            weight: "1",
            radius: foreclosure.recessionAvg * 10000
        };
        foreclosureMarkers.addLayer(L.circle([foreclosure.latitude,foreclosure.longitude], format)
            .bindPopup("<h3>" + foreclosure.state + "<h6><h6>Recession Average: " + foreclosure.recessionAvg + "%" +"<h6><h6>Current: " + foreclosure.current + "%")
        );
    });
});

var OpenMapSurfer_Roads = L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    "Satellite": Esri_WorldImagery,
    "Greyscale": OpenStreetMap_BlackAndWhite
}

var myMap = L.map("map", {
    center: [37, -100],
    zoom: 4,
    layers: [OpenStreetMap_BlackAndWhite, foreclosureMarkers]
});

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = ["Recession Average", "Current"];
    var colors = ["#B22222", "#4169E1"];
    var labels = [];

    // Add min & max
    var legendInfo = "<h4>Foreclosure Percentage</h1>"
    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\">"+limit+"</li>");
    });

    div.innerHTML += "<ul class=\"list-unstyled\">" + labels.join("") + "</ul>";
    return div;
};

// Adding legend to the map
legend.addTo(myMap);

L.control.layers(baseMaps).addTo(myMap);