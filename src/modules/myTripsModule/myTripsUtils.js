import { isNil, isEmpty } from 'lodash';
import {
    removeTripKeyBoard,
    cancelBookedTripKeyboard,
    myTripsChooseRoleKeyboard,
} from '../keyboards/keyboards';
import {
    getDoc,
    getTrip,
    getMyTripsIds,
    getCarrierInfo,
    getFieldFromDoc,
    removeTripFromDb,
    removeFieldInCollection,
} from '../../services/helpers';
import { API_CONSTANTS } from '../../common/constants';
import {
    unBookTripInDb,
    handleUnBookTrip,
} from '../findTripsModule/foundTripsModule/bookTipUtils';
import {
    parseData,
    sendMessage,
    getFormattedCities,
    getTripHtmlSummary,
    getFormattedPhoneNumber,
} from '../../common/utils/utils';
import { getLocalizedMessage, keysActions } from '../../common/messages';

export const getFormattedTripsList = ({
    trips,
    customCarrierInfo,
    eventObject,
}) => {
    const formattedTrips = Object.values(trips).filter(
        (trip) => !isEmpty(trip)
    );
    return formattedTrips.map((trip, index) => {
        const carrierInfo = customCarrierInfo || trip;

        return {
            trip_id: trip.trip_id,
            html: `${getTripHtmlSummary({
                trip,
                carrierInfo,
                leftPadding: '\t',
                eventObject,
            }).replace(/,/g, '')}\n`,
        };
    });
};

const getMyCreatedTrips = async (chatId, msg) => {
    const tripsIds = await getMyTripsIds(chatId);
    const tripsReqs = Object.values(tripsIds).map(
        async (tripId) =>
            await getDoc(tripId, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME)
    );
    const trips = await Promise.all(tripsReqs);
    const customCarrierInfo = await getCarrierInfo(chatId);

    return getFormattedTripsList({
        trips,
        customCarrierInfo,
        eventObject: msg,
    });
};

export const sendOwnDrivingTripsList = async (bot, msg) => {
    const carrierTrips = await getMyCreatedTrips(msg.chat.id, msg);

    if (isEmpty(carrierTrips))
        return sendMessage(
            bot,
            msg.chat.id,
            getLocalizedMessage(
                keysActions.NOT_FOUND_CARRIER_TRIPS_MESSAGES_KEY,
                msg
            )
        );

    await sendMessage(
        bot,
        msg.chat.id,
        getLocalizedMessage(keysActions.TRIP_LIST_CAPTION_MESSAGES_KEY, msg),
        { parse_mode: 'HTML' }
    );
    carrierTrips.forEach(({ html, trip_id }) =>
        sendMessage(bot, msg.chat.id, html, {
            parse_mode: 'HTML',
            ...removeTripKeyBoard(trip_id, msg),
        })
    );
};

export const notificateUsers = async (bot, query, tripId) => {
    const {
        message: {
            chat: { first_name, last_name },
        },
    } = query;
    const trip = await getTrip(tripId);

    if (isNil(trip)) return;

    const message = `❌ <b>${first_name} ${last_name}</b> видалив поїздку <b>${getFormattedCities(
        trip,
        query
    )}</b>`;
    const messagesReqs = Object.values(trip.book.booked_users_ids).map(
        async (userId) => {
            await sendMessage(bot, userId, message, { parse_mode: 'HTML' });
            await removeFieldInCollection(
                userId,
                `booked_trips_ids.${tripId}`,
                API_CONSTANTS.DB_USERS_COLLECTION_NAME
            );
        }
    );

    await Promise.all(messagesReqs);
};

export const sendBookedTripsList = async (bot, msg) => {
    const chatId = msg.chat.id;
    const bookedTripsIds = await getFieldFromDoc(
        chatId,
        'booked_trips_ids',
        []
    );

    if (isEmpty(bookedTripsIds))
        return sendMessage(
            bot,
            msg.chat.id,
            getLocalizedMessage(
                keysActions.NOT_FOUNT_BOOKED_TRIPS_MESSAGES_KEY,
                msg
            )
        );

    const reqs = Object.values(bookedTripsIds).map(
        async (tripId) => await getTrip(tripId)
    );
    const bookedTripsObjects = await Promise.all(reqs);
    const formattedTripsList = getFormattedTripsList({
        trips: bookedTripsObjects,
        eventObject: msg,
    });

    await sendMessage(
        bot,
        msg.chat.id,
        getLocalizedMessage(
            keysActions.BOOKED_TRIP_LIST_CAPTION_MESSAGES_KEY,
            msg
        ),
        { parse_mode: 'HTML' }
    );
    formattedTripsList.forEach(({ html, trip_id }) =>
        sendMessage(bot, msg.chat.id, html, {
            parse_mode: 'HTML',
            ...cancelBookedTripKeyboard(trip_id, msg),
        })
    );
};

export const removeTrip = async (bot, query) => {
    const {
        message: {
            message_id,
            chat: { id },
        },
        data,
    } = query;
    const { payload: tripId } = parseData(data);

    await bot.deleteMessage(id, message_id);
    await notificateUsers(bot, query, tripId);
    await removeTripFromDb(id, tripId);
};

export const cancelTripBooking = async (bot, query) => {
    const { payload: trip_id } = parseData(query.data);
    const trip = await getTrip(trip_id);
    await unBookTripInDb(query, trip);
    await bot.deleteMessage(query.message.chat.id, query.message.message_id);
    await handleUnBookTrip(bot, query);
};

const getPassengersList = (passengersObjects, eventObject) =>
    `${passengersObjects.map(
        ({ carrier_name, carrier_last_name, phone_numbers }) => {
            const passenger = `👤 <b>${carrier_name} ${carrier_last_name}</b>`;
            const phoneNumber = `☎️ <b>${getLocalizedMessage(
                keysActions.CONTACT_NUMBER_MESSAGES_KEY,
                eventObject
            )}</b> ${Object.values(phone_numbers).map((number) =>
                getFormattedPhoneNumber(number)
            )}`;
            return `\n\n${passenger}\n${phoneNumber}`;
        }
    )}`;

export const showPassengers = async (bot, query) => {
    const {
        message: {
            chat: { id },
        },
        data,
    } = query;
    const { payload: tripId } = parseData(data);
    const {
        book: { booked_users_ids },
    } = await getTrip(tripId);

    if (isEmpty(booked_users_ids)) {
        return sendMessage(
            bot,
            id,
            getLocalizedMessage(keysActions.NO_PASSENGERS_MESSAGES_KEY, query)
        );
    }

    const bookedUsersReqs = Object.values(booked_users_ids).map((userId) =>
        getFieldFromDoc(userId, 'carrier')
    );
    const passengersObjects = await Promise.all(bookedUsersReqs);
    const passengersList = getPassengersList(passengersObjects, query);

    await sendMessage(bot, id, passengersList, { parse_mode: 'HTML' });
};

export const handleShowRolesKeyboard = async (bot, msg) => {
    await sendMessage(
        bot,
        msg.chat.id,
        getLocalizedMessage(keysActions.MY_TRIPS_CHOOSE_ROLE_MESSAGE_KEY, msg),
        myTripsChooseRoleKeyboard(msg)
    );
};
