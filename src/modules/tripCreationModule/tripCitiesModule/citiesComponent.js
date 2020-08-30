import { isNil, isEmpty } from 'lodash';
import fetch from 'node-fetch';
import config from 'config';
import { createAction, getIsBotMessage, sendMessage, sendLocation } from '../../../common/utils/utils';
import {
    CHOOSE_CITY_MESSAGE,
    NOT_FOUND_CITY_MESSAGE,
    CHOOSE_TRIP_CITY,
} from '../../../common/constants/commonСonstants';

class CitiesComponent {
    async fetchCitiesAutocomplete(city) {
        let result;

        const mapKey = config.firebaseConfig.apiKey;

        try {
            const api = encodeURI(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=formatted_address,name,geometry,place_id&key=${mapKey}`);
            const response = await fetch(api);
            result = await response.json();
        } catch (error) {
            console.log(error);
        }

        return result;
    };

    async handleShowCities(bot, msg) {
        if (getIsBotMessage(msg.text)) return;

        this.fetchCitiesAutocomplete(msg.text);
        // check if this chat id has creating trp in progress
        const response = await this.fetchCitiesAutocomplete(msg.text);
        const isCityFounded = !isNil(response) && !isEmpty(response.candidates);

        if (isCityFounded) {
            const citiesButton = (name) => ({
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: CHOOSE_TRIP_CITY,
                            callback_data: createAction(CHOOSE_TRIP_CITY, name),
                        }]
                    ]
                },
            });

            response.candidates.forEach(({name, formatted_address, geometry: {location: {lat, lng}}}) => {
                sendLocation(bot, msg.chat.id, lat, lng).then(() => {
                    const cityName = ` 1. <b>${name}</b>\n    <em>${formatted_address}</em>`;
                    sendMessage(bot, msg.chat.id, cityName, {parse_mode: 'HTML', ...citiesButton('name')})
                });
            });
        } else {
            await sendMessage(bot, msg.chat.id, NOT_FOUND_CITY_MESSAGE);
        }
    }
};

export default CitiesComponent;
