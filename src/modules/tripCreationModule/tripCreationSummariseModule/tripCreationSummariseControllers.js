import { isNil } from 'lodash';
import { getTripHtmlSummary } from '../../../common/utils/utils';
import { getCreatingTrip, getCarrierInfo } from '../../../services/helpers';

export const getTripSummary = async (chat_id, eventObject) => {
    const trip = await getCreatingTrip(chat_id);
    const carrierInfo = await getCarrierInfo(chat_id);
    if (isNil(trip)) return;
    return getTripHtmlSummary({ trip, carrierInfo, leftPadding: '\t', eventObject})
};
