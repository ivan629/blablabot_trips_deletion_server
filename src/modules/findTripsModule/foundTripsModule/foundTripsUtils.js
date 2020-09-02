import { isNil, size, find } from 'lodash';
import { API_CONSTANTS } from '../../../common/constants';
import { getTripHtmlSummary, sendMessage } from '../../../common/utils/utils';
import { getDoc, getFieldFromDoc } from '../../../services/helpers';

const delimiter = '〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️';

const getTripsListHtml = trips => {
    const caption = '🔸🔸🔸 <b>Знайдені поїздки</b> 🔹🔹🔹';
    const list = `${trips.map(trip => {
        const tripHtml = getTripHtmlSummary({ trip, showCarrierFullInfo: true, carrierInfo: trip });
        
        return size(trips) > 1 ? `\n${tripHtml}\n\n${delimiter}\n` : `\n${tripHtml}\n`
    })}`;

    return `${caption}\n${list}`
};


// TODO: need to add time check
export const findTrips = async chat_id => {
    const foundTrip = await getFieldFromDoc(chat_id,'find_trip');

    if (isNil(foundTrip)) return [];

    const  { cities } = foundTrip;
    const { place_id: startCityPlaceId } = find(cities, { order: 1 });
    const { place_id: stopCityPlaceId } = find(cities, { order: 2 });
    const found_trips_links = await getDoc(startCityPlaceId, API_CONSTANTS.BLA_BLA_CAR_LINKER_TRIPS, {});


    // create finalTripsLinks
    const finalTripsLinks = [];
    Object.values(found_trips_links).forEach(trip => {
        const stopFoundCity = find(Object.values(trip.cities), { place_id: stopCityPlaceId });
        console.log(startCityPlaceId, stopCityPlaceId, trip.current_city_order);
        if (stopFoundCity && stopFoundCity.order > trip.current_city_order) finalTripsLinks.push(trip)
    });

    // create real final trips
    const tripsReqs = finalTripsLinks.map(async ({ trip_id }) => await getDoc(trip_id, API_CONSTANTS.DB_TRIPS_COLLECTION_NAME));
    const finalRealTrips = await Promise.all(tripsReqs);
    return finalRealTrips;
};

export const showTripsList = (bot, chat_id, trips) => {
    const html = getTripsListHtml(trips);
    sendMessage(bot, chat_id, html, { parse_mode: 'HTML' });
};

export const showFoundTrips = async (bot, msg) => {
    const { chat: { id: chat_id } } = msg;

    const trips = await findTrips(chat_id);
    showTripsList(bot, chat_id, trips);
};
