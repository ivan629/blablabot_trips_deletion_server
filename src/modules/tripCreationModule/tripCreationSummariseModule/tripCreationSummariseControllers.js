import { isNil } from 'lodash';
import { getTripHtmlSummary } from '../../../common/utils/utils';
import { getNotCompletedTrip, getCarrierInfo } from '../../../services/helpers';

export const getTripSummary = async (chat_id) => {
    const trip = await getNotCompletedTrip(chat_id);
    const carrierInfo = await getCarrierInfo(chat_id);
    if (isNil(trip)) return;
    return getTripHtmlSummary(trip, carrierInfo, '\t')
};
