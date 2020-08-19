import shortid from 'shortid';
import {
    getIfExistDoc,
    addNewTripToDb,
    setNewDocToCollection,
    getKeyboardMessageId,
    resetSessionDataInDb
} from '../../services/helpers';
import { initialKeyboard } from '../../modules/keyboards/keyboards';
import {
    CHOOSE_CITY_MESSAGE,
    CHOOSE_ROLE_MESSAGE,
    NOT_FOUND_CITY_MESSAGE,
    START_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    FINAL_CITY_IN_THE_TRIP,
    PROPOSE_TRIP,
} from '../../common/constants/commonСonstants';

export const getTripObject = ({
                                  stop_city = null,
                                  start_city = null,
                                  trip_creation_date = null,
                                  start_date_milliseconds = null,
                                  stop_date_milliseconds = null,
                                  start_date_month = null,
                                  start_date_year = null,
                                  start_date_hour = null,
                                  start_date_minutes = null,
                                  stop_date_month = null,
                                  stop_date_year = null,
                                  stop_date_hour = null,
                                  stop_date_minutes = null,
                                  start_date_day = null,
                                  stop_date_day = null,
                                  is_creation_completed = false,
                                  trip_id = null,
                              } ) => ({

    trip_id,
    start_city,
    stop_city,
    trip_creation_date,
    stop_date_milliseconds,
    start_date_milliseconds,
    is_creation_completed,
    start_date: {
        start_date_month,
        start_date_year,
        start_date_hour,
        start_date_day,
        start_date_minutes,
    },
    stop_date: {
        stop_date_month,
        stop_date_year,
        stop_date_hour,
        stop_date_minutes,
        stop_date_day
    },
    cities: {}
});

const getCarrierObject = ({
                              chat_id = null,
                              carrier_name = null,
                              creation_date = null,
                              carrier_last_name = null,
                          }) => ({
    bot: {
        is_trip_cities_creating: false,
        keyboard_message_id: null
    },
    carrier: {
        chat_id,
        carrier_name,
        creation_date,
        carrier_last_name
    },
    trips: {}
});

export const createAction = (type, payload) => JSON.stringify({ type, payload });

export const parseData = data => JSON.parse(data);

export const addNewUserToDb = async query => {
    const {date: creation_date} = query;
    const {id: chat_id, first_name: carrier_name, last_name: carrier_last_name} = query.chat;

    const alreadyCarrierExistsInDb = await getIfExistDoc(chat_id);

    if (!alreadyCarrierExistsInDb) {
        const carrierObject = getCarrierObject({chat_id, carrier_name, carrier_last_name, creation_date});
        await setNewDocToCollection(chat_id, carrierObject);
    }
};

export const addNewTrip = async msg => {
    const { chat: { id: chat_id } } = msg;

    const trip_id = shortid.generate();
    const tripObject = getTripObject({ trip_id });
    await addNewTripToDb(chat_id, tripObject, trip_id)
};

export const getCityObject = ({ city_id, name = null, address = null, location = null }) => ({
    city_id, name, address, location
});

export const arrToObjectMap = (arr, fieldId) => arr.reduce((result, obj) => {
        result[obj[`${fieldId}`]] = obj;
        return result;
    }, {});

export const removeKeyboard = (bot, msg) => {
    const { text, chat: { id: chat_id }} = msg;
    console.log(msg);
    const keyboardMessageId = getKeyboardMessageId(chat_id);

    bot.editMessageText(text, {keyboardMessageId, chat_id, reply_markup: {remove_keyboard: true}})
        .catch(() => {})
        .then(() => {})
};


export const goToTheMainMenu = async (bot, id) => {
    resetSessionDataInDb(id);
    bot.sendMessage(id, CHOOSE_ROLE_MESSAGE, initialKeyboard);
};

export const getIsBotMessage = messageText => [
    START_MESSAGE,
    CHOOSE_CITY_MESSAGE,
    NOT_FOUND_CITY_MESSAGE,
    GO_TO_THE_MAIN_MENU,
    NEXT_CITY_IN_THE_TRIP,
    FINAL_CITY_IN_THE_TRIP,
    PROPOSE_TRIP,
].includes(messageText);

export const sendMessageAndRemoveKeyboard = (bot, id, msg) =>
    bot.sendMessage(id, msg, { reply_markup: { remove_keyboard: true } });
