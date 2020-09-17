import { LANGUAGES } from '../../constants/botSettings';
import { getFormattedPhoneNumber } from '../../utils/utils';

const { uk, ru, en } = LANGUAGES;

export const TRIP_SUMMARY_MESSAGES = {
    [uk]: ({
               trip,
               startDate,
               finishDate,
               leftPadding,
               carrierInfo,
               carrierName,
               formattedCities,
               showCarrierFullInfo,
               availableSeatsCount,
           }) => {
        const cities = `${leftPadding}🚏 <b>Маршрут:</b> ${formattedCities}`;
        const time = `${leftPadding}🕐 <b>Час відправлення:</b> ${startDate}\n${leftPadding}🕞 <b>Час прибуття:</b>  ${finishDate}`;
        const price = `${leftPadding}💰 <b>Ціна:</b> ${trip.trip_price} грн`;
        const phoneNumber = `${leftPadding}☎️ <b>Контактний номер</b>  ${Object.values(carrierInfo.phone_numbers).map(number => getFormattedPhoneNumber(number))} `;
        const allSeatsMessage = `️${leftPadding}💺️ <b>Кількість місць:</b> ${trip.book.available_seats_count}`;
        const availablePlacesMessage = `️${leftPadding}💺️ <b>Кількість вільних місць</b> ${availableSeatsCount}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`;
    },
    [ru]: ({
               trip,
               startDate,
               finishDate,
               leftPadding,
               carrierInfo,
               carrierName,
               formattedCities,
               showCarrierFullInfo,
               availableSeatsCount,
               allSeats,
           }) => {
        const cities = `${leftPadding}🚏 <b>Маршрут:</b> ${formattedCities}`;
        const time = `${leftPadding}🕐 <b>Время отправления:</b> ${startDate}\n${leftPadding}🕞 <b>Время прибытия:</b>  ${finishDate}`;
        const price = `${leftPadding}💰 <b>Цена:</b> ${trip.trip_price} грн`;
        const phoneNumber = `${leftPadding}☎️ <b>Контактный номер:</b>  ${Object.values(carrierInfo.phone_numbers).map(number => getFormattedPhoneNumber(number))} `;
        const allSeatsMessage = `️${leftPadding}💺️ <b>Количество мест:</b> ${allSeats}`;
        const availablePlacesMessage = `️${leftPadding}💺️ <b>Количество свободных мест:</b> ${availableSeatsCount}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`;
    },
    [en]: ({
               trip,
               startDate,
               finishDate,
               leftPadding,
               carrierInfo,
               carrierName,
               formattedCities,
               showCarrierFullInfo,
               availableSeatsCount,
               allSeats,
           }) => {
        const cities = `${leftPadding}🚏 <b>Route:</b> ${formattedCities}`;
        const time = `${leftPadding}🕐 <b>Departure time:</b> ${startDate}\n${leftPadding}🕞 <b>Arrival time:</b>  ${finishDate}`;
        const price = `${leftPadding}💰 <b>Price:</b> ${trip.trip_price} UAH`;
        const phoneNumber = `${leftPadding}☎️ <b>Phone number:</b>  ${Object.values(carrierInfo.phone_numbers).map(number => getFormattedPhoneNumber(number))} `;
        const allSeatsMessage = `️${leftPadding}💺️ <b>Number of seats:</b> ${allSeats}`;
        const availablePlacesMessage = `️${leftPadding}💺️ <b>Number of available seats</b> ${availableSeatsCount}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${allSeatsMessage}\n${availablePlacesMessage}`;
    },
};
