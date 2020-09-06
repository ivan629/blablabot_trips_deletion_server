import {
    SET_TRIP_HOUR,
    SET_TRIP_MINUTES,
    CONFIRM_TRIP_DATE,
    GO_TO_TIME_PICKER,
    BLOCKED_GO_TO_TIME_PICKER,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS,
} from '../../../common/constants/commonСonstants';
import {
    setTripHour,
    setTripMinutes,
    confirmTripDate,
    showTimeComponent,
    showBlockedGoToTripEnd,
    sendBlockedGoToAvailableMessage,
    showBlockedGoToTimePickerMessage
} from './tripCreationCalendarUtils';
import { parseData } from '../../../common/utils/utils';

const tripDateListeners = (bot) => {
    bot.on('callback_query', query => {
        const data = parseData(query.data);

        switch (data.type) {
            case SET_TRIP_HOUR: {
                setTripHour(query, bot);
            }
                break;
            case SET_TRIP_MINUTES: {
                setTripMinutes(query, bot);
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
                confirmTripDate(bot, msg);
            }
                break;
            case GO_TO_TIME_PICKER: {
                showTimeComponent(bot, msg);
            }
                break;
            case BLOCKED_GO_TO_TIME_PICKER: {
                showBlockedGoToTimePickerMessage(bot, msg);
            }
                break;
            case BLOCKED_GO_TO_TRIP_END_TIME_PICKER: {
                showBlockedGoToTripEnd(bot, msg);
            }
                break;
            case BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS: {
                sendBlockedGoToAvailableMessage(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    })
};

export default tripDateListeners;
