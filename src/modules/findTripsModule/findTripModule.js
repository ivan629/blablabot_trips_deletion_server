import { keysActions } from '../../common/messages';
import { listenerCase } from '../../common/utils/listenersUtils';
import FoundTripsModule from './foundTripsModule/foundTripsModule';
import FindTripDateModule from './findTripDateModule/findTripDateModule'
import FindCitiesModule from './findTripCitiesModule/findTripCitiesModule'

const foundTripsModule = new FoundTripsModule();
const findCitiesModule = new FindCitiesModule();
const findTripDateModule = new FindTripDateModule();

const findTripModule = bot => {
    findCitiesModule.setListeners(bot);
    findTripDateModule.setListeners(bot);
    foundTripsModule.setListeners(bot);

    bot.on('message', async msg => {
        if (listenerCase(keysActions.FIND_TRIP_ACTION_MESSAGES_KEY, msg.text)) {
            return findCitiesModule.start(bot, msg);
        }

        if (listenerCase(keysActions.FIND_TRIP_GO_TO_CALENDAR_MESSAGES_KEY, msg.text)) {
            await findTripDateModule.runStartTripDatePicker(bot, msg);
        }
    });
};

export default findTripModule;
