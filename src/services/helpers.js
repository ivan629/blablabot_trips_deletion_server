import shortId from 'shortid';
import { find, isNil, get } from 'lodash';
import { firestore } from '../services/firebaseService';
import { API_CONSTANTS } from '../common/constants';
import { arrToObjectMap, getCityObject, } from '../common/utils/utils';

export const getDoc = async docName => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();
    return result;
};

export const setNewDocToCollection = (docName, data) => {
    firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).set(data)
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const getFieldFromDoc = async (docName, filedPath) => {
    const result = await getDoc(docName);
    return get(result, filedPath);
};

export const getAllTrips = async chat_id => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(chat_id.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();
    return get(result, 'trips', []);
};

export const updateFieldDb = (docName, fieldPath, data) => {
    firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).update({ [fieldPath]: data })
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const getCurrentTripDate = async chat_id => {
    const data = await getNotCompletedTrip(chat_id);
    console.log(data);
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const dateType = isStartDateCreatingCompleted ? 'stop_date' : 'start_date';

    const {
        start_date_day,
        start_date_hour,
        start_date_year,
        start_date_month,
        start_date_minutes,
        stop_date_day,
        stop_date_hour,
        stop_date_year,
        stop_date_month,
        stop_date_minutes,
    } = get(data, dateType,{});

    const day = start_date_day || stop_date_day;
    const hour = start_date_hour || stop_date_hour;
    const year = start_date_year || stop_date_year;
    const month = start_date_month || stop_date_month;
    const minutes = start_date_minutes || stop_date_minutes;

    console.log(start_date_month, stop_date_month);

    return { day, hour, year, month, minutes }
};

export const getIsTripCitiesCreating = async docName => {
    const carrierData = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    const data = await carrierData.data();

    if(isNil(data)) return false;
    return get(data, 'bot.is_trip_cities_creating');
};

export const getCurrentTripDateText = async (docName, isOnlyDate) => {
    const { day, hour, month, minutes } = await getCurrentTripDate(docName);

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = isNil(minutes) ? 0 : minutes < 10 ? `0${minutes} хв` : `${minutes} хв`;

    return `📅 ${formattedDay}/${formattedMonth}   ⏰ ${isOnlyDate ? '🤷‍♀️' : `${formattedHour}:${formattedMinutes}`}`;
};

export const toggleIsTripCitiesCreating = async (id, data) => {
    await updateFieldDb(id, 'bot.is_trip_cities_creating', data)
};

export const resetSessionDataInDb = async id => {
    const alreadyExists = await getIfExistDoc(id);

    if (alreadyExists) {
        await removeNotCompletedTripsFromDb(id);
        await toggleIsTripCitiesCreating(id, false);
        await toggleIsTripPriceCreating(id, false);
    }
};

export const getNotCompletedTrip = async docName => {
    const trips = await getAllTrips(docName);
    return find(Object.values(trips), { is_creation_completed: false });
};

export const getCarrierInfo = async docName => {
    return await getFieldFromDoc(docName,'carrier');
};

export const saveTripInDb = async docName => {
    const trip = await getNotCompletedTrip(docName);
    console.log(trip);
    if (isNil(trip)) return;

    await updateFieldDb(docName,`trips.${trip.trip_id}.is_creation_completed`, true);
};

export const addCityToTripInDB = async (id, city) => {
    const notCompletedTrip = await getNotCompletedTrip(id);
    if (isNil(notCompletedTrip)) return;

    const city_id = shortId.generate();
    const { trip_id } = await getNotCompletedTrip(id);
    const cityObject = getCityObject({ city_id, name: city });

    updateFieldDb(id, `trips.${trip_id}.cities.${city_id}`, cityObject)
};

export const getIfExistDoc = async docName => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    return alreadyUploadedRestaurantSnapshot.exists;
};

export const addNewTripToDb = async (docName, tripObject, tripId) => {
    await updateFieldDb(docName, `trips.${tripId}`, tripObject);
    const allTrips = await getAllTrips(docName);
    console.log(allTrips);
};

const removeNotCompletedTripsFromDb = async chat_id => {
    const allTrips = await getAllTrips(chat_id);

    const completedTrips = Object.values(allTrips).filter(({ is_creation_completed }) => is_creation_completed === true);
    const formattedTrips = arrToObjectMap(completedTrips, 'id');
    updateFieldDb(chat_id, `trips`, formattedTrips);
};

export const setKeyboardMessageToDb = (chat_id, message_id) => {
    updateFieldDb(chat_id, `bot.keyboard_message_id`, message_id);
};

export const getKeyboardMessageId = async (chat_id) => {
    await getFieldFromDoc(chat_id,`bot.keyboard_message_id`);
};

export const toggleIsTripStartDateCompleted = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);

    if (isNil(trip)) return;
    updateFieldDb(chat_id,`trips.${trip.trip_id}.start_date.is_start_date_completed`, true);
};

export const getIsStartDateCreatingCompleted = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`trips.${trip.trip_id}.start_date.is_start_date_completed`);
};

export const setAvailableSeatsDataInDB = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldDb(chat_id,`trips.${trip.trip_id}.available_seats_count`, data);
};

export const getIsTripPriceSettings = async (chat_id) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`bot.is_trip_price_creating`);
};

export const toggleIsTripPriceCreating = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldDb(chat_id, 'bot.is_trip_price_creating', data)
};

export const setTripPrice = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldDb(chat_id, `trips.${trip.trip_id}.trip_price`, data)
};

export const addSessionMessagesIdsToDb = async (chat_id, message_id) => {
    await updateFieldDb(chat_id,`bot.session_messages_ids.${message_id}`, message_id);
};

export const getSessionMessagesIds = async chat_id => await getFieldFromDoc(chat_id,`bot.session_messages_ids`);

export const clearSessionMessagesIdsInDb = async chat_id => await updateFieldDb(chat_id,`bot.session_messages_ids`, {});

export const removeSessionMessagesIds = async (bot, chat_id) => {
    const messagesIds = await getSessionMessagesIds(chat_id);
    const deleteMessagesReqs = Object.values(messagesIds).map(message_id => bot.deleteMessage(chat_id, message_id));
    console.log(messagesIds);
    try {
        await Promise.all(deleteMessagesReqs);
    } catch (error) {
        // console.log(error);
    }
};

export const getTripCities = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`trips.${trip.trip_id}.cities`);
};

export const saveCarrierPhoneNumberToDb = async (chat_id, phoneNumber) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldDb(chat_id,'carrier.phone_number', phoneNumber);
};

export const removeTripFromDb = async (chat_id, trip_id) => {
    const allTrips = await getAllTrips(chat_id);
    const newTrips = Object.values(allTrips).reduce((result, trip) => {
        if (trip.trip_id !== trip_id) result[trip_id] = trip;
        return result;
    }, {});

    await updateFieldDb(chat_id,'trips', newTrips);
};
