import fetch from 'node-fetch';
import { get } from 'lodash';
import { LANGUAGES } from '../constants/botSettings';
import {getCitiesAutocompleteUrl, getCityNameAndAddressUrl} from '../constants/urlHelpers';
import { getSortedCities } from './utils';

export const fetchCitiesAutocomplete = async (city, eventObject) =>  {
    let result;
    const language =  get(eventObject, 'from.language_code', LANGUAGES.en);
    try {
        const api = getCitiesAutocompleteUrl(city, language);
        const response = await fetch(api);
        result = await response.json();
    } catch (error) {
        console.log(error);
    }

    return result;
};

export const customFetch = async (api) =>  {
    let result;
    try {
        const response = await fetch(api);
        result = await response.json();
    } catch (error) {
        console.log(error);
    }

    return result;
};

export const getCitiesNamesAndVicinities = async (placesIds, language) =>
    await Promise.all(placesIds.map(placeId => getCityNameAndAddressUrl(placeId, language)));

export const getLocalizedCitiesInfo = async cities => {
    const sortedCitiesIds = getSortedCities(Object.values(cities)).map(({ place_id }) => place_id);
    return getCitiesNamesAndVicinities(sortedCitiesIds);
};
