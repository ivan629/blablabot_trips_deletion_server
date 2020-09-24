// todo: find out why we need this import
import { initialKeyboard } from '../../modules/keyboards/keyboards';
import CalendarModule from './tripDateModule/tripDateModule';
import TripCitiesModule from './tripCitiesModule/tripCitiesModule';
import TripPriceModule from './tripPriceModule/tripPriceModule';
import TripCreationSummariseModule from './tripCreationSummariseModule/tripCreationSummariseModule';
import AvailableSeatsModule from './availableSeatsModule/availableSeatsModule';
import PhoneNumberModule from './phoneNumberModule/phoneNumberModule';
import {
    addSessionMessagesIdsToDb,
    removeSessionMessagesIds,
    toggleIsTripCitiesCreating,
    toggleIsTripCreatingInProgress,
} from '../../services/helpers';
import { addNewTrip } from '../../common/utils/utils';
import { getLocalizedMessage, keysActions } from '../../common/messages';

const calendarModule = new CalendarModule();
const tripPriceModule = new TripPriceModule();
const tripCitiesModule = new TripCitiesModule();
const phoneNumberModule = new PhoneNumberModule();
const availableSeatsModule = new AvailableSeatsModule();
const tripCreationSummariseModule = new TripCreationSummariseModule();

const tripCreationModule = (bot) => {
    calendarModule.setListeners(bot);
    tripPriceModule.setListeners(bot);
    tripCitiesModule.setListeners(bot);
    phoneNumberModule.setListeners(bot);
    availableSeatsModule.setListeners(bot);
    tripCreationSummariseModule.setListeners(bot);

    bot.on('message', async (msg) => {
        const {
            chat: { id },
            text,
            message_id,
        } = msg;
        await addSessionMessagesIdsToDb(id, message_id);

        switch (text) {
            case getLocalizedMessage(keysActions.PROPOSE_TRIP_KEY, msg):
                {
                    await toggleIsTripCreatingInProgress(msg.chat.id, true);
                    await addNewTrip(msg);
                    await tripCitiesModule.start(bot, msg);
                }
                break;
            case getLocalizedMessage(
                keysActions.FINAL_CITY_IN_THE_TRIP_KEY,
                msg
            ):
                {
                    calendarModule.runStartTripDatePicker(bot, msg);
                    await toggleIsTripCitiesCreating(id, false); // defect
                }
                break;
            case getLocalizedMessage(
                keysActions.GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY,
                msg
            ):
                {
                    await removeSessionMessagesIds(bot, id);
                    await calendarModule.runStopTripDatePicker(bot, msg);
                }
                break;
            case getLocalizedMessage(
                keysActions.GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY,
                msg
            ):
                {
                    availableSeatsModule.runAvailableTripSeatsPicker(bot, msg);
                }
                break;
            case getLocalizedMessage(
                keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY,
                msg
            ):
                {
                    await phoneNumberModule.runPhoneNumberModule(bot, msg);
                }
                break;
            case getLocalizedMessage(
                keysActions.GO_TO_TRIP_SUMMARISE_MESSAGES_KEY,
                msg
            ):
                {
                    await tripCreationSummariseModule.runTripCreationSummariseModule(
                        bot,
                        msg
                    );
                }
                break;
            case getLocalizedMessage(
                keysActions.FINISH_TRIP_CREATION_MESSAGES_KEY,
                msg
            ):
                {
                    await tripCreationSummariseModule.saveTrip(bot, msg);
                }
                break;
            default: {
                break;
            }
        }
    });
};

export default tripCreationModule;
