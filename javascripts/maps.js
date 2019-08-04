function createMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoiY291bnRyeWdhcmRlbnMiLCJhIjoiY2p5d2RmZGFkMHoxazNkbWtjeGxucG5lcCJ9.ZHRKFOQPExs6uzkCdtbyIQ";

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-83.400, 33.953],
        zoom: 11.85
    });


    // on map load
    map.on("load", function() {
        // load image for map infomarker
        map.loadImage("https://i.imgur.com/MK4NUzI.png", function (error, image) {
            if(error) throw error;
            map.addImage("custom-marker", image);

            map.addLayer({
                    id: "markers",
                    type: "symbol",
                    source: {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [ // SET OF MARKERS TO GO ON MAP
                                { // marker 1
                                    type: 'Feature',
                                    properties: {
                                        description: "Address"
                                    }, // properties
                                    geometry: { // geometry of this point
                                        type: "Point",
                                        coordinates: [-83.335210, 33.967170]
                                    } // geometry
                                } // features
                            ] // features (array for 1+)
                        } // data
                    }, // source information

                    layout: {
                        "icon-image": "custom-marker"
                    } // layout information
                }); // map.addLayer
        }); // loadImage
    }); // map.onload

    // for when popups are clicked (all three of the following are for popups)
    map.on('click', 'markers', function(e) {
        // get coordinates and description from pin after click
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // create a new popup, set its location to event location, set its description, and add it to map
        new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
    }); // map.on (click) for infowindow popup

    map.on('mouseenter', 'markers', function(e) {
        map.getCanvas().style.cursor = 'pointer';
    }); // map.on (mouseenter) to change mouse to pointer

    map.on('mouseleave', 'markers', function(e) {
        map.getCanvas().style.cursor = '';
    }); // map.on (mouseenter) to change mouse back to normal
} // createMap
