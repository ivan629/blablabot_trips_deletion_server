import {
    setTripHour,
    setTripMinutes,
    showTimeComponent,
    showBlockedGoToTripEnd,
    sendBlockedGoToAvailableMessage,
    showBlockedGoToTimePickerMessage
} from './tripCreationCalendarUtils';
import { parseData } from '../../../common/utils/utils';
import { tripCreationMessages, keysActions } from '../../../common/messages/tripCreationMessages';

const {
    SET_TRIP_HOUR,
    SET_TRIP_MINUTES,
    GO_TO_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY,
} = keysActions;

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
            case tripCreationMessages(GO_TO_TIME_PICKER_MESSAGE_KEY): {
                showTimeComponent(bot, msg);
            }
                break;
            case tripCreationMessages(BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY): {
                showBlockedGoToTimePickerMessage(bot, msg);
            }
                break;
            case tripCreationMessages(BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY): {
                showBlockedGoToTripEnd(bot, msg);
            }
                break;
            case tripCreationMessages(BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY): {
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
