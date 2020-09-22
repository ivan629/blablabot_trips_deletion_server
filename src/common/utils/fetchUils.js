import fetch from 'node-fetch';
import { get } from 'lodash';
import { LANGUAGES } from '../constants/botSettings';
import { getCitiesAutocompleteUrl } from '../constants/urlHelpers';

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