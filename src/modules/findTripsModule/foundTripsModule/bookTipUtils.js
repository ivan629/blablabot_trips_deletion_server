import { getTripHtmlSummary, parseData } from '../../../common/utils/utils';
import {
    getTrip,
    removeFieldInCollection,
    updateAvailableSeatsInTip,
    updateFieldInUserDoc
} from '../../../services/helpers';
import { myTripsTripActionKeyboard } from '../../keyboards/keyboards';
import { API_CONSTANTS } from '../../../common/constants';

export const bookTripInDb = async query => {
    const { id: chat_id } = query.message.chat;
    const { payload: trip_id } = parseData(query.data);
    let { book: { booked_seats_count, available_seats_count } } = await getTrip(trip_id);

    const newBookedSeatsCount = booked_seats_count === available_seats_count ? available_seats_count : booked_seats_count + 1;
    await updateFieldInUserDoc(chat_id, `booked_trips_ids.${trip_id}`, trip_id);
    await updateAvailableSeatsInTip(trip_id, available_seats_count, newBookedSeatsCount, chat_id);
};

export const unBookTripInDb = async query => {
    const { id: chat_id } = query.message.chat;
    const { payload: trip_id } = parseData(query.data);
    let { book: { booked_seats_count, available_seats_count } } = await getTrip(trip_id);

    const newBookedSeatsCount = booked_seats_count === 0 ? 0 : booked_seats_count - 1;
    await removeFieldInCollection(chat_id, `booked_trips_ids.${trip_id}`, API_CONSTANTS.DB_USERS_COLLECTION_NAME);
    await updateAvailableSeatsInTip(trip_id, available_seats_count, newBookedSeatsCount, chat_id);
};

export const editTripMessage = async (bot, query, isAfterBooked) => {
    const { id: chat_id } = query.message.chat;
    const { payload: trip_id } = parseData(query.data);
    const trip = await getTrip(trip_id);
    const tripHtml = await getTripHtmlSummary({trip, showCarrierFullInfo: true, carrierInfo: trip});
    const alreadyBookedTripsIds = isAfterBooked ? [trip_id] : [];
    const keyBoard = myTripsTripActionKeyboard({ trip_id, alreadyBookedTripsIds, query });

    const editMessageConfig = {
        chat_id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify(keyBoard),
    };

    bot.editMessageText(tripHtml, editMessageConfig);
}

export const handleBookTrip = async (bot, query) => {
    await bookTripInDb(query);
    await editTripMessage(bot, query, true);
};

export const handleUnBookTrip = async (bot, query) => {
    await unBookTripInDb(query);
    await editTripMessage(bot, query);
};
