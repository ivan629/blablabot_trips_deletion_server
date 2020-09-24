import {
    showFoundTrips,
    handlesSaveNewFindTripDateToDb,
} from './foundTripsUtils';
import { goToMenuKeyboard } from '../../keyboards/keyboards';
import { handleBookTrip, handleUnBookTrip } from './bookTipUtils';
import { listenerCase } from '../../../common/utils/listenersUtils';
import { parseData, sendMessage } from '../../../common/utils/utils';
import {
    BOOK_TRIP_ACTION,
    UNBOOK_TRIP_ACTION,
} from '../../../common/messages/myTrips/myTripsKeysActions';
import { getLocalizedMessage, keysActions } from '../../../common/messages';

const foundTripsListeners = (bot) => {
    bot.on('message', async (msg) => {
        if (
            listenerCase(
                keysActions.FIND_TRIP_SEARCH_TRIPS_MESSAGES_KEY,
                msg.text
            )
        ) {
            await showFoundTrips(bot, msg, msg.chat.id);
            return sendMessage(
                bot,
                msg.chat.id,
                getLocalizedMessage(
                    keysActions.FIND_TRIP_QUICK_DATE_PICKER_MESSAGES_KEY,
                    msg
                ),
                goToMenuKeyboard(msg)
            );
        }
    });

    bot.on('callback_query', async (query) => {
        const {
            message: {
                chat: { id },
            },
            data,
        } = query;
        const { type, payload } = parseData(data);

        switch (type) {
            case keysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY:
                {
                    await handlesSaveNewFindTripDateToDb(id, payload);
                    await showFoundTrips(bot, query, id, payload);
                }
                break;
            case BOOK_TRIP_ACTION:
                {
                    await handleBookTrip(bot, query);
                }
                break;
            case UNBOOK_TRIP_ACTION:
                {
                    await handleUnBookTrip(bot, query);
                }
                break;
            default: {
                break;
            }
        }
    });
};

export default foundTripsListeners;
