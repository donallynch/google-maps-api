function initMap() {
    /**
     * MapHandler
     *  NOTE: On the mac I developed on the SHIFT + MOUSE-LEFT-BUTTON + DRAG-MOUSE is used for selecting.
     *
     * @type {{map: null, rectangle: null, shiftPressed: boolean, mouseDownPos: null, mouseIsDown: number, lassoContent: string, iconColor: string, options: {zoom: number, center: {lat: number, lng: number}}, poi: *[], modal: null, table: null, jsonForm: null, colorForm: null, lassoo: null, markers: Array, coordsRenderer: Array, init: mapHandler.init, reloadMarkers: mapHandler.reloadMarkers, renderRectangle: mapHandler.renderRectangle, removeRectangle: mapHandler.removeRectangle, renderLassooTable: mapHandler.renderLassooTable, registerEvents: mapHandler.registerEvents, addMarker: mapHandler.addMarker, isBounded: mapHandler.isBounded, hideForms: mapHandler.hideForms}}
     */
    let mapHandler = {
        map: null,
        rectangle: null,
        shiftPressed: false,
        mouseDownPos: null,
        mouseIsDown: 0,
        lassoContent: '',
        iconColor: 'red',
        options: {
            zoom: 8,
            center: {
                lat: 42.3601,
                lng: -71.0589
            }
        },
        // TODO:: IMPORT THIS OBJECT FROM .JSON FILE INSTEAD OF HARDCODING
        poi: [
            {coords: {lat: 42.4668, lng: -70.9454}, content: '<h1>A</h1>'},
            {coords: {lat: 42.8584, lng: -70.9300}, content: '<h1>B</h1>'},
            {coords: {lat: 42.7762, lng: -71.0773}, content: '<h1>C</h1>'}
        ],
        modal: null,
        table: null,
        jsonForm: null,
        colorForm: null,
        lassoo: null,
        markers: [],
        coordsRenderer: [],
        init: function () {
            mapHandler.modal = $("#general-modal");
            mapHandler.table = $("#table-container");
            mapHandler.jsonForm = $("#json-form");
            mapHandler.colorForm = $("#color-form");
            mapHandler.coordsRenderer = $("#coords-renderer");
            mapHandler.lassoo = $('#lassoo');
            mapHandler.registerEvents();
            mapHandler.reloadMarkers();

            /* ON MAP MOUSEDOWN */
            google.maps.event.addListener(mapHandler.map, 'mousedown', function (e) {

                /* If not shift pressed; exit */
                if (!mapHandler.shiftPressed) {
                    return;
                }

                console.log(e.latLng);
                mapHandler.mouseIsDown = 1;
                mapHandler.mouseDownPos = e.latLng;
            });

            /* ON MAP MOUSEUP */
            google.maps.event.addListener(mapHandler.map, 'mouseup', function (e) {

                /* If not shift pressed; exit */
                if (!mapHandler.shiftPressed) {
                    return;
                }

                /* Define rectangle bounds */
                var bounds = new google.maps.LatLngBounds(mapHandler.mouseDownPos, e.latLng);

                /* Render */
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
        reloadMarkers: function () {

            // Loop through markers and set map to null for each
            for (var i = 0; i < mapHandler.markers.length; i++) {
                mapHandler.markers[i].setMap(null);
            }

            // Reset the markers array
            mapHandler.markers = [];
            mapHandler.rectangle = new google.maps.Rectangle();
            mapHandler.map = new google.maps.Map(document.getElementById('map'), mapHandler.options);

            /* Foreach POI */
            for (var i = 0; i < mapHandler.poi.length; i++) {
                /* Add point to Map */
                mapHandler.addMarker(mapHandler.poi[i]);
            }
        },
        renderRectangle: function (bounds) {

            /* Reset rectangle */
            mapHandler.removeRectangle();

            /* Re-render rectangle */
            mapHandler.rectangle.setOptions({
                strokeColor: '#277AF5',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: 'white',
                fillOpacity: 0.50,
                map: mapHandler.map,
                bounds: bounds
            });
        },
        removeRectangle: function () {
            mapHandler.rectangle.setMap(null);
        },
        renderLassooTable: function () {
            /* Reset content */
            var content = '';

            for (var i = 0; i < mapHandler.poi.length; i++) {
                /**
                 * For 2 given points
                 *  Is our Point-of-interest between them
                 *  TODO:: Cant get the lng and lat values from these event objects for some reason
                 *  TODO:: Hardcoding values to simulate correct behaviour
                 */
                if (mapHandler.isBounded(43.13860642602184, -71.377503515625, 42.29918498142734, -70.5040904296875, mapHandler.poi[i].coords.lat, mapHandler.poi[i].coords.lng)) {

                    /* If yes */
                    content += '<tr>'+
                        '<th scope="row"></th>'+
                        '<td>'+mapHandler.poi[i].content+'</td>'+
                        '       <td>'+mapHandler.poi[i].coords.lat+'</td>'+
                        '       <td>'+mapHandler.poi[i].coords.lng+'</td>'+
                        '       </tr>'+
                        '</tr>';
                }
            }

            return content;
        },
        registerEvents: function () {
            $(window).keydown(function (evt) {
                if (evt.which === 16) {
                    mapHandler.shiftPressed = true;
                    mapHandler.map.setOptions({
                        draggable: false
                    });
                }
            }).keyup(function (evt) {
                if (evt.which === 16) {
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
                        state = 'crosshair';
                    }

                    mapHandler.map.setOptions({
                        draggable: true,
                        draggableCursor: state
                    });
                });
                $(document).on("click", "#cancel-upload, #selected-color-button, #close-lassoo", function () {
                    mapHandler.modal.modal('hide');
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
                });
            });
        },
        addMarker: function (params) {
            let marker = new google.maps.Marker({
                position: params.coords,
                map: mapHandler.map,
                icon: params.icon,
                animation: google.maps.Animation.DROP
            });

            /* If there's a custom icon */
            if (mapHandler.iconColor) {
                var icon = 'http://maps.google.com/mapfiles/ms/icons/'+mapHandler.iconColor+'-dot.png';
                marker.setIcon(icon);
            }

            /* If there's custom content */
            if (params.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: params.content
                });

                marker.addListener('click', function () {
                    infoWindow.open(mapHandler.map, marker);
                });
            }

            /* Global markers */
            mapHandler.markers.push(marker);
        },
        isBounded: function (top, left, bottom, right, latitude, longitude){
            if(top >= latitude && latitude >= bottom){
                if(left <= right && left <= longitude && longitude <= right){
                    return true;
                } else if(left > right && (left <= longitude || longitude <= right)) {
                    return true;
                }
            }
            return false;
        },
        hideForms: function () {
            mapHandler.table.addClass('hidden');
            mapHandler.colorForm.addClass('hidden');
            mapHandler.jsonForm.addClass('hidden');
        }
    };
    mapHandler.init();
}