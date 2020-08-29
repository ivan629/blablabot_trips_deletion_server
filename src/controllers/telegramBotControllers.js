import { isNil } from 'lodash';
import { initialKeyboard } from '../modules/keyboards/keyboards';
import CalendarModule from '../modules/tripDateModule/tripDateModule';
import TripCitiesModule from '../modules/tripCitiesModule/tripCitiesModule';
import TripPriceModule from '../modules/tripPriceModule/tripPriceModule';
import TripCreationSummariseModule from '../modules/tripCreationSummariseModule/tripCreationSummariseModule';
import AvailableSeatsModule from '../modules/availableSeatsModule/availableSeatsModule';
import PhoneNumberModule from '../modules/phoneNumberModule/phoneNumberModule';
import {
    resetSessionDataInDb,
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    clearSessionMessagesIdsInDb,
    toggleIsTripCitiesCreating,
} from '../services/helpers';
import { addNewTrip, addNewUserToDb, goToTheMainMenu } from '../common/utils/utils';
import {
    PROPOSE_TRIP,
    CONFIRM_TRIP_PRICE,
    GO_TO_THE_MAIN_MENU,
    FINAL_CITY_IN_THE_TRIP,
    GO_TO_TRIP_PRICE_SETTINGS,
    GO_TO_TRIP_END_TIME_PICKER,
    GO_TO_AVAILABLE_SEATS_SETTING,
    CHECK_TRIP_CREATION_DATA,
    FINISH_TRIP_CREATION,
    TRIP_CREATION_CREATION_COMPLETED_MESSAGE,
} from '../common/constants/commonСonstants';

const phoneNumberModule = new PhoneNumberModule();
const calendarModule = new CalendarModule();
const tripPriceModule = new TripPriceModule();
const tripCitiesModule = new TripCitiesModule();
const availableSeatsModule = new AvailableSeatsModule();
const tripCreationSummariseModule = new TripCreationSummariseModule();

const telegramBotControllers = bot => {
    bot.onText(/\/start/, async query => {
        const { chat: { id } } = query;
        await clearSessionMessagesIdsInDb(id);
        goToTheMainMenu(bot, id);
        resetSessionDataInDb(id);
        addNewUserToDb(query);
    });

    calendarModule.setListeners(bot);
    tripPriceModule.setListeners(bot);
    tripCitiesModule.setListeners(bot);
    phoneNumberModule.setListeners(bot);
    availableSeatsModule.setListeners(bot);
    tripCreationSummariseModule.setListeners(bot);

    bot.on('message', async msg => {
        const { chat: { id }, message_id } = msg;
        addSessionMessagesIdsToDb(id, message_id);
        // bot.deleteMessage(id, message_id);

        if (!isNil(msg.contact)) {
            tripCreationSummariseModule.runTripCreationSummariseModule(bot, msg);
        }

        switch (msg.text) {
            case PROPOSE_TRIP: {
                await addNewTrip(msg);
                await tripCitiesModule.start(bot, msg);
            }
                break;
            case FINISH_TRIP_CREATION:
            case TRIP_CREATION_CREATION_COMPLETED_MESSAGE: {
                await removeSessionMessagesIds(bot, id);
                await clearSessionMessagesIdsInDb(id);
                await resetSessionDataInDb(id);
                await goToTheMainMenu(bot, id);
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
                console.log('AVAILABLE_SEATS_MESSAGE');
                availableSeatsModule.runAvailableTripSeatsPicker(bot, msg);
            }
            break;
            case GO_TO_TRIP_PRICE_SETTINGS: {
                tripPriceModule.runTripPriceModule(bot, msg);
            }
            break;
            case CONFIRM_TRIP_PRICE: {
                phoneNumberModule.runPhoneNumberModule(bot, msg);
            }
            break;
            case FINISH_TRIP_CREATION: {
                tripCreationSummariseModule.saveTrip(bot, msg);
                bot.answerCallbackQuery({
                    callback_query_id: msg.message_id,
                })
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default telegramBotControllers;
