import FoundTripsModule from './foundTripsModule/foundTripsModule';
import FindTripDateModule from './findTripDateModule/findTripDateModule'
import FindCitiesModule from './findTripCitiesModule/findTripCitiesModule'
import { FIND_TRIP, FIND_TRIP_GO_TO_CALENDAR } from '../../common/constants/commonСonstants';

const foundTripsModule = new FoundTripsModule();
const findCitiesModule = new FindCitiesModule();
const findTripDateModule = new FindTripDateModule();

const findTripModule = bot => {
    findCitiesModule.setListeners(bot);
    findTripDateModule.setListeners(bot);
    foundTripsModule.setListeners(bot);

    bot.on('message', async msg => {
        switch (msg.text) {
            case FIND_TRIP: {
                await findCitiesModule.start(bot, msg);
            }
                break;
            case FIND_TRIP_GO_TO_CALENDAR: {
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
