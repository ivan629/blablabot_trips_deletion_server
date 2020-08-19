import {
    MONTH_UP,
    MONTH_DOWN,
    DATE_CHANGED,
    SET_TRIP_HOUR,
    SET_TRIP_MINUTES,
    CONFIRM_TRIP_DATE,
    GO_TO_TIME_PICKER,
} from '../../common/constants/commonСonstants';
import {
    setTripHour,
    setTripMinutes,
    confirmTripDate,
    userChangedDate,
    showTimeComponent,
    changeCalendarMonth,
} from './calendarControllers';

const tripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = JSON.parse(query.data);

        switch (data.type) {
            case MONTH_DOWN: {
                changeCalendarMonth(query, bot);
            }
                break;
            case MONTH_UP: {
                changeCalendarMonth(query, bot, true)
            }
                break;
            case DATE_CHANGED: {
                userChangedDate(query, bot);
            }
                break;
            case SET_TRIP_HOUR: {
                setTripHour(query, bot);
            }
                break;
            case SET_TRIP_MINUTES: {
                setTripMinutes(query, bot);
            }
                break;
            case CONFIRM_TRIP_DATE: {
                confirmTripDate(query, bot);
            }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', msg => {
        switch (msg.text) {
            case CONFIRM_TRIP_DATE: {
                confirmTripDate(msg, bot);
            }
                break;
            case GO_TO_TIME_PICKER: {
                showTimeComponent(msg, bot);
            }
                break;
            default: {
                break;
            }
        }
    })
};

export default tripDateListeners;
