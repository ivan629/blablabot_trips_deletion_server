import { isNil, find, isEmpty } from 'lodash';
import {
    saveNewFindTripDateToDb,
    getCustomDateForFindTrips,
} from '../findTripsUtils';
import { getDoc, getTrip, getFieldFromDoc } from '../../../services/helpers';
import { API_CONSTANTS } from '../../../common/constants';
import {
    findTripsDaysAndCalendarKeyboard,
    myTripsTripActionKeyboard,
} from '../../keyboards/keyboards';
import {
    getTripHtmlSummary,
    parseData,
    sendMessage,
} from '../../../common/utils/utils';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

const delimiter = '〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️';

const getTripsListHtml = (trips, eventObject) => {
    return trips.map((trip) => {
        const tripHtml = getTripHtmlSummary({
            trip,
            showCarrierFullInfo: true,
            carrierInfo: trip,
            eventObject,
        });

        return {
            html: `${tripHtml}`,
            trip_id: trip.trip_id,
        };
    });
};

export const getShouldAddTrip = (trip, date, stopCityPlaceId, customDate) => {
    const stopFoundCity = find(Object.values(trip.cities), {
        place_id: stopCityPlaceId,
    });

    if (!isNil(customDate)) {
        return (
            stopFoundCity &&
            stopFoundCity.order > trip.current_city_order &&
            customDate.day === trip.start_date.start_date_day &&
            customDate.month === trip.start_date.start_date_month &&
            customDate.year === +trip.start_date.start_date_year
        );
    }

    return (
        stopFoundCity &&
        stopFoundCity.order > trip.current_city_order &&
        +trip.start_date.start_date_year === +date.year &&
        trip.start_date.start_date_month === +date.month &&
        trip.start_date.start_date_day === +date.day
    );
};

// TODO: need to add time check
export const findTrips = async (chat_id, customDay) => {
    const finalCustomDate = getCustomDateForFindTrips(customDay);
    const foundTrip = await getFieldFromDoc(chat_id, 'find_trip');

    if (isNil(foundTrip)) return [];

    const { cities, date } = foundTrip;

    const { place_id: startCityPlaceId } = find(cities, { order: 1 });
    const { place_id: stopCityPlaceId } = find(cities, { order: 2 });
    const found_trips_links = await getDoc(
        startCityPlaceId,
        API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS,
        {}
    );

    const finalTripsLinks = [];
    Object.values(found_trips_links).forEach((trips_link) => {
        Object.values(trips_link).forEach((trip) => {
            const shouldAddTrip = getShouldAddTrip(
                trip,
                date,
                stopCityPlaceId,
                finalCustomDate
            );
            if (shouldAddTrip) finalTripsLinks.push(trip);
        });
    });

    // create real final trips
    const tripsReqs = finalTripsLinks.map(
        async ({ trip_id }) => await getTrip(trip_id)
    );
    return await Promise.all(tripsReqs);
};

export const showTripsList = async (bot, query, chat_id, trips) => {
    const alreadyBookedTripsIds = await getFieldFromDoc(
        chat_id,
        'booked_trips_ids',
        []
    );
    const tripsList = getTripsListHtml(trips, query);

    if (isEmpty(trips))
        return sendMessage(
            bot,
            chat_id,
            getLocalizedMessage(
                keysActions.NOT_FOUND_TRIPS_MESSAGES_KEY,
                query
            ),
            { parse_mode: 'HTML', ...findTripsDaysAndCalendarKeyboard(query) }
        );

    tripsList.forEach(({ html, trip_id }) =>
        sendMessage(bot, chat_id, html, {
            parse_mode: 'HTML',
            ...myTripsTripActionKeyboard({
                trip_id,
                alreadyBookedTripsIds,
                query,
                includeReplyMarkup: true,
            }),
        })
    );

    sendMessage(bot, chat_id, delimiter, {
        parse_mode: 'HTML',
        ...findTripsDaysAndCalendarKeyboard(query),
    });
};

export const showFoundTrips = async (bot, query, id, customDay) => {
    const trips = await findTrips(id, customDay);
    await showTripsList(bot, query, id, trips);
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
