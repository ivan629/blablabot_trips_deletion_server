import appRouters from '../routers';
import { clearFindTrip } from './findTripsModule/findTripsUtils';
import myTripsModule from '../modules/myTripsModule/myTripsModule';
import findTripModule from '../modules/findTripsModule/findTripModule';
import tripCreationModule from '../modules/tripCreationModule/tripCreationModule';
import calendarComponentListeners from '../common/components/calendarComponent/calendarComponentListeners';

import {
    resetSessionDataInDb,
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    clearSessionMessagesIdsInDb,
} from '../services/helpers';
import { addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import { listenerCase } from '../common/utils/listenersUtils';
import { keysActions } from '../common/messages';

const mainModule = (expressApp, bot) => {
    tripCreationModule(bot);
    myTripsModule(bot);
    findTripModule(bot);

    // set shared calendar listeners
    calendarComponentListeners(bot);

    // routers
    appRouters(expressApp, bot);

    bot.onText(/\/start/, async (query) => {
        const {
            chat: { id },
        } = query;
        await addNewUserToDb(query);
        await clearSessionMessagesIdsInDb(id);
        await goToTheMainMenu(bot, id, query);
        await resetSessionDataInDb(id);
    });

    bot.on('message', async (msg) => {
        const {
            chat: { id },
            message_id,
        } = msg;
        await addSessionMessagesIdsToDb(id, message_id);

        if (
            listenerCase(
                keysActions.FINISH_TRIP_CREATION_MESSAGES_KEY,
                msg.text
            ) ||
            listenerCase(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, msg.text)
        ) {
            await removeSessionMessagesIds(bot, id);
            await resetSessionDataInDb(id);
            await clearFindTrip(id);
            await goToTheMainMenu(bot, id, msg);

            // TODO: find out how to delete all messages always defect
            await clearSessionMessagesIdsInDb(id);
        }
    });
};

export default mainModule;
