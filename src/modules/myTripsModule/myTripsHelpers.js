import { isEmpty } from 'lodash';
import { TRIP_LIST_CAPTION, NOT_FOUNT_TRIPS_MESSAGES } from '../../common/constants/commonСonstants';
import { goToMenuKeyboard, removeTripKeyBoard } from './../keyboards/keyboards';
import { getMyTripsIds, getAllTrips, getCarrierInfo, removeTripFromDb, getDoc } from './../../services/helpers';
import { getTripHtmlSummary, parseData, sendMessage } from './../../common/utils/utils';
import { API_CONSTANTS } from '../../common/constants';

export const getMyCreatedTrips = async ({ chat: { id } }) => {
    const tripsIds = await getMyTripsIds(id);
    const tripsReqs = Object.values(tripsIds).map(async tripId => await getDoc(tripId, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME));
    const trips = await Promise.all(tripsReqs);
    const carrierInfo = await getCarrierInfo(id);

    const formattedTrips = Object.values(trips);
    return formattedTrips.map((trip, index) => ({
        trip_id: trip.trip_id,
        html: `${getTripHtmlSummary({ trip, carrierInfo, leftPadding: '\t' }).replace(/,/g, "")}\n`
    }));
};

export const sendTripsList = async (bot, msg) => {
    const carrierTrips = await getMyCreatedTrips(msg);
    if (isEmpty(carrierTrips)) return sendMessage(bot, msg.chat.id, NOT_FOUNT_TRIPS_MESSAGES);

    await sendMessage(bot, msg.chat.id, TRIP_LIST_CAPTION, { parse_mode: 'HTML', ...goToMenuKeyboard });
    carrierTrips.forEach(({ html, trip_id }) => sendMessage(bot, msg.chat.id, html, { parse_mode: 'HTML', ...removeTripKeyBoard(trip_id) }));
};

export const removeTrip = async (bot, query) => {
    const { message: { message_id, chat: { id }}, data } = query;
    const { payload: tripId } = parseData(data);
    await bot.deleteMessage(id, message_id);
    await removeTripFromDb(id, tripId);
};
