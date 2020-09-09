import shortId from 'shortid';
import { isNil, get } from 'lodash';
import firebase from 'firebase';
import { firestore } from './firebaseService';
import { API_CONSTANTS } from '../common/constants';
import { getSortedCities, getCityObject, } from '../common/utils/utils';

//TODO: find out how to delete all messages without bugs
export const removeSessionMessagesIds = async (bot, chat_id) => {
    const messagesIds = await getSessionMessagesIds(chat_id);
    // const deleteMessagesReqs = Object.values(messagesIds).map(message_id => bot.deleteMessage(chat_id, message_id));
    try {
        Object.values(messagesIds).forEach(message_id => {
            try {
                bot.deleteMessage(chat_id, message_id)
            } catch (error) {
                console.log(error);
            }
        });
        // await Promise.all(deleteMessagesReqs);
    } catch (error) {
        // console.log(error);
    }
};

export const getTrip = async trip_id => await getDoc(trip_id, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME);

export const removeFieldInCollection = (docName, fieldToRemove, collection) => {
    return firestore.collection(collection).doc(docName.toString()).update({ [fieldToRemove]: firebase.firestore.FieldValue.delete() })
        .then(() => console.log("Document successfully deleted!"))
        .catch((error) => console.error("Error removing document: ", error));
};

export const removeDocInCollection = (docName, collection) => {
    return firestore.collection(collection).doc(docName).delete()
        .then(() => console.log("Document successfully deleted!"))
        .catch((error) => console.error("Error removing document: ", error));
};

export const getDoc = async (docName, collectionName = API_CONSTANTS.DB_USERS_COLLECTION_NAME, defaultValue) => {
    const snapshot = await firestore.collection(collectionName).doc(docName.toString()).get();
    const result = await snapshot.data();
    return result || defaultValue;
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

export const setNewDocToTripsCollection = (docName, data) => {
    firestore.collection(API_CONSTANTS.DB_TRIPS_COLLECTION_NAME).doc(docName.toString()).set(data)
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch(error => console.error('Error writing document: ', error));
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

export const updateAvailableSeatsInTip = (docName, availableSeatsCount, bookedSeatsCount, book_user_id, shouldRemoveUserId) => {
    firestore.collection(API_CONSTANTS.DB_TRIPS_COLLECTION_NAME)
        .doc(docName.toString())
        .update({
            ['book.available_seats_count']: availableSeatsCount,
            ['book.booked_seats_count']: bookedSeatsCount,
            [`book.booked_users_ids.${book_user_id}`]: shouldRemoveUserId ? firebase.firestore.FieldValue.delete() : book_user_id,
        })
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

export const getMyTripsIds = async chat_id => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME).doc(chat_id.toString()).get();
    const result = await alreadyUploadedRestaurantSnapshot.data();
    return get(result, 'trips', []);
};

export const getCurrentTripCreationDate = async chat_id => {
    const data = await getCreatingTrip(chat_id);
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
    const { day, hour, month, minutes } = await getCurrentTripCreationDate(docName);

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHour = isNil(hour) ? 0 : hour < 10 ? `0${hour}` : hour;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = isNil(minutes) ? 0 : minutes < 10 ? `0${minutes} хв` : `${minutes} хв`;

    return `📅 ${formattedDay}/${formattedMonth}   ⏰ ${isOnlyDate ? '🤷‍♀️' : `${formattedHour}:${formattedMinutes}`}`;
};

export const toggleIsTripCitiesCreating = async (id, data) => {
    await updateFieldInUserDoc(id, 'bot.is_trip_cities_creating', data)
};

export const resetSessionDataInDb = async id => {
    const alreadyExists = await getIfExistDoc(id);

    if (alreadyExists) {
        await toggleIsTripCreatingInProgress(id, false);
        await toggleIsFindTripProgress(id, false);
        await toggleIsFindTripCitiesCreating(id, false);
        await toggleIsTripCitiesCreating(id, false);
        await removeFindTripCities(id, false);
        await toggleIsTripPriceCreating(id, false);
    }
};

export const getCreatingTrip = async docName => await getFieldFromDoc(docName, 'create_trip');

export const getCarrierInfo = async docName => {
    return await getFieldFromDoc(docName,'carrier');
};

export const saveTripInDb = async docName => {
    const carrier = await getFieldFromDoc(docName, 'carrier');
    const trip = await getCreatingTrip(docName);

    await saveTripToLinkerCollection(docName, trip);
    const newTripObject = { ...trip, ...carrier };
    await saveTripToTripsCollection(newTripObject);
    await updateFieldInUserDoc(docName,'create_trip', {});
    await updateFieldInUserDoc(docName,`trips.${trip.trip_id}`, trip.trip_id);
};

const saveTripToLinkerCollection = async (docName, {trip_id, cities, start_date }) => {
    const sortedCities = getSortedCities(Object.values(cities));
    const reqs = sortedCities.slice(0, -1).map(async ({ place_id, name, order }, index) => {
        const linkShortId = shortId.generate();
        const data = { start_date, trip_id, cities, current_city_order: order };

        const alreadyExists = await getIfExistDoc(place_id, API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS);
        if (alreadyExists) {
            await updateFieldInTipsLinkerCollection(place_id,`${trip_id}.${linkShortId}`, data);
        } else {
            await setNewDocToTripsLinkerCollection(place_id, { [trip_id]: { [linkShortId]: data } });
        }
    });

    await Promise.all(reqs);
};

const saveTripToTripsCollection = async trip => {
    await setNewDocToTripsCollection(trip.trip_id, trip);
};

export const addCityToTripInDB = async (id, city) => {
    const cityObject = getCityObject(city);
    updateFieldInUserDoc(id, `create_trip.cities.${cityObject.place_id}`, cityObject)
};

export const getIfExistDoc = async (docName, collectionName = API_CONSTANTS.DB_USERS_COLLECTION_NAME) => {
    const alreadyUploadedRestaurantSnapshot = await firestore.collection(collectionName).doc(docName.toString()).get();
    return alreadyUploadedRestaurantSnapshot.exists;
};

export const addNewCreatingTrip = async (docName, tripObject, tripId) =>
    await updateFieldInUserDoc(docName, 'create_trip', tripObject);

export const setKeyboardMessageToDb = (chat_id, message_id) => {
    updateFieldInUserDoc(chat_id, `bot.keyboard_message_id`, message_id);
};

export const getKeyboardMessageId = async (chat_id) => {
    await getFieldFromDoc(chat_id,`bot.keyboard_message_id`);
};

export const toggleIsTripStartDateCompleted = async chat_id => {
    updateFieldInUserDoc(chat_id,'create_trip.start_date.is_start_date_completed', true);
};

export const getIsStartDateCreatingCompleted = async chat_id => {
    return await getFieldFromDoc(chat_id,'create_trip.start_date.is_start_date_completed', false);
};

export const setAvailableSeatsDataInDB = async (chat_id, data) => {
    await updateFieldInUserDoc(chat_id,'create_trip.book.available_seats_count', data);
};

export const getIsTripPriceSettings = async (chat_id) => {
    return await getFieldFromDoc(chat_id,`bot.is_trip_price_creating`);
};

export const toggleIsTripPriceCreating = async (chat_id, data) => {
    await updateFieldInUserDoc(chat_id, 'bot.is_trip_price_creating', data)
};

export const toggleIsFindTripCitiesCreating = async (chat_id, data) => {
    await updateFieldInUserDoc(chat_id, 'bot.is_find_trip_cities_creating', data)
};

export const setTripPrice = async (chat_id, data) => {
    await updateFieldInUserDoc(chat_id, 'create_trip.trip_price', data)
};

export const addSessionMessagesIdsToDb = async (chat_id, message_id) => {
    await updateFieldInUserDoc(chat_id,`bot.session_messages_ids.${message_id}`, message_id);
};

export const getSessionMessagesIds = async chat_id => await getFieldFromDoc(chat_id,`bot.session_messages_ids`);

export const clearSessionMessagesIdsInDb = async chat_id => await updateFieldInUserDoc(chat_id,`bot.session_messages_ids`, {});

export const getCreatingTripCities = async chat_id => await getFieldFromDoc(chat_id,'create_trip.cities', {});

export const saveCarrierPhoneNumberToDb = async (chat_id, phoneNumber) => {
    await updateFieldInUserDoc(chat_id,`carrier.phone_numbers.${phoneNumber}`, phoneNumber);
};

export const removeTripFromDb = async (chat_id, trip_id_to_remove) => {
    const userTripsIds = await getFieldFromDoc(chat_id,'trips',  []);
    const newTripsIds = Object.values(userTripsIds).reduce((result, trip_id) => {
        if (trip_id !== trip_id_to_remove) result[trip_id] = trip_id;
        return result;
    }, {});

    const tripToRemove = await getDoc(trip_id_to_remove, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME, { cities: [] });

    // we don't remove the last city in linker table
    const formattedCities = Object.values(tripToRemove.cities)
        .sort((a, b) => (a.order > b.order) ? -1 : 1)
        .splice(-1,1);

    const citiesIds = formattedCities.map(({ place_id }) => place_id);

    // remove trip from trips linker collection
    const reqs = citiesIds.map(place_id => {
        removeFieldInCollection(place_id, trip_id_to_remove, API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS);
    })
    await Promise.all(reqs);

    // remove trip from trips collection
    await removeDocInCollection(trip_id_to_remove, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME);

    // remove trip ids from user collection
    await updateFieldInUserDoc(chat_id,'trips', newTripsIds);
};

// trip creation / find

export const getIsTripCreatingInProgress = async chat_id => await getFieldFromDoc(chat_id,'bot.is_trip_creating_in_progress', false);

export const getIsFindTripCreatingInProgress = async chat_id => await getFieldFromDoc(chat_id,'bot.is_find_trip_in_progress', false);

export const toggleIsTripCreatingInProgress = async (chat_id, value) => await updateFieldInUserDoc(chat_id,'bot.is_trip_creating_in_progress', value);

export const toggleIsFindTripProgress = async (chat_id, value) => await updateFieldInUserDoc(chat_id,'bot.is_find_trip_in_progress', value);

