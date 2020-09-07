import {isNil, find, isEmpty, head} from 'lodash';
import { saveNewFindTripDateToDb, getCustomDateForFindTrips } from '../findTripsUtils';
import { getDoc, getFieldFromDoc } from '../../../services/helpers';
import { API_CONSTANTS } from '../../../common/constants';
import { findTripsDaysAndCalendarKeyboard } from '../../keyboards/keyboards';
import { getFormattedDayMonth, getTripHtmlSummary, parseData, sendMessage } from '../../../common/utils/utils';

const delimiter = '〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️';

const getTripsListHtml = trips => {
    let caption;
    const list = `${trips.map(trip => {
        const { start_date_month, start_date_day, start_date_year } = trip.start_date;

        caption = `🔸🔸🔸 <b>${getFormattedDayMonth(start_date_month, start_date_day)} ${start_date_year}</b> 🔹🔹🔹`;
        const tripHtml = getTripHtmlSummary({ trip, showCarrierFullInfo: true, carrierInfo: trip });
        
        return `\n${tripHtml}\n\n${delimiter}\n`
    })}`;

    return `${caption}\n${list}`
};

export const getShouldAddTrip = (trip, date, stopCityPlaceId, customDate) => {
    const stopFoundCity = find(Object.values(trip.cities), {place_id: stopCityPlaceId});

    if (!isNil(customDate)) {
        return stopFoundCity && stopFoundCity.order > trip.current_city_order
            && customDate.day === trip.start_date.start_date_day
            && customDate.month === trip.start_date.start_date_month
            && customDate.year === +trip.start_date.start_date_year;
    }

    return stopFoundCity && stopFoundCity.order > trip.current_city_order
        && +trip.start_date.start_date_year === +date.year
        && trip.start_date.start_date_month === +date.month
        && trip.start_date.start_date_day === +date.day;
};

// TODO: need to add time check
export const findTrips = async (chat_id, customDay) => {
    const finalCustomDate = getCustomDateForFindTrips(customDay);
    const foundTrip = await getFieldFromDoc(chat_id,'find_trip');

    if (isNil(foundTrip)) return [];

    const  { cities, date } = foundTrip;

    const { place_id: startCityPlaceId } = find(cities, { order: 1 });
    const { place_id: stopCityPlaceId } = find(cities, { order: 2 });
    const found_trips_links = await getDoc(startCityPlaceId, API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS, {});

    const finalTripsLinks = [];
    Object.values(found_trips_links).forEach(trips_link => {
        Object.values(trips_link).forEach(trip => {
            const shouldAddTrip = getShouldAddTrip(trip, date, stopCityPlaceId, finalCustomDate);
            if (shouldAddTrip) finalTripsLinks.push(trip)
        });
    });

    // create real final trips
    const tripsReqs = finalTripsLinks.map(async ({ trip_id }) => await getDoc(trip_id, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME));
    return await Promise.all(tripsReqs);
};

export const showTripsList = (bot, chat_id, trips) => {
    let html = `\n\n\n 😭 нажаль ми не знайшли поїздок\n🤔 спробуйте іншу дату\n\n${delimiter}`;

    if (isEmpty(trips)) {
        return sendMessage(bot, chat_id, html, { parse_mode: 'HTML', ...findTripsDaysAndCalendarKeyboard });
    }

    html = getTripsListHtml(trips);
    sendMessage(bot, chat_id, html, { parse_mode: 'HTML', ...findTripsDaysAndCalendarKeyboard });
};

export const showFoundTrips = async (bot, id, customDay) => {
    const trips = await findTrips(id, customDay);
    showTripsList(bot, id, trips);
};

export const handlesSaveNewFindTripDateToDb = async (chat_id, customDay) => {
    const selectedDate = getCustomDateForFindTrips(customDay);
    await saveNewFindTripDateToDb(chat_id, selectedDate);
};

export const handlesSaveNewFindTripDateToDbFromCalendar = async (query) => {
    const { id: chat_id } = query.message.chat;
    const { payload } = parseData(query.data);
    await saveNewFindTripDateToDb(chat_id, payload);
};
