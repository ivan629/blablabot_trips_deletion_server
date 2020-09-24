import config from 'config';
const mapKey = config.firebaseConfig.apiKey;

export const getCityDetailsUrl = (placeId, language) =>
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=${language}&key=${mapKey}`;

export const getCityNameAndAddressUrl = (placeId, language) =>
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,vicinity,formatted_address&language=${language}&key=${mapKey}`;

export const getCitiesAutocompleteUrl = (city, language) =>
    encodeURI(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=formatted_address,name,geometry,place_id&language=${language}&key=${mapKey}`
    );
