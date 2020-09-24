import {
    setTripHour,
    setTripMinutes,
    showTimeComponent,
    showBlockedGoToTripEnd,
    sendBlockedGoToAvailableMessage,
    showBlockedGoToTimePickerMessage,
} from './tripCreationCalendarUtils';
import { keysActions } from '../../../common/messages';
import { parseData } from '../../../common/utils/utils';
import { listenerCase } from '../../../common/utils/listenersUtils';

const {
    SET_TRIP_HOUR,
    SET_TRIP_MINUTES,
    GO_TO_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY,
} = keysActions;

const tripDateListeners = (bot) => {
    bot.on('callback_query', (query) => {
        const data = parseData(query.data);

        switch (data.type) {
            case SET_TRIP_HOUR:
                {
                    setTripHour(query, bot);
                }
                break;
            case SET_TRIP_MINUTES:
                {
                    setTripMinutes(query, bot);
                }
                break;
            default: {
                break;
            }
        }
    });

    bot.on('message', (msg) => {
        const { text } = msg;
        if (listenerCase(BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY, text)) {
            return showBlockedGoToTimePickerMessage(bot, msg);
        }

        if (
            listenerCase(BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY, text)
        ) {
            return showBlockedGoToTripEnd(bot, msg);
        }

        if (
            listenerCase(
                BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY,
                text
            )
        ) {
            return sendBlockedGoToAvailableMessage(bot, msg);
        }

        if (listenerCase(GO_TO_TIME_PICKER_MESSAGE_KEY, text)) {
            return showTimeComponent(bot, msg);
        }
    });
};

export default tripDateListeners;
