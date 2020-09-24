import { isEmpty, isNil, size } from 'lodash';
import {
    sendMessage,
    sendLocation,
    getCityDetails,
    parseCityAction,
    getIsBotMessage,
    createCityAction,
    createNextCityAction,
} from '../../../common/utils/utils';
import {
    getCreatingTripCities,
    addCityToTripInDB,
    toggleIsTripCitiesCreating,
} from '../../../services/helpers';
import {
    creatingCitiesKeyboards,
    blockedCitiesKeyboard,
} from '../../keyboards/keyboards';
import { getLocalizedMessage, keysActions } from '../../../common/messages';
import { fetchCitiesAutocomplete } from '../../../common/utils/fetchUils';

const {
    SHOW_NEXT_CITY_ACTION,
    BLOCKED_FINAL_CITY_KEY,
    CHOOSE_TRIP_CITY_ACTION,
    CITIES_ADD_NEW_HELP_TEXT_KEY,
    CITIES_INITIAL_HELP_MESSAGES_KEY,
    CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY,
} = keysActions;

export const addCityToTrip = async (bot, query) => {
    const {
        message: {
            chat: { id },
        },
    } = query;
    const [addCityAction, placeId] = parseCityAction(query.data);
    const cityDetails = await getCityDetails(placeId);

    if (cityDetails && cityDetails.status !== 'OK')
        console.log('Error', cityDetails);

    const tripCities = await getCreatingTripCities(id);
    const order = size(tripCities) + 1;

    const {
        formatted_address,
        place_id,
        vicinity,
        name,
        geometry,
    } = cityDetails.result;
    const newCity = {
        order,
        formatted_address,
        place_id,
        vicinity,
        name,
        location: geometry.location,
    };

    const citiesIdsList = Object.values(tripCities).map(
        ({ place_id }) => place_id
    );
    const isAlreadyAdded = citiesIdsList.includes(newCity.place_id);
    const canBeTheFinalCity = citiesIdsList.length > 0 && !isAlreadyAdded;

    if (isAlreadyAdded) {
        return sendMessage(
            bot,
            id,
            getLocalizedMessage(CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY, query)
        );
    }

    if (canBeTheFinalCity) {
        sendMessage(
            bot,
            id,
            getLocalizedMessage(CITIES_ADD_NEW_HELP_TEXT_KEY, query),
            creatingCitiesKeyboards(query)
        );
        await addCityToTripInDB(id, newCity);
    } else {
        sendMessage(
            bot,
            id,
            getLocalizedMessage(CITIES_ADD_NEW_HELP_TEXT_KEY, query)
        );
        await addCityToTripInDB(id, newCity);
    }
};

export const startCitiesCreating = async (bot, msg) => {
    const {
        chat: { id },
    } = msg;
    sendMessage(
        bot,
        id,
        getLocalizedMessage(CITIES_INITIAL_HELP_MESSAGES_KEY, msg),
        { parse_mode: 'HTML', ...blockedCitiesKeyboard(msg) }
    );
    await toggleIsTripCitiesCreating(id, true);
};

export const sendBlockedCityMessage = (bot, msg) => {
    const {
        chat: { id },
    } = msg;
    sendMessage(bot, id, getLocalizedMessage(BLOCKED_FINAL_CITY_KEY, msg));
};

const getCitiesButton = (
    data,
    place_id,
    nextCityIndex,
    allCitiesSize,
    query
) => {
    const inline_keyboard = nextCityIndex
        ? [
              [
                  {
                      text: getLocalizedMessage(
                          keysActions.CHOOSE_TRIP_CITY_KEY,
                          query
                      ),
                      callback_data: createCityAction(
                          CHOOSE_TRIP_CITY_ACTION,
                          place_id
                      ),
                  },
              ],
              [
                  {
                      text: `${getLocalizedMessage(
                          keysActions.SHOW_NEXT_CITY_KEY,
                          query
                      )} (${allCitiesSize})`,
                      callback_data: createNextCityAction(
                          SHOW_NEXT_CITY_ACTION,
                          data.text,
                          nextCityIndex
                      ),
                  },
              ],
          ]
        : [
              [
                  {
                      text: getLocalizedMessage(
                          keysActions.CHOOSE_TRIP_CITY_KEY,
                          query
                      ),
                      callback_data: createCityAction(
                          CHOOSE_TRIP_CITY_ACTION,
                          place_id
                      ),
                  },
              ],
          ];

    return { reply_markup: { inline_keyboard: inline_keyboard } };
};

export const handleShowCities = async (bot, data, customCityIndex, msg) => {
    if (getIsBotMessage(data.text)) return;

    // check if this chat id has creating trp in progress
    const response = await fetchCitiesAutocomplete(data.text, msg);
    const isCityFounded = !isNil(response) && !isEmpty(response.candidates);

    if (isCityFounded) {
        if (isNil(customCityIndex)) customCityIndex = 0;

        const {
            name,
            formatted_address,
            place_id,
            geometry: {
                location: { lat, lng },
            },
        } = response.candidates[customCityIndex];
        let nextCityIndex = +customCityIndex + 1;
        const cityIndex = nextCityIndex;
        const citiesSize = size(response.candidates);

        if (nextCityIndex === size(response.candidates)) nextCityIndex = null;
        const leftCities = citiesSize - nextCityIndex;

        sendLocation(bot, data.id, lat, lng).then(() => {
            const formattedAddress = formatted_address
                .split(',')
                .splice(1, formatted_address.split(',').length - 1);
            const cityName = `${cityIndex}. <b>${name}</b>\ -<em>${formattedAddress}</em>`;
            sendMessage(bot, data.id, cityName, {
                parse_mode: 'HTML',
                ...getCitiesButton(
                    data,
                    place_id,
                    nextCityIndex,
                    leftCities,
                    msg
                ),
            });
        });
    } else {
        await sendMessage(
            bot,
            data.id,
            getLocalizedMessage(keysActions.NOT_FOUND_CITY_MESSAGE_KEY, msg)
        );
    }
};
