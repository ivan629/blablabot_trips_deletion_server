import { chunk } from 'lodash';
import { createAction } from '../../../common/utils/utils';
import { TIME_PICKER_MINUTES } from './tripDateConstants';
import { keysActions } from '../../../common/messages';
import { getCurrentTripCreationDate, getIsStartDateCreatingCompleted, getCreatingTrip } from '../../../services/helpers';

const { SET_TRIP_HOUR, SET_TRIP_MINUTES } = keysActions;

// TODO: fix bug when trip finish time, show all hours
export const timeComponent = async chat_id => {
    const { year, day, month } = await getCurrentTripCreationDate(chat_id);
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const currentHour = new Date().getHours();
    const currentYear = new Date().getFullYear();

    const isStartDateCreatingCompleted = await getIsStartDateCreatingCompleted(chat_id);
    const {
        start_date: {
            start_date_hour,
            start_date_year,
            start_date_month,
            start_date_day,
        },
        stop_date: {
            stop_date_day,
            stop_date_month,
            stop_date_year,
        },
    } = await getCreatingTrip(chat_id);

    const hours = new Array(24).fill(null).reduce((result, item, calendarHour) => {
        const formattedCalendarHour = calendarHour + 1;
        let isNotValidHour = false;


        if (isStartDateCreatingCompleted) {
            isNotValidHour = stop_date_day === start_date_day
            && stop_date_month === start_date_month
            && stop_date_year === start_date_year
            && calendarHour < start_date_hour;
        } else {
            isNotValidHour = currentYear === parseInt(year)
            && currentMonth === month
            && currentDay === day
            && formattedCalendarHour < currentHour + 1;
        }

        if (isNotValidHour) return result;

        const text =  formattedCalendarHour > 12 ? `${formattedCalendarHour} pm` : `${formattedCalendarHour} am`;

        result.push({
            text,
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
                ...chunk(hours, 6),
                minutes,
            ]
        }
    }
};

export default timeComponent;
