import FindCitiesModule from './findTripCitiesModule/findTripCitiesModule'
import FindTripDateModule from './findTripDateModule/findTripDateModule'
import { FIND_TRIP, FIND_TRIP_GO_TO_CALENDAR } from '../../common/constants/commonСonstants';

const findCitiesModule = new FindCitiesModule();
const findTripDateModule = new FindTripDateModule();

const findTripModule = bot => {
    findCitiesModule.setListeners(bot);
    findTripDateModule.setListeners(bot);

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
