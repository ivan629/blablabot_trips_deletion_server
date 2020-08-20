import shortId from 'shortid';
import { find, isNil, get } from 'lodash';
import { firestore } from '../services/firebaseService';
import { API_CONSTANTS } from '../common/constants';
import { arrToObjectMap, getCityObject, } from '../common/utils/utils';

export const setNewDocToCollection = (docName, data) => {
    firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).set(data)
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
};

export const getFieldFromDoc = async (docName, filedPath) => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();

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
    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const dateType = isStartDateCreatingCompleted ? 'stop_date' : 'start_date';

    console.log(data);

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
    const carrierData = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    const data = await carrierData.data();

    if(isNil(data)) return false;
    return get(data, 'bot.is_trip_cities_creating');
};

export const getCurrentTripDateText = async (docName) => {
    const { day, hour, month, minutes } = await getCurrentTripDate(docName);

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = isNil(minutes) ? 0 : minutes < 10 ? `0${minutes} хв` : `${minutes} хв`;

    return `<strong>Дата: </strong>${formattedDay}/${formattedMonth}   <strong>Час: </strong>${formattedHour}:${formattedMinutes}`;
};

export const toggleIsTripCitiesCreating = async (id, data) => {
    await updateFieldDb(id, 'bot.is_trip_cities_creating', data)
};

export const resetSessionDataInDb = async id => {
    const alreadyExists = await getIfExistDoc(id);

    if (alreadyExists) {
        await toggleIsTripCitiesCreating(id, false);
        await removeNotCompletedTripsFromDb(id);
    }
};

export const getNotCompletedTrip = async docName => {
    const trips = await getAllTrips(docName);
    return find(Object.values(trips), { is_creation_completed: false });
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

export const addNewTripToDb = (docName, tripObject, tripId) => {
    updateFieldDb(docName, `trips.${tripId}`, tripObject)
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
