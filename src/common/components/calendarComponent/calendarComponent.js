import { isNil, chunk } from 'lodash';
import { MONTHS, WEEK_DAYS } from '../../constants/calendarConstants';
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

const FindTripCalendarComponent = async ({
                                             chat_id,
                                             customNewYear,
                                             alreadyChosenDay,
                                             customMonthNumber,
                                             shouldDisableGoToNextMonthButton,
                                             getMinCalendarDateThresholdCallback = getDefaultTripMinCalendarDateThreshold
                                         }) => {

    const shouldIncludeReplyMarkup = isNil(customMonthNumber);
    const currentCalendarMonth = shouldIncludeReplyMarkup ? getCurrentMonthValue() : MONTHS[customMonthNumber];
    const currentMonthNumber = shouldIncludeReplyMarkup ? getCurrentMonthNumber() : customMonthNumber;
    const currentYear = isNil(customNewYear) ? getCurrentYear() : customNewYear;
    const daysForCalendar = calendarSchema(currentMonthNumber, currentYear);

    const minDateMillisecondsThreshold = await getMinCalendarDateThresholdCallback();
    const daysButtons = getDaysButtons(chat_id, daysForCalendar, alreadyChosenDay, minDateMillisecondsThreshold);
    const monthButton = getMonthButton(currentCalendarMonth, currentYear);
    const chunkedDaysArrayButtons = chunk(daysButtons, WEEK_DAYS.length);

    return getCalendarKeyboards({
        monthButton,
        currentMonthNumber,
        chunkedDaysArrayButtons,
        shouldIncludeReplyMarkup,
        shouldDisableGoToNextMonthButton
    })
};

export default FindTripCalendarComponent;
