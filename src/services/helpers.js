import shortId from 'shortid';
import { find, isNil, get } from 'lodash';
import { firestore } from '../services/firebaseService';
import { API_CONSTANTS } from '../common/constants';
import { arrToObjectMap, getCityObject, } from '../common/utils/utils';

export const getDoc = async (docName, collectionName = API_CONSTANTS.DB_USERS_COLLECTION_NAME) => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(collectionName).doc(docName.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();
    return result;
};

export const setNewDocToUsersCollection = (docName, data) => {
    firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(docName.toString()).set(data)
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const setNewDocToTripsLinkerCollection = (docName, data) => {
    firestore.collection(API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS).doc(docName.toString()).set(data)
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const getFieldFromDoc = async (docName, filedPath, defaultValue = undefined) => {
    const result = await getDoc(docName);
    return get(result, filedPath, defaultValue);
};

export const getFindTripDate = async chat_id => {
    return await getFieldFromDoc(chat_id, 'find_trip.date', { day: null, month: null, year: null })
};

export const getAllTrips = async chat_id => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(chat_id.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();
    return get(result, 'trips', []);
};

export const updateFieldInUserDoc = (docName, fieldPath, data) => {
    firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(docName.toString()).update({ [fieldPath]: data })
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const updateFieldInTipsLinkerCollection = (docName, fieldPath, data) => {
    firestore.collection(API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS).doc(docName.toString()).update({ [fieldPath]: data })
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const getCurrentTripDate = async chat_id => {
    const data = await getNotCompletedTrip(chat_id);
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

    return { day, hour, year, month, minutes }
};

export const getIsTripCitiesCreating = async docName => {
    const carrierData = await firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(docName.toString()).get();
    const data = await carrierData.data();

    if(isNil(data)) return false;
    return get(data, 'bot.is_trip_cities_creating');
};

export const getIsFindTripCitiesCreating = async docName => {
    const carrierData = await firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(docName.toString()).get();
    const data = await carrierData.data();

    if(isNil(data)) return false;
    return get(data, 'bot.is_find_trip_cities_creating', false);
};


export const removeFindTripCities = async id => {
    await updateFieldInUserDoc(id, 'find_trip.cities', {})
};

export const getCurrentTripDateText = async (docName, isOnlyDate) => {
    const { day, hour, month, minutes } = await getCurrentTripDate(docName);

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = isNil(minutes) ? 0 : minutes < 10 ? `0${minutes} хв` : `${minutes} хв`;

    return `📅 ${formattedDay}/${formattedMonth}   ⏰ ${isOnlyDate ? '🤷‍♀️' : `${formattedHour}:${formattedMinutes}`}`;
};

export const getFindTripDateText = async docName => {
    const { day, month } = await getFindTripDate(docName);
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `📅 ${formattedDay}/${formattedMonth}`
};

export const toggleIsTripCitiesCreating = async (id, data) => {
    await updateFieldInUserDoc(id, 'bot.is_trip_cities_creating', data)
};

export const resetSessionDataInDb = async id => {
    const alreadyExists = await getIfExistDoc(id);

    if (alreadyExists) {
        await toggleIsFindTripCitiesCreating(id, false);
        await removeNotCompletedTripsFromDb(id);
        await toggleIsTripCitiesCreating(id, false);
        await removeFindTripCities(id, false);
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
    if (isNil(trip)) return;

    await updateFieldInUserDoc(docName,`trips.${trip.trip_id}.is_creation_completed`, true);
    await saveTripToLinkerCollection(docName, trip);
};

const saveTripToLinkerCollection = async (docName, {trip_id, cities }) => {
    const formattedCities = Object.values(cities);
    const reqs = formattedCities.slice(0, -1).map(async ({ place_id, name }, index) => {
        const linkShortId = shortId.generate();
        const data = { trip_id, cities };

        const alreadyExists = await getIfExistDoc(place_id, API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS);
        if (alreadyExists) {
            await updateFieldInTipsLinkerCollection(place_id,`${linkShortId}`, data);
        } else {
            await setNewDocToTripsLinkerCollection(place_id, { [linkShortId]: data });
        }
    });

    await Promise.all(reqs);
};

export const addCityToTripInDB = async (id, city) => {
    const notCompletedTrip = await getNotCompletedTrip(id);
    if (isNil(notCompletedTrip)) return;

    const { trip_id } = notCompletedTrip;
    const cityObject = getCityObject(city);

    updateFieldInUserDoc(id, `trips.${trip_id}.cities.${cityObject.place_id}`, cityObject)
};

export const addCityToFindTripInDB = async (id, city) => {
    const cityObject = getCityObject(city);
    updateFieldInUserDoc(id, `find_trip.cities.${cityObject.place_id}`, cityObject)
};

export const getIfExistDoc = async (docName, collectionName = API_CONSTANTS.DB_USERS_COLLECTION_NAME) => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(collectionName).doc(docName.toString()).get();
    return alreadyUploadedRestaurantSnapshot.exists;
};

export const addNewTripToDb = async (docName, tripObject, tripId) => {
    await updateFieldInUserDoc(docName, `trips.${tripId}`, tripObject);
    const allTrips = await getAllTrips(docName);
};

const removeNotCompletedTripsFromDb = async chat_id => {
    const allTrips = await getAllTrips(chat_id);

    const completedTrips = Object.values(allTrips).filter(({ is_creation_completed }) => is_creation_completed === true);
    const formattedTrips = arrToObjectMap(completedTrips, 'trip_id');
    updateFieldInUserDoc(chat_id, `trips`, formattedTrips);
};

export const setKeyboardMessageToDb = (chat_id, message_id) => {
    updateFieldInUserDoc(chat_id, `bot.keyboard_message_id`, message_id);
};

export const getKeyboardMessageId = async (chat_id) => {
    await getFieldFromDoc(chat_id,`bot.keyboard_message_id`);
};

export const toggleIsTripStartDateCompleted = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);

    if (isNil(trip)) return;
    updateFieldInUserDoc(chat_id,`trips.${trip.trip_id}.start_date.is_start_date_completed`, true);
};

export const getIsStartDateCreatingCompleted = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`trips.${trip.trip_id}.start_date.is_start_date_completed`);
};

export const setAvailableSeatsDataInDB = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldInUserDoc(chat_id,`trips.${trip.trip_id}.available_seats_count`, data);
};

export const getIsTripPriceSettings = async (chat_id) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`bot.is_trip_price_creating`);
};

export const toggleIsTripPriceCreating = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldInUserDoc(chat_id, 'bot.is_trip_price_creating', data)
};

export const toggleIsFindTripCitiesCreating = async (chat_id, data) => {
    await updateFieldInUserDoc(chat_id, 'bot.is_find_trip_cities_creating', data)
};

export const setTripPrice = async (chat_id, data) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldInUserDoc(chat_id, `trips.${trip.trip_id}.trip_price`, data)
};

export const addSessionMessagesIdsToDb = async (chat_id, message_id) => {
    await updateFieldInUserDoc(chat_id,`bot.session_messages_ids.${message_id}`, message_id);
};

export const getSessionMessagesIds = async chat_id => await getFieldFromDoc(chat_id,`bot.session_messages_ids`);

export const clearSessionMessagesIdsInDb = async chat_id => await updateFieldInUserDoc(chat_id,`bot.session_messages_ids`, {});

//TODO: find out how to delete all messages without bugs
export const removeSessionMessagesIds = async (bot, chat_id) => {
    const messagesIds = await getSessionMessagesIds(chat_id);
    // const deleteMessagesReqs = Object.values(messagesIds).map(message_id => bot.deleteMessage(chat_id, message_id));
    try {
        Object.values(messagesIds).forEach(message_id => bot.deleteMessage(chat_id, message_id));
        // await Promise.all(deleteMessagesReqs);
    } catch (error) {
        // console.log(error);
    }
};

export const getTripCities = async chat_id => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    return await getFieldFromDoc(chat_id,`trips.${trip.trip_id}.cities`);
};

export const getFindTripCities = async chat_id => {
    return await getFieldFromDoc(chat_id,'find_trip.cities',  {});
};

export const saveCarrierPhoneNumberToDb = async (chat_id, phoneNumber) => {
    const trip = await getNotCompletedTrip(chat_id);
    if (isNil(trip)) return;

    await updateFieldInUserDoc(chat_id,`carrier.phone_numbers.${phoneNumber}`, phoneNumber);
};

export const removeTripFromDb = async (chat_id, trip_id) => {
    const allTrips = await getAllTrips(chat_id);
    const newTrips = Object.values(allTrips).reduce((result, trip) => {
        if (trip.trip_id !== trip_id) result[trip_id] = trip;
        return result;
    }, {});

    await updateFieldInUserDoc(chat_id,'trips', newTrips);
};
