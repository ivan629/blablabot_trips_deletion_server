import { initialKeyboard } from '../modules/keyboards/keyboards';
import CalendarModule from '../modules/tripDateModule/tripDateModule';
import TripCitiesModule from '../modules/tripCitiesModule/tripCitiesModule';
import TripPriceModule from '../modules/tripPriceModule/tripPriceModule';
import TripCreationSummariseModule from '../modules/tripCreationSummariseModule/tripCreationSummariseModule';
import AvailableSeatsModule from '../modules/availableSeatsModule/availableSeatsModule';
import {
    resetSessionDataInDb,
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    toggleIsTripCitiesCreating,
} from '../services/helpers';
import { addNewTrip, addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import {
    PROPOSE_TRIP,
    GO_TO_THE_MAIN_MENU,
    FINAL_CITY_IN_THE_TRIP,
    GO_TO_TRIP_PRICE_SETTINGS,
    GO_TO_TRIP_END_TIME_PICKER,
    GO_TO_AVAILABLE_SEATS_SETTING,
    CONFIRM_TRIP_PRICE,
} from '../common/constants/commonСonstants';

const calendarModule = new CalendarModule();
const tripPriceModule = new TripPriceModule();
const tripCitiesModule = new TripCitiesModule();
const availableSeatsModule = new AvailableSeatsModule();
const tripCreationSummariseModule = new TripCreationSummariseModule();

const telegramBotControllers = bot => {
    bot.onText(/\/start/, async query => {
        const { chat: { id } } = query;

        goToTheMainMenu(bot, id);
        resetSessionDataInDb(id);
        addNewUserToDb(query);
    });

    calendarModule.setListeners(bot);
    tripPriceModule.setListeners(bot);
    tripCitiesModule.setListeners(bot);
    availableSeatsModule.setListeners(bot);
    tripCreationSummariseModule.setListeners(bot);

    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        addSessionMessagesIdsToDb(id, message_id);
        // bot.deleteMessage(id, message_id);

        switch (msg.text) {
            case PROPOSE_TRIP: {
                await removeSessionMessagesIds(bot, id);
                await addNewTrip(msg);
                await tripCitiesModule.start(bot, msg);
            }
                break;
            case GO_TO_THE_MAIN_MENU: {
                await removeSessionMessagesIds(bot, id);
                await resetSessionDataInDb(id);
               setTimeout( () => goToTheMainMenu(bot, id), 1000);
            }
                break;
            case FINAL_CITY_IN_THE_TRIP: {
                await removeSessionMessagesIds(bot, id);
                calendarModule.runStartTripDatePicker(bot, msg);
                await toggleIsTripCitiesCreating(id, false);
            }
                break;
            case GO_TO_TRIP_END_TIME_PICKER: {
                calendarModule.runStopTripDatePicker(bot, msg);
            }
                break;
            case GO_TO_AVAILABLE_SEATS_SETTING: {
                console.log('AVAILABLE_SEATS_MESSAGE');
                await removeSessionMessagesIds(bot, id);
                availableSeatsModule.runAvailableTripSeatsPicker(bot, msg);
            }
            break;
            case GO_TO_TRIP_PRICE_SETTINGS: {
                await removeSessionMessagesIds(bot, id);
                tripPriceModule.runTripPriceModule(bot, msg);
            }
            break;
            case CONFIRM_TRIP_PRICE: {
                await removeSessionMessagesIds(bot, id);
                tripCreationSummariseModule.runTripCreationSummariseModule(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default telegramBotControllers;
