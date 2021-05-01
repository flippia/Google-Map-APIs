const elementMap = document.querySelector('#map');
const input = document.querySelector('#search_input');
// const btn = document.querySelector('#btn');

const options = {
    zoom: 11,
    center: {lat:43.6532, lng:-79.3832}
};
const map = new google.maps.Map(elementMap, options); 

const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode']
});

autocomplete.addListener("place_changed", () => {
    // console.log(autocomplete);
    const place = autocomplete.getPlace();
    // console.log(place);
    // console.log(place.utc_offset);
    map.setCenter(place.geometry.location);

    const today = new Date();
    const UTCstr = today.toUTCString();
    const timestamp = document.querySelector('.timestamp');
    timestamp.innerText = 'UTC timestamp: ' + UTCstr;

    const utc_offset = today.getTimezoneOffset();
    // console.log(utc_offset);

    const localTime = today.setMinutes(today.getMinutes() + utc_offset + place.utc_offset);
    const localNow = new Date(localTime);    
    
    const local_time = document.querySelector('.localTime');
    local_time.innerText = 'Local time: ' + localNow; 
});
