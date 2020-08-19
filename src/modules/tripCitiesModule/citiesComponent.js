import { isNil, isEmpty } from 'lodash';
import fetch from 'node-fetch';
import config from 'config';
import { createAction, getIsBotMessage } from '../../common/utils/utils';
import {
    CHOOSE_CITY_MESSAGE,
    NOT_FOUND_CITY_MESSAGE,
    CHOOSE_TRIP_CITY,
} from '.././../common/constants/commonСonstants';

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

    async handleShowCities(msg, bot) {
        console.log(msg.text);
        if (getIsBotMessage(msg.text)) return;

        this.fetchCitiesAutocomplete(msg.text);
        // check if this chat id has creating trp in progress
        const response = await this.fetchCitiesAutocomplete(msg.text);
        const isCityFounded = !isNil(response) && !isEmpty(response.candidates);

            const citiesButtons = {
                reply_markup: {
                    inline_keyboard: response.candidates.map(({name, formatted_address, place_id}) => ([{
                        text: name,
                        callback_data: createAction(CHOOSE_TRIP_CITY, name),
                    }]))
                },
    };

        if (isCityFounded) {
            await bot.sendMessage(msg.chat.id, CHOOSE_CITY_MESSAGE, citiesButtons);
        } else {
            await bot.sendMessage(msg.chat.id, NOT_FOUND_CITY_MESSAGE);
        }
    }
}

export default CitiesComponent;
