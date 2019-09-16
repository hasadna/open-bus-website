const DEFAULT_COLOR = 'blue';
const SELECTED_COLOR = 'red';


$(document).ready(function () {

    const map = L.map('mapid').setView([32.071862, 34.810206], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    setTimeout(() => {
    $.getJSON('https://ams3.digitaloceanspaces.com/obus-do2/free_lines_with_shapes.json', (freeLines) => {

        let popup;
        let selectedRoute;
        for (const route of freeLines) {
            popup = L.popup().setContent(`<p>קו ${route.route_short_name} של ${route.agency_name}</p>`);

            L.polyline(route.shape, {color: DEFAULT_COLOR})
                .bindPopup('')
                .on('popupopen', function (e) {
                    if (selectedRoute) {
                        selectedRoute.setStyle({color: DEFAULT_COLOR});
                    }

                    e.popup.setContent(`<p>
                                            ${route.agency_name} - קו ${route.route_short_name}
                                            <br/>
                                            ${route.start_stop_city} - ${route.start_stop_name} -> ${route.end_stop_city} - ${route.end_stop_name}
                                        </p>`);
                    e.target.setStyle({color: SELECTED_COLOR});
                    e.target.bringToFront();

                    selectedRoute = e.target;
                }).addTo(map);

        }
    });
    }, 0);
});

