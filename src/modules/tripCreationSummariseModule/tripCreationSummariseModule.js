import {
    TRIP_CREATION_SUMMARISE_INITIAL_MESSAGE,
    TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGE,
} from '../../common/constants/commonСonstants';
import { tripSummaryKeyboards } from '../keyboards/keyboards';
import { sendMessage } from '../../common/utils/utils';
import { getTripSummary } from './tripCreationSummariseControllers';

class TripCreationSummariseModule {
    async runTripCreationSummariseModule (bot, msg) {
        sendMessage(bot, msg.chat.id, TRIP_CREATION_SUMMARISE_INITIAL_MESSAGE, tripSummaryKeyboards);
        const summary = await getTripSummary(msg.chat.id);
        sendMessage(bot, msg.chat.id, summary, { parse_mode: 'HTML' });
        sendMessage(bot, msg.chat.id, TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGE);
    }

    setListeners(bot) {

    }
}

export default TripCreationSummariseModule;
