import appRouters from '../routers';
import tripCreationModule from '../modules/tripCreationModule/tripCreationModule';
import myTripsModule from '../modules/myTripsModule/myTripsModule';
import userPayModule from '../modules/userPayModule/userPayModule';
import findTripModule from '../modules/findTripsModule/findTripModule';
import { clearFindTrip } from './findTripsModule/findTripsUtils';
import calendarComponentListeners from '../common/components/calendarComponent/calendarComponentListeners';

import {
    resetSessionDataInDb,
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    clearSessionMessagesIdsInDb,
} from '../services/helpers';
import { addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import { keysActions, getLocalizedMessage } from '../common/messages';

const mainModule = (expressApp, bot) => {
    tripCreationModule(bot);
    myTripsModule(bot);
    findTripModule(bot);
    // userPayModule(bot);

    // set shared calendar listeners
    calendarComponentListeners(bot);

    // routers
    appRouters(expressApp, bot);

    bot.onText(/\/start/, async query => {
        const {chat: {id}} = query;
        await addNewUserToDb(query);
        await clearSessionMessagesIdsInDb(id);
        await goToTheMainMenu(bot, id, query);
        await resetSessionDataInDb(id);
    });

    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        await addSessionMessagesIdsToDb(id, message_id);

        switch (msg.text) {
            case getLocalizedMessage(keysActions.FINISH_TRIP_CREATION_MESSAGES_KEY, msg):
            case getLocalizedMessage(keysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY, msg): {
                await removeSessionMessagesIds(bot, id);
                await clearSessionMessagesIdsInDb(id);
                await resetSessionDataInDb(id);
                await clearFindTrip(id);
                await goToTheMainMenu(bot, id, msg);
            }
            default: {
                break;
            }
        }
    });
};

export default mainModule;
