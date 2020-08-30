import { size, head, last } from 'lodash';
import { getNotCompletedTrip, getCarrierInfo } from '../../services/helpers';
import { getFormattedData } from '../../common/utils/utils';

export const getTripSummary = async (chat_id) => {
    const trip = await getNotCompletedTrip(chat_id);
    const carrierInfo = await getCarrierInfo(chat_id);
    const formattedCities = Object.values(trip.cities);

    const {
        start_date_day,
        start_date_hour,
        start_date_month,
        start_date_minutes,
    } = trip.start_date;
    const {
         stop_date_day,
         stop_date_hour,
         stop_date_month,
         stop_date_minutes,
    } = trip.stop_date;

    const startDate = getFormattedData({
        day: start_date_day,
        hour: start_date_hour,
        month: start_date_month,
        minutes: start_date_minutes,
    });

    const finishDate = getFormattedData({
        day: stop_date_day,
        hour: stop_date_hour,
        month: stop_date_month,
        minutes: stop_date_minutes,
    });

    const cities = `<b>Маршрут:</b> ${head(formattedCities)?.name} <i>${formattedCities.slice(1, -1).map(({ name }) => `- ${name}`)}</i> - ${last(formattedCities)?.name} 🌇`;
    const time = `<b>Час відправлення:</b> ${startDate}\n<b>Час прибуття:</b>  ${finishDate}`;
    const price = `<b>Ціна:</b> ${trip.trip_price} грн 🤑`;
    const phoneNumber = `<b>Контактний номер</b>  +${carrierInfo.phone_number} 💺`;
    const availablePlaces = `<b>Кількість вільних місць:</b> ${trip.available_seats_count} ☎️`;

    return `${cities}\n${time}\n${price}\n${availablePlaces}\n${phoneNumber}`;
};
