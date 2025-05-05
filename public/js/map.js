mapboxgl.accessToken = 'pk.eyJ1IjoidGVqYXNiaDEyMzQiLCJhIjoiY21hOW91bG9tMWlnZDJsc2dmaWwzdGxxZSJ9.rzCyDFfPzGyRh3QYvCJqEw';

if (Array.isArray(coordinates) && coordinates.length === 2) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 9
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker({ color: "red" })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<h4>${listingTitle}</h4>`))
        .addTo(map);
} else {
    console.error("Invalid coordinates provided for the map.");
}
