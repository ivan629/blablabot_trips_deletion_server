import { getFieldFromDoc, updateFieldInUserDoc } from '../../services/helpers';

export const getCustomDateForFindTrips = customDayMessage => {
    const date = new Date();
    const currentDay = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    switch (customDayMessage) {
        case 0: {
            return {
                day: currentDay,
                month: currentMonth,
                year: currentYear
            }
        }
        case 1: {
            return {
                day: currentDay + 1,
                month: currentMonth,
                year: currentYear
            }
        }
        case 2: {
            return {
                day: currentDay + 2,
                month: currentMonth,
                year: currentYear
            }
        }
        default: {
            return null;
        }
    }
};

const setFindDatePickerDataToDb = async (chat_id, field, data) => {
    await updateFieldInUserDoc(chat_id, `find_trip.date.${field}`, data);
};

export const saveNewFindTripDateToDb = async (chat_id, { day, month, year }) => {
    const alReqs = [
        await setFindDatePickerDataToDb(chat_id, 'day', day),
        await setFindDatePickerDataToDb(chat_id, 'month', month),
        await setFindDatePickerDataToDb(chat_id, 'year', year),
    ];
    await Promise.all(alReqs);
};


export const getFindTripCities = async chat_id => {
    return await getFieldFromDoc(chat_id,'find_trip.cities',  {});
};

export const addCityToFindTripInDB = async (id, city) => {
    updateFieldInUserDoc(id, `find_trip.cities.${city.place_id}`, city)
};

export const clearFindTrip = async (id, city) => await updateFieldInUserDoc(id, 'find_trip', {});
