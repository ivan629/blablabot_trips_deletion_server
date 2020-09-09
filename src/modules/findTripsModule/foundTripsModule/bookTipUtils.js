import {
    parseData,
    sendMessage,
    getTripHtmlSummary,
    getFormattedCities,
    getFormattedPhoneNumber,
} from '../../../common/utils/utils';
import {
    getFieldFromDoc,
    getTrip,
    removeFieldInCollection,
    updateAvailableSeatsInTip,
    updateFieldInUserDoc
} from '../../../services/helpers';
import { myTripsTripActionKeyboard } from '../../keyboards/keyboards';
import { API_CONSTANTS } from '../../../common/constants';

export const bookTripInDb = async (query, trip) => {
    const { id: chat_id } = query.message.chat;
    let { book: { booked_seats_count, available_seats_count }, trip_id } = trip;

    const newBookedSeatsCount = booked_seats_count === available_seats_count ? available_seats_count : booked_seats_count + 1;
    await updateFieldInUserDoc(chat_id, `booked_trips_ids.${trip_id}`, trip_id);
    await updateAvailableSeatsInTip(trip_id, available_seats_count, newBookedSeatsCount, chat_id);
};

export const unBookTripInDb = async (query, trip) => {
    const { id: chat_id } = query.message.chat;
    let { book: { booked_seats_count, available_seats_count }, trip_id } = trip;

    const newBookedSeatsCount = booked_seats_count === 0 ? 0 : booked_seats_count - 1;
    await removeFieldInCollection(chat_id, `booked_trips_ids.${trip_id}`, API_CONSTANTS.DB_USERS_COLLECTION_NAME);
    await updateAvailableSeatsInTip(trip_id, available_seats_count, newBookedSeatsCount, chat_id, true);
};

export const editTripMessage = async (bot, query, isAfterBooked) => {
    const { id: chat_id } = query.message.chat;
    const { payload: trip_id } = parseData(query.data);
    const trip = await getTrip(trip_id);
    const tripHtml = await getTripHtmlSummary({trip, showCarrierFullInfo: true, carrierInfo: trip});
    const alreadyBookedTripsIds = isAfterBooked ? [trip_id] : [];
    const keyBoard = myTripsTripActionKeyboard(trip_id, alreadyBookedTripsIds);

    const editMessageConfig = {
        chat_id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify(keyBoard),
    };

    bot.editMessageText(tripHtml, editMessageConfig);
}

const sendNotificationToUser = async (bot, trip, query, isBooked) => {
    const { chat } = query.message;
    const phoneNumbers = await getFieldFromDoc(chat.id, 'carrier.phone_numbers');
    const formattedPhoneNumbers = Object.values(phoneNumbers).map(phoneNumber => getFormattedPhoneNumber(phoneNumber));
    const message = isBooked
        ? `👤 <b>${chat.first_name} ${chat.last_name}</b> забронював вашу поїздку. Маршрут: <b>${getFormattedCities(trip)}</b>`
        : `❌ <b>${chat.first_name} ${chat.last_name}</b> скасував бронювання. Маршрут: <b>${getFormattedCities(trip)}</b>`
    const phones = `☎️ <b>Контактний номер:</b> ${formattedPhoneNumbers}`
    const finalMessage = `${message}\n ${phones}`;

    sendMessage(bot, trip.chat_id, finalMessage, { parse_mode: 'HTML' });
}

export const handleBookTrip = async (bot, query) => {
    const { payload: trip_id } = parseData(query.data);
    const trip = await getTrip(trip_id);

    await sendNotificationToUser(bot, trip, query, true)
    await bookTripInDb(query, trip);
    await editTripMessage(bot, query, true);
};

export const handleUnBookTrip = async (bot, query) => {
    const { payload: trip_id } = parseData(query.data);
    const trip = await getTrip(trip_id);

    await sendNotificationToUser(bot, trip, query)
    await unBookTripInDb(query, trip);
    await editTripMessage(bot, query);
};
