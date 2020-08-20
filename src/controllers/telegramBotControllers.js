import { initialKeyboard } from '../modules/keyboards/keyboards';
import CalendarModule from '../modules/tripDateModule/tripDateModule';
import TripCitiesModule from '../modules/tripCitiesModule/tripCitiesModule';
import AvailableSeatsModule from '../modules/availableSeatsModule/availableSeatsModule';
import {resetSessionDataInDb, toggleIsTripCitiesCreating} from '../services/helpers';
import { addNewTrip, addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import {
    PROPOSE_TRIP,
    GO_TO_THE_MAIN_MENU,
    FINAL_CITY_IN_THE_TRIP,
    GO_TO_TRIP_END_TIME_PICKER,
    GO_TO_AVAILABLE_SEATS_SETTING,
} from '../common/constants/commonСonstants';

const calendarModule = new CalendarModule();
const tripCitiesModule = new TripCitiesModule();
const availableSeatsModule = new AvailableSeatsModule();

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

        switch (msg.text) {
            case PROPOSE_TRIP: {
                await addNewTrip(msg);
                await tripCitiesModule.start(bot, msg);
            }
                break;
            case GO_TO_THE_MAIN_MENU: {
                goToTheMainMenu(bot, id);
            }
                break;
            case FINAL_CITY_IN_THE_TRIP: {
                calendarModule.runStartTripDatePicker(bot, msg);
                await toggleIsTripCitiesCreating(id, false);
            }
                break;
            case GO_TO_TRIP_END_TIME_PICKER: {
                calendarModule.runStopTripDatePicker(bot, msg);
            }
                break;
            case GO_TO_AVAILABLE_SEATS_SETTING: {
                availableSeatsModule.start(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default telegramBotControllers;
