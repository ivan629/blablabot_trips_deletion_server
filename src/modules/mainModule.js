import tripCreationModule from '../modules/tripCreationModule/tripCreationModule';
import myTripsModule from '../modules/myTripsModule/myTripsModule';
import {
    resetSessionDataInDb,
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    clearSessionMessagesIdsInDb,
} from '../services/helpers';
import { addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import {
    GO_TO_THE_MAIN_MENU,
    FINISH_TRIP_CREATION,
} from '../common/constants/commonСonstants';

const mainModule = bot => {
    tripCreationModule(bot);
    myTripsModule(bot);

    bot.onText(/\/start/, async query => {
        const { chat: { id } } = query;
        await clearSessionMessagesIdsInDb(id);

        goToTheMainMenu(bot, id);
        resetSessionDataInDb(id);
        addNewUserToDb(query);
    });

    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        addSessionMessagesIdsToDb(id, message_id);

        switch (msg.text) {
            case FINISH_TRIP_CREATION:
            case GO_TO_THE_MAIN_MENU: {
                await removeSessionMessagesIds(bot, id);
                await clearSessionMessagesIdsInDb(id);
                await resetSessionDataInDb(id);
                await goToTheMainMenu(bot, id);
            }
            default: {
                break;
            }
        }
    });
};

export default mainModule;
