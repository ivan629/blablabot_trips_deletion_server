import { isNil, chunk } from 'lodash';
import calendarSchema from '../../../common/components/calendarSchema';
import {
    getCurrentYear,
    getMonthButton,
    getDaysButtons,
    getCalendarKeyboards,
    getCurrentMonthValue,
    getCurrentMonthNumber,
    getDefaultTripMinCalendarDateThreshold,
} from './calendarComponentUtils';
import { getLocalizedMessage, keysActions } from '../../messages';

const FindTripCalendarComponent = async ({
                                             eventObject,
                                             chat_id,
                                             customNewYear,
                                             customMonthNumber,
                                             alreadyChosenDate = {},
                                             shouldDisableGoToNextMonthButton,
                                             getMinCalendarDateThresholdCallback = getDefaultTripMinCalendarDateThreshold
                                         }) => {

    const shouldIncludeReplyMarkup = isNil(customMonthNumber);
    const currentCalendarMonth = shouldIncludeReplyMarkup
        ? getCurrentMonthValue(eventObject)
        : getLocalizedMessage(keysActions.CALENDAR_MONTHS_MESSAGES_KEY, eventObject)[customMonthNumber];
    const currentMonthNumber = shouldIncludeReplyMarkup ? getCurrentMonthNumber() : customMonthNumber;
    const currentYear = isNil(customNewYear) ? getCurrentYear() : customNewYear;
    const daysForCalendar = calendarSchema(currentMonthNumber, currentYear);

    const minDateMillisecondsThreshold = await getMinCalendarDateThresholdCallback();
    const daysButtons = getDaysButtons(chat_id, daysForCalendar, alreadyChosenDate, minDateMillisecondsThreshold);
    const monthButton = getMonthButton(currentCalendarMonth, currentYear);
    const chunkedDaysArrayButtons = chunk(daysButtons, getLocalizedMessage(keysActions.CALENDAR_WEEK_DAYS_MESSAGES_KEY, eventObject).length);

    return getCalendarKeyboards({
        eventObject,
        monthButton,
        currentMonthNumber,
        chunkedDaysArrayButtons,
        shouldIncludeReplyMarkup,
        shouldDisableGoToNextMonthButton
    })
};

export default FindTripCalendarComponent;
