import config from 'config';
const mapKey = config.firebaseConfig.apiKey;
import { API_CONSTANTS } from '../constants';

const { BASE_GOOGLE_PLACE_URL, BASE_IMAGE_API } = API_CONSTANTS;

const LANGUAGE = 'uk';

export const getCityDetailsUrl = placeId =>
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=${LANGUAGE}&key=${mapKey}`;

export const getPhotoUrl = photoReference =>
    `${BASE_GOOGLE_PLACE_URL}${BASE_IMAGE_API}${photoReference}&key=${mapKey}`;

export const getRestaurantsResultsUrls = (distance, location, type, nextPageToken) =>
    nextPageToken
        ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${mapKey}`
        : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${distance}&type=${type}&key=${mapKey}`;
