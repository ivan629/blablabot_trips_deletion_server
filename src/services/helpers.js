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

export const getCurrentStartTripDate = async chat_id => {
    const data = await getNotCompletedTrip(chat_id);
    return get(data, 'start_date', {});
};

export const getIsTripCitiesCreating = async docName => {
    const carrierData = await firestore.collection(API_CONSTANTS.DB_COLLECTION_NAME).doc(docName.toString()).get();
    const data = await carrierData.data();

    if(isNil(data)) return false;
    return get(data, 'bot.is_trip_cities_creating');
};

export const getCurrentStartTripDateText = async (docName) => {
    const {
        start_date_day,
        start_date_hour,
        start_date_year,
        start_date_month,
        start_date_minutes,
    } = await getCurrentStartTripDate(docName);

    const formattedDay = start_date_day < 10 ? `0${start_date_day}` : start_date_day;
    const formattedHour = isNil(start_date_hour) ? 0 : start_date_hour < 10 ? `0${start_date_hour}` : start_date_hour;
    const formattedMonth = start_date_month < 10 ? `0${start_date_month}` : start_date_month;
    const formattedMinutes = isNil(start_date_minutes) ? 0 : start_date_minutes < 10 ? `0${start_date_minutes} хв` : `${start_date_minutes} хв`;

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

export const getKeyboardMessageId = (chat_id) => {
    getFieldFromDoc(chat_id,`bot.keyboard_message_id`);
};
