import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import { TIME_PICKER_MINUTES } from './tripDateConstants';
import { SET_TRIP_HOUR, SET_TRIP_MINUTES } from '../../common/constants/commonСonstants';
import { getCurrentTripDate } from '../../services/helpers';

// TODO: fix but when trip finish time, show all hours
export const timeComponent = async chat_id => {
    const { year, day, month } = await getCurrentTripDate(chat_id);
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentHour = new Date().getHours();
    const currentYear = new Date().getFullYear();

    // TODO: fix (month - 1) incorrect month sets to DB
    const hours = new Array(24).fill(null).reduce((result, item, calendarHour) => {
        const formattedCalendarHour = calendarHour + 1;
        const isNotValidHour = currentYear === parseInt(year)
            && currentMonth === (month - 1)
            && currentDay === day
            && currentHour >= formattedCalendarHour;

        if (isNotValidHour) return result;

        result.push({
            text: `${formattedCalendarHour}`,
            callback_data: createAction(SET_TRIP_HOUR, formattedCalendarHour)
        });

        return result;
    }, []);

    const minutes = TIME_PICKER_MINUTES.reduce((result, item) => {
        result.push({
            text: `${item} хв`,
            callback_data: createAction(SET_TRIP_MINUTES, item)
        });

        return result;
    }, []);

    return {
        reply_markup: {
            inline_keyboard: [
                ...chunk(hours, 8),
                minutes,
            ]
        }
    }
};

export default timeComponent;
