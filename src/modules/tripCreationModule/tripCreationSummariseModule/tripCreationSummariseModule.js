import {
    TRIP_CREATION_SUMMARISE_INITIAL_MESSAGE,
    TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGE,
} from '../../../common/constants/commonСonstants';
import { tripSummaryKeyboards } from '../../../modules/keyboards/keyboards';
import { sendMessage } from '../../../common/utils/utils';
import { saveTripInDb } from '../../../services/helpers';
import { getTripSummary } from '../../../modules/tripCreationModule/tripCreationSummariseModule/tripCreationSummariseControllers';

class TripCreationSummariseModule {
    async runTripCreationSummariseModule (bot, msg) {
        const summary = await getTripSummary(msg.chat.id);
        await sendMessage(bot, msg.chat.id, TRIP_CREATION_SUMMARISE_INITIAL_MESSAGE, tripSummaryKeyboards);
        await sendMessage(bot, msg.chat.id, summary, { parse_mode: 'HTML' });
        sendMessage(bot, msg.chat.id, TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGE, { parse_mode: 'HTML' });
    }

    async saveTrip(bot, msg) {
        await saveTripInDb(msg.chat.id);
    }

    setListeners(bot) {}
}

export default TripCreationSummariseModule;
