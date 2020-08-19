import { initialKeyboard } from '../modules/keyboards/keyboards';
import CalendarModule from '../modules/tripDateModule/tripDateModule';
import TripCitiesModule from '../modules/tripCitiesModule/tripCitiesModule';
import {resetSessionDataInDb, setKeyboardMessageToDb, toggleIsTripCitiesCreating} from '../services/helpers';
import { addNewTrip, addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import { GO_TO_THE_MAIN_MENU, FINAL_CITY_IN_THE_TRIP, PROPOSE_TRIP } from '../common/constants/commonСonstants';

const calendarModule = new CalendarModule();
const tripCitiesModule = new TripCitiesModule();

const telegramBotControllers = bot => {
    bot.onText(/\/start/, async query => {
        const { chat: { id } } = query;

        goToTheMainMenu(bot, id);
        resetSessionDataInDb(id);
        addNewUserToDb(query);
    });

    calendarModule.setListeners(bot);
    tripCitiesModule.setListeners(bot);

    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        bot.deleteMessage(id, message_id);

        if (msg.text === PROPOSE_TRIP) {
            await addNewTrip(msg);
            await tripCitiesModule.start(bot, msg);
        }

        if (msg.text === GO_TO_THE_MAIN_MENU) {
            goToTheMainMenu(bot, id);
        }

        if (msg.text === FINAL_CITY_IN_THE_TRIP) {
            calendarModule.start(bot, msg);
            await toggleIsTripCitiesCreating(id, false);
        }
    });
};

export default telegramBotControllers;
