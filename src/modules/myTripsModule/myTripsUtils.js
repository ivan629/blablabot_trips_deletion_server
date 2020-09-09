import { isEmpty } from 'lodash';
import {
    TRIP_LIST_CAPTION,
    NO_PASSENGERS_MESSAGE,
    NOT_FOUNT_TRIPS_MESSAGES,
    BOOKED_TRIP_LIST_CAPTION,
    MY_TRIPS_CHOOSE_ROLE_MESSAGE,
    NOT_FOUNT_BOOKED_TRIPS_MESSAGES,
} from '../../common/constants/commonСonstants';
import {
    myTripActionsKeyBoard,
    cancelBookedTripKeyboard,
    myTripsChooseRoleKeyboard,
} from '../keyboards/keyboards';
import {
    getDoc,
    getTrip,
    getMyTripsIds,
    getCarrierInfo,
    getFieldFromDoc,
    removeTripFromDb
} from '../../services/helpers';
import { API_CONSTANTS } from '../../common/constants';
import { unBookTripInDb } from '../findTripsModule/foundTripsModule/bookTipUtils';
import { getTripHtmlSummary, parseData, sendMessage } from '../../common/utils/utils';

export const getFormattedTripsList = (trips, customCarrierInfo) => {
    const formattedTrips = Object.values(trips).filter(trip => !isEmpty(trip));
    return formattedTrips.map((trip, index) => {
        const carrierInfo  = customCarrierInfo || trip;

        return ({
            trip_id: trip.trip_id,
            html: `${getTripHtmlSummary({trip, carrierInfo, showCarrierFullInfo: true }).replace(/,/g, "")}\n`
        });
    });
};

const getMyCreatedTrips = async chatId => {
    const tripsIds = await getMyTripsIds(chatId);
    const tripsReqs = Object.values(tripsIds).map(async tripId => await getDoc(tripId, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME));
    const trips = await Promise.all(tripsReqs);
    const carrierInfo = await getCarrierInfo(chatId);

    return getFormattedTripsList(trips, carrierInfo);
};

export const sendOwnDrivingTripsList = async (bot, msg) => {
    const carrierTrips = await getMyCreatedTrips(msg.chat.id);
    if (isEmpty(carrierTrips)) return sendMessage(bot, msg.chat.id, NOT_FOUNT_TRIPS_MESSAGES);

    await sendMessage(bot, msg.chat.id, TRIP_LIST_CAPTION, { parse_mode: 'HTML' });
    carrierTrips.forEach(({ html, trip_id }) => sendMessage(bot, msg.chat.id, html, { parse_mode: 'HTML', ...myTripActionsKeyBoard(trip_id) }));
};

export const sendBookedTripsList = async (bot, msg) => {
    const chatId = msg.chat.id;
    const bookedTripsIds = await getFieldFromDoc(chatId, 'booked_trips_ids', []);

    if (isEmpty(bookedTripsIds)) return sendMessage(bot, msg.chat.id, NOT_FOUNT_BOOKED_TRIPS_MESSAGES);

    const reqs = Object.values(bookedTripsIds).map(async tripId => await getTrip(tripId));
    const bookedTripsObjects = await Promise.all(reqs);
    const formattedTripsList = getFormattedTripsList(bookedTripsObjects)

    await sendMessage(bot, msg.chat.id, BOOKED_TRIP_LIST_CAPTION, { parse_mode: 'HTML' });
    formattedTripsList.forEach(({ html, trip_id }) => sendMessage(bot, msg.chat.id, html, { parse_mode: 'HTML', ...cancelBookedTripKeyboard(trip_id) }));
};

export const removeTrip = async (bot, query) => {
    const { message: { message_id, chat: { id }}, data } = query;
    const { payload: tripId } = parseData(data);
    await bot.deleteMessage(id, message_id);
    await removeTripFromDb(id, tripId);
};

export const cancelTripBooking = async (bot, query) => {
    await unBookTripInDb(query);
    await bot.deleteMessage(query.message.chat.id, query.message.message_id);
};

export const handleShowRolesKeyboard = async (bot, msg) => {
    await sendMessage(bot, msg.chat.id, MY_TRIPS_CHOOSE_ROLE_MESSAGE, myTripsChooseRoleKeyboard);
};

const getPassengersList = passengersObjects => `${passengersObjects.map(({ carrier_name, carrier_last_name, phone_numbers }) => {
    const passenger = `👤 <b>${carrier_name} ${carrier_last_name}</b>`
    const phoneNumber = `☎️ <b>Контактний номер</b>  ${Object.values(phone_numbers).map(number => `+${number}`)}`;
    return `\n\n${passenger}\n${phoneNumber}`;
})}`

export const showPassengers = async (bot, query) => {
    const { message: { chat: { id }}, data } = query;
    const { payload: tripId } = parseData(data);
    const { book: { booked_users_ids } } = await getTrip(tripId);

    if(isEmpty(booked_users_ids)) {
        return  sendMessage(bot, id, NO_PASSENGERS_MESSAGE);
    }

    const bookedUsersReqs = Object.values(booked_users_ids).map(userId => getFieldFromDoc(userId, 'carrier'))
    const passengersObjects = await Promise.all(bookedUsersReqs);
    const passengersList = getPassengersList(passengersObjects);

    sendMessage(bot, id, passengersList, { parse_mode: 'HTML' });
};
