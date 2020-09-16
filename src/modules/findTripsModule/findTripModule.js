import FoundTripsModule from './foundTripsModule/foundTripsModule';
import FindTripDateModule from './findTripDateModule/findTripDateModule'
import FindCitiesModule from './findTripCitiesModule/findTripCitiesModule'
import {getLocalizedMessage, keysActions} from "../../common/messages";

const foundTripsModule = new FoundTripsModule();
const findCitiesModule = new FindCitiesModule();
const findTripDateModule = new FindTripDateModule();

const findTripModule = bot => {
    findCitiesModule.setListeners(bot);
    findTripDateModule.setListeners(bot);
    foundTripsModule.setListeners(bot);

    bot.on('message', async msg => {
        switch (msg.text) {
            case getLocalizedMessage(keysActions.FIND_TRIP_ACTION_MESSAGES_KEY, msg): {
                await findCitiesModule.start(bot, msg);
            }
                break;
            case getLocalizedMessage(keysActions.FIND_TRIP_GO_TO_CALENDAR_MESSAGES_KEY, msg): {
                findTripDateModule.runStartTripDatePicker(bot, msg);
            }
                break;
            default: {
                break;
            }
        }
    });
};

export default findTripModule;
