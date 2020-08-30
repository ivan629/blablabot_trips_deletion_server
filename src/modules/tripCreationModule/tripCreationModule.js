import { isNil } from 'lodash';
import { initialKeyboard } from '../../modules/keyboards/keyboards';
import CalendarModule from './tripDateModule/tripDateModule';
import TripCitiesModule from './tripCitiesModule/tripCitiesModule';
import TripPriceModule from './tripPriceModule/tripPriceModule';
import TripCreationSummariseModule from './tripCreationSummariseModule/tripCreationSummariseModule';
import AvailableSeatsModule from './availableSeatsModule/availableSeatsModule';
import PhoneNumberModule from './phoneNumberModule/phoneNumberModule';
import {
    addSessionMessagesIdsToDb, removeSessionMessagesIds,
    toggleIsTripCitiesCreating,
} from '../../services/helpers';
import { addNewTrip } from '../../common/utils/utils';
import {
    PROPOSE_TRIP,
    CONFIRM_TRIP_PRICE,
    FINAL_CITY_IN_THE_TRIP,
    GO_TO_TRIP_PRICE_SETTINGS,
    GO_TO_TRIP_END_TIME_PICKER,
    GO_TO_AVAILABLE_SEATS_SETTING,
    FINISH_TRIP_CREATION,
} from '../../common/constants/commonСonstants';

const phoneNumberModule = new PhoneNumberModule();
const calendarModule = new CalendarModule();
const tripPriceModule = new TripPriceModule();
const tripCitiesModule = new TripCitiesModule();
const availableSeatsModule = new AvailableSeatsModule();
const tripCreationSummariseModule = new TripCreationSummariseModule();

const tripCreationModule = bot => {
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
            case FINAL_CITY_IN_THE_TRIP: {
                calendarModule.runStartTripDatePicker(bot, msg);
                await toggleIsTripCitiesCreating(id, false);
            }
                break;
            case GO_TO_TRIP_END_TIME_PICKER: {
                await removeSessionMessagesIds(bot, id);
                calendarModule.runStopTripDatePicker(bot, msg);
            }
                break;
            case GO_TO_AVAILABLE_SEATS_SETTING: {
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
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default tripCreationModule;
