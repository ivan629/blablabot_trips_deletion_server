import { sendMessage } from '../../../common/utils/utils';
import { saveTripInDb } from '../../../services/helpers';
import { tripSummaryKeyboards } from '../../keyboards/keyboards';
import { getTripSummary } from './tripCreationSummariseControllers';
import { keysActions, getLocalizedMessage } from '../../../common/messages';

class TripCreationSummariseModule {
    async runTripCreationSummariseModule (bot, msg) {
        const summary = await getTripSummary(msg.chat.id, msg);
        await sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES_KEY, msg), tripSummaryKeyboards(msg));
        await sendMessage(bot, msg.chat.id, summary, { parse_mode: 'HTML' });
        sendMessage(bot, msg.chat.id, getLocalizedMessage(keysActions.TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES_KEY, msg), { parse_mode: 'HTML' });
    }

    async saveTrip(bot, msg) {
        await saveTripInDb(msg.chat.id);
    }

    setListeners(bot) {}
}

export default TripCreationSummariseModule;
