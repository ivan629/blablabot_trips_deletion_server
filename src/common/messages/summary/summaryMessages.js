import { LANGUAGES } from '../../constants/botSettings';

const { ua, ru, en } = LANGUAGES;

export const TRIP_SUMMARY_MESSAGES = {
    [ua]: ({
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
        const phoneNumber = `${leftPadding}☎️ <b>Контактний номер</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
        const availablePlaces = `️${leftPadding}💺️ <b>Кількість вільних місць:</b> ${availableSeatsCount}/${trip.book.available_seats_count}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`;
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
           }) => {
        const cities = `${leftPadding}🚏 <b>Маршрут:</b> ${formattedCities}`;
        const time = `${leftPadding}🕐 <b>Время отправления:</b> ${startDate}\n${leftPadding}🕞 <b>Время прибытия:</b>  ${finishDate}`;
        const price = `${leftPadding}💰 <b>Цена:</b> ${trip.trip_price} грн`;
        const phoneNumber = `${leftPadding}☎️ <b>Контактный номер:</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
        const availablePlaces = `️${leftPadding}💺️ <b>Количество свободных мест:</b> ${availableSeatsCount}/${trip.book.available_seats_count}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`;
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
           }) => {
        console.log(carrierInfo);
        const cities = `${leftPadding}🚏 <b>Route:</b> ${formattedCities}`;
        const time = `${leftPadding}🕐 <b>Departure time:</b> ${startDate}\n${leftPadding}🕞 <b>Arrival time:</b>  ${finishDate}`;
        const price = `${leftPadding}💰 <b>Price:</b> ${trip.trip_price} UAH`;
        const phoneNumber = `${leftPadding}☎️ <b>Phone number:</b>  ${Object.values(carrierInfo.phone_numbers).map(number => `+${number}`)} `;
        const availablePlaces = `️${leftPadding}💺️ <b>Number of available seats:</b> ${availableSeatsCount}/${trip.book.available_seats_count}`;

        return showCarrierFullInfo
            ? `${carrierName}\n${phoneNumber}\n${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`
            : `${cities.replace(',',' ')}\n${time}\n${price}\n${availablePlaces}`;
    },
};
