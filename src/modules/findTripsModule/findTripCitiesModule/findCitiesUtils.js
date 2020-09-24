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
    findTripGoToCalendarKeyboard,
    blockedFindTripCitiesKeyboard,
} from '../../keyboards/keyboards';
import { toggleIsFindTripCitiesCreating } from '../../../services/helpers';
import { fetchCitiesAutocomplete } from '../../../common/utils/fetchUils';
import { getLocalizedMessage, keysActions } from '../../../common/messages';
import { getFindTripCities, addCityToFindTripInDB } from '../findTripsUtils';

export const sendBlockedFindTripCityMessage = (bot, msg) => {
    const {
        chat: { id },
    } = msg;
    sendMessage(
        bot,
        id,
        getLocalizedMessage(
            keysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_MESSAGES_KEY,
            msg
        )
    );
};

const getCitiesButton = ({
    data,
    place_id,
    nextCityIndex,
    allCitiesSize,
    eventObject,
}) => {
    const inline_keyboard = nextCityIndex
        ? [
              [
                  {
                      text: getLocalizedMessage(
                          keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY,
                          eventObject
                      ),
                      callback_data: createCityAction(
                          getLocalizedMessage(
                              keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY,
                              eventObject
                          ),
                          place_id
                      ),
                  },
              ],
              [
                  {
                      text: `${getLocalizedMessage(
                          keysActions.SHOW_NEXT_CITY_KEY,
                          eventObject
                      )} (${allCitiesSize})`,
                      callback_data: createNextCityAction(
                          getLocalizedMessage(
                              keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY,
                              eventObject
                          ),
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
                          keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY,
                          eventObject
                      ),
                      callback_data: createCityAction(
                          getLocalizedMessage(
                              keysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY,
                              eventObject
                          ),
                          place_id
                      ),
                  },
              ],
          ];

    return { reply_markup: { inline_keyboard: inline_keyboard } };
};

export const startTripCitiesSearching = async (bot, msg) => {
    const {
        chat: { id },
    } = msg;
    await sendMessage(
        bot,
        id,
        getLocalizedMessage(keysActions.CITIES_INITIAL_HELP_MESSAGES_KEY, msg),
        { parse_mode: 'HTML', ...blockedFindTripCitiesKeyboard(msg) }
    );
    await toggleIsFindTripCitiesCreating(id, true);
};

export const addCityToFindTripCities = async (bot, query) => {
    const {
        message: {
            chat: { id },
        },
    } = query;
    const [addCityAction, placeId] = parseCityAction(query.data);
    const cityDetails = await getCityDetails(placeId);

    if (cityDetails && cityDetails.status !== 'OK')
        console.log('Error', cityDetails);

    const findTripCities = await getFindTripCities(id);
    const order = size(findTripCities) + 1;
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

    const findTripCitiesIdsList = Object.values(findTripCities).map(
        ({ place_id }) => place_id
    );
    const isAlreadyAdded = findTripCitiesIdsList.includes(newCity.place_id);
    const canBeTheFinalCity =
        findTripCitiesIdsList.length > 0 && !isAlreadyAdded;

    const isMoreThenMAxCitiesNumber = findTripCitiesIdsList.length > 1;

    if (isMoreThenMAxCitiesNumber) {
        return sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.FIND_TRIP_MAX_CITIES_CONT_MESSAGES_KEY,
                query
            )
        );
    }

    if (isAlreadyAdded) {
        return sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.FIND_CITY_ALREADY_EXISTS_ERROR_MESSAGES_KEY,
                query
            )
        );
    }

    if (canBeTheFinalCity) {
        await toggleIsFindTripCitiesCreating(id, false);
        sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.FIND_TRIP_CITIES_ADD_NEW_HELP_MESSAGES_KEY,
                query
            ),
            findTripGoToCalendarKeyboard(query)
        );
        await addCityToFindTripInDB(id, newCity);
    } else {
        sendMessage(
            bot,
            id,
            getLocalizedMessage(
                keysActions.FIND_TRIP_CITIES_ADD_NEW_HELP_MESSAGES_KEY,
                query
            )
        );
        await addCityToFindTripInDB(id, newCity);
    }
};

export const handleFindTripsShowCities = async ({
    bot,
    data,
    customCityIndex,
    eventObject,
}) => {
    if (getIsBotMessage(data.text)) return;

    // check if this chat id has creating trp in progress
    const response = await fetchCitiesAutocomplete(data.text, eventObject);
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
        const allCitiesSize = citiesSize - nextCityIndex;

        sendLocation(bot, data.id, lat, lng).then(() => {
            const formattedAddress = formatted_address
                .split(',')
                .splice(1, formatted_address.split(',').length - 1);
            const cityName = `${cityIndex}. <b>${name}</b>\ -<em>${formattedAddress}</em>`;
            sendMessage(bot, data.id, cityName, {
                parse_mode: 'HTML',
                ...getCitiesButton({
                    data,
                    eventObject,
                    place_id,
                    nextCityIndex,
                    allCitiesSize,
                }),
            });
        });
    } else {
        await sendMessage(
            bot,
            data.id,
            getLocalizedMessage(
                keysActions.FIND_TRIPS_NOT_FOUND_CITY_MESSAGES_KEY,
                eventObject
            )
        );
    }
};
