function initMap() {
    /**
     * MapHandler
     *  NOTE 1: SHIFT + MOUSE-LEFT-BUTTON + DRAG-MOUSE is used for selecting markers on the map
     *  NOTE 2: See directory /public/data/ for available GEOJSON files to upload
     *  NOTE 3: See directory /public/images/testing for screenshots taken durng testing process
     *
     * @type {{map: null, filePath: string, imagePath: string, rectangle: null, shiftPressed: boolean, mouseDownPos: null, mouseIsDown: number, lassoContent: string, iconColor: string, strokeColor: string, strokeOpacity: number, strokeWeight: number, fillColor: string, fillOpacity: number, options: {zoom: number, center: {lat: number, lng: number}}, poi: null, markers: Array, modal: null, table: null, jsonForm: null, colorForm: null, lassoo: null, coordsRenderer: Array, shiftKey: number, crosshair: string, init: mapHandler.init, reloadMarkers: mapHandler.reloadMarkers, renderMarker: mapHandler.renderMarker, renderRectangle: mapHandler.renderRectangle, removeRectangle: mapHandler.removeRectangle, renderLassooTable: mapHandler.renderLassooTable, registerEvents: mapHandler.registerEvents, attachClickHandlers: mapHandler.attachClickHandlers, isBounded: mapHandler.isBounded, hideForms: mapHandler.hideForms, loadJSON: mapHandler.loadJSON}}
     */
    let mapHandler = {
        map: null,
        filePath: '/data/',
        imagePath: 'http://maps.google.com/mapfiles/ms/icons/',
        rectangle: null,
        shiftPressed: false,
        mouseDownPos: null,
        mouseIsDown: 0,
        lassoContent: '',
        iconColor: 'red',
        strokeColor: '#277AF5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'white',
        fillOpacity: 0.50,
        options: {zoom: 8, center: {lat: 53.3498, lng: -6.2603}},// Default map view DUBLIN, IRELAND
        poi: null,
        markers: [],
        modal: null,
        table: null,
        jsonForm: null,
        colorForm: null,
        lassoo: null,
        coordsRenderer: [],
        shiftKey: 16,
        crosshair: 'crosshair',
        init: function () {
            mapHandler.modal = $("#general-modal");
            mapHandler.table = $("#table-container");
            mapHandler.jsonForm = $("#json-form");
            mapHandler.colorForm = $("#color-form");
            mapHandler.coordsRenderer = $("#coords-renderer");
            mapHandler.lassoo = $('#lassoo');
            mapHandler.registerEvents();
            mapHandler.reloadMarkers();
        },
        reloadMarkers: function () {
            /* Loop through markers and set map to null for each */
            for (var i = 0; i < mapHandler.markers.length; i++) {
                mapHandler.markers[i].setMap(null);
            }

            /* Reset markers list */
            mapHandler.markers = [];
            mapHandler.rectangle = new google.maps.Rectangle();
            mapHandler.map = new google.maps.Map(document.getElementById('map'), mapHandler.options);

            /* If no POI's available; exit */
            if (mapHandler.poi === null) {
                return;
            }

            /* Define new map bounds object */
            var bounds = new google.maps.LatLngBounds();

            /* Foreach POI */
            for (var i = 0; i < mapHandler.poi.features.length; i++) {
                /* Add point to Map */
                marker = mapHandler.renderMarker(mapHandler.poi.features[i]);

                /* Include marker in bounded / visible area of map */
                bounds.extend(marker.position);
            }

            /* Centre map over bounded markers (newly rendered points of interest) */
            mapHandler.map.fitBounds(bounds);
        },
        renderMarker: function (params) {
            let lat = params.geometry.coordinates[0],
                lng = params.geometry.coordinates[1],
                content = params.properties.content,
                marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: mapHandler.map,
                    icon: '',
                    animation: google.maps.Animation.DROP
                });

            /* If there's a custom icon */
            if (mapHandler.iconColor) {
                var icon = mapHandler.imagePath+mapHandler.iconColor+'-dot.png';
                marker.setIcon(icon);
            }

            /* If there's custom content */
            if (content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });

                marker.addListener('click', function () {
                    infoWindow.open(mapHandler.map, marker);
                });
            }

            /* Global markers */
            mapHandler.markers.push(marker);

            return marker;
        },
        renderRectangle: function (bounds) {
            /* Reset rectangle */
            mapHandler.removeRectangle();

            /* Re-render rectangle */
            mapHandler.rectangle.setOptions({
                strokeColor: mapHandler.strokeColor,
                strokeOpacity: mapHandler.strokeOpacity,
                strokeWeight: mapHandler.strokeWeight,
                fillColor: mapHandler.fillColor,
                fillOpacity: mapHandler.fillOpacity,
                map: mapHandler.map,
                bounds: bounds
            });
        },
        removeRectangle: function () {
            mapHandler.rectangle.setMap(null);
        },
        renderLassooTable: function () {
            let output = '',
                params = mapHandler.poi.features;

            for (var i = 0; i < params.length; i++) {
                let lat = params[i].geometry.coordinates[0],
                    lng = params[i].geometry.coordinates[1],
                    content = params[i].properties.content;

                /* Is our Point-of-interest inside the selection area ? */
                if (mapHandler.isBounded(
                        mapHandler.mouseDownPos.lat(),
                        mapHandler.mouseDownPos.lng(),
                        mapHandler.mouseUpPos.lat(),
                        mapHandler.mouseUpPos.lng(),
                        lat,
                        lng
                    )
                ) {
                    output += '<tr>'+
                        '<th scope="row"></th>'+
                        '<td>'+content+'</td>'+
                        '       <td>'+lat+'</td>'+
                        '       <td>'+lng+'</td>'+
                        '       </tr>'+
                        '</tr>';
                }
            }

            return output;
        },
        registerEvents: function () {
            $(window).keydown(function (evt) {
                if (evt.which === mapHandler.shiftKey) {
                    console.log('down');
                    mapHandler.shiftPressed = true;
                    mapHandler.map.setOptions({
                        draggable: false
                    });
                }
            }).keyup(function (evt) {
                if (evt.which === mapHandler.shiftKey) {
                    console.log('up');
                    mapHandler.shiftPressed = false;
                    mapHandler.map.setOptions({
                        draggable: true
                    });
                }
            });

            $(document).ready(function(){
                $(document).on("click", "#lassoo", function () {
                    var state = '';
                    if ($(this).hasClass('btn-primary')) {
                        $(this).removeClass('btn-primary').addClass('btn-secondary');
                    } else {
                        $(this).addClass('btn-primary').removeClass('btn-secondary');
                        mapHandler.removeRectangle();
                        state = mapHandler.crosshair;
                    }

                    mapHandler.map.setOptions({
                        draggable: true,
                        draggableCursor: state
                    });
                });
                $(document).on("click", "#cancel-upload, #selected-color-button, #close-lassoo", function () {
                    mapHandler.modal.modal('hide');
                });
                $(document).on("click", "#perform-upload", function () {
                    mapHandler.modal.modal('hide');

                    let filename = $(this).closest('form').find('#upload-json').val(),
                        filePath = mapHandler.filePath + filename.split("\\")[2];

                    /* Import GEO JSON file */
                    mapHandler.loadJSON(filePath, function(response) {
                        mapHandler.poi = JSON.parse(response);
                        mapHandler.reloadMarkers();
                        mapHandler.attachClickHandlers();
                    });
                });
                $(document).on("click", "#get-json", function () {
                    mapHandler.modal.modal('show');
                    mapHandler.hideForms();
                    mapHandler.jsonForm.removeClass('hidden');
                });
                $(document).on("click", "#change-color", function () {
                    mapHandler.modal.modal('show');
                    mapHandler.hideForms();
                    mapHandler.colorForm.removeClass('hidden');
                });
                $(document).on("click", "#selected-color-button", function () {
                    let item = $(this).closest('form').find('#selected-color').val();
                    mapHandler.iconColor = item;
                    mapHandler.reloadMarkers();
                    mapHandler.attachClickHandlers();
                });
            });
        },
        attachClickHandlers: function () {
            google.maps.event.addListener(mapHandler.map, 'mousedown', function (e) {
                /* If not shift pressed; exit */
                if (!mapHandler.shiftPressed) {
                    return;
                }

                mapHandler.mouseIsDown = 1;
                mapHandler.mouseDownPos = e.latLng;
            });

            google.maps.event.addListener(mapHandler.map, 'mouseup', function (e) {
                /* If not shift pressed; exit */
                if (!mapHandler.shiftPressed) {
                    return;
                }

                /* Set mouse up pos into object */
                mapHandler.mouseUpPos = e.latLng;

                /* Define rectangle bounds and render */
                var bounds = new google.maps.LatLngBounds(mapHandler.mouseDownPos, mapHandler.mouseUpPos);
                mapHandler.renderRectangle(bounds);
                mapHandler.lassoo.trigger("click");

                /* Render lassoo table */
                var lassooTable = mapHandler.renderLassooTable();
                mapHandler.modal.modal('show');
                mapHandler.hideForms();
                mapHandler.table.removeClass('hidden');
                mapHandler.coordsRenderer.html(lassooTable);
            });
        },
        isBounded: function (top, left, bottom, right, latitude, longitude){
            if (top >= latitude && latitude >= bottom){
                if ((left <= right && left <= longitude && longitude <= right) || (left > right && (left <= longitude || longitude <= right))) {
                    return true;
                }
            }
            return false;
        },
        hideForms: function () {
            mapHandler.table.addClass('hidden');
            mapHandler.colorForm.addClass('hidden');
            mapHandler.jsonForm.addClass('hidden');
        },
        loadJSON: function (filePath, callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', filePath, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }
    };
    mapHandler.init();
}