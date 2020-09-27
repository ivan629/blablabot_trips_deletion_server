import firebase from 'firebase';
import { firestore } from './firebaseService';
import { API_CONSTANTS, COMMON_CONSTANTS } from '../common/constants';

export const getDoc = async (
    docName,
    collectionName = API_CONSTANTS.DB_USERS_COLLECTION_NAME,
    defaultValue
) => {
    const snapshot = await firestore
        .collection(collectionName)
        .doc(docName.toString())
        .get();
    const result = await snapshot.data();
    return result || defaultValue;
};

export const removeDocInCollection = (docName, collection) => {
    return firestore
        .collection(collection)
        .doc(docName)
        .delete()
        .then(() => console.log('Document successfully deleted!'))
        .catch((error) => console.error('Error removing document: ', error));
};

export const updateFieldInUserDoc = (docName, fieldPath, data) => {
    firestore
        .collection(API_CONSTANTS.DB_USERS_COLLECTION_NAME)
        .doc(docName.toString())
        .update({ [fieldPath]: data })
        .then(() => {
            console.count('Document successfully written!');
        })
        .catch((error) => console.error('Error writing document: ', error));
};

export const removeTripIdFromUserBookedTrips = async (trip_id_to_remove, userIds = []) => {
    const reqs = userIds.map(async userId => {
        await removeFieldInCollection(
            userId,
            `booked_trips_ids.${trip_id_to_remove}`,
            API_CONSTANTS.DB_USERS_COLLECTION_NAME
        );
    });

    await Promise.all(reqs);
};

export const removeTripIdFromUserCreatedTips = async (tripIdToRemove, userId) => {
    await removeFieldInCollection(
        userId,
        `trips.${tripIdToRemove}`,
        API_CONSTANTS.DB_USERS_COLLECTION_NAME
    );
};

export const removeFieldInCollection = (docName, fieldToRemove, collection) => {
    return firestore
        .collection(collection)
        .doc(docName.toString())
        .update({ [fieldToRemove]: firebase.firestore.FieldValue.delete() })
        .then(() => console.log('Document successfully deleted!'))
        .catch((error) => console.error('Error removing document: ', error));
};

const removeTripFromTripsLinkerCollection = async tripId => {
    const tripToRemove = await getDoc(
        tripId,
        API_CONSTANTS.DB_TRIPS_COLLECTION_NAME,
        { cities: [] }
    );

    // we don't remove the last city in linker table
    const formattedCities = Object.values(tripToRemove.cities)
        .sort((a, b) => (a.order > b.order ? -1 : 1))
        .splice(-1, 1);

    const citiesIds = formattedCities.map(({ place_id }) => place_id);

    const reqs = citiesIds.map((placeId) => {
        removeFieldInCollection(
            placeId,
            tripId,
            API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS
        );
    });
    await Promise.all(reqs);
}

export const removeExpiredTrips = async () => {
    const currentDateMilliseconds = Date.now();
    const tripsRef = firestore.collection(API_CONSTANTS.DB_TRIPS_COLLECTION_NAME);
    const snapshot = await tripsRef.where('stop_date.stop_date_milliseconds', '<', currentDateMilliseconds).get();

    if (!snapshot.empty) {
        const results = [];

        snapshot.forEach(doc => {
            results.push(doc.data());
        })

        const removeTripsReqs = results.map(async doc => {
            const { chat_id, trip_id, book: { booked_users_ids } } = doc;

            // order makes sense
            await removeTripFromTripsLinkerCollection(trip_id);
            await removeTripIdFromUserBookedTrips(trip_id, Object.values(booked_users_ids))
            await removeTripIdFromUserCreatedTips(trip_id, chat_id)
            await removeDocInCollection(trip_id, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME);
        })

        await Promise.all(removeTripsReqs);
    }

    setTimeout(() => removeExpiredTrips(), COMMON_CONSTANTS.TRIPS_INTERVAL_MS)
};
