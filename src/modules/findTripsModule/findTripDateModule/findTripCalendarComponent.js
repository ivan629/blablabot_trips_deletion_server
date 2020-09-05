import { isNil, chunk } from 'lodash';
import { MONTHS, WEEK_DAYS } from '../../../common/constants/calendarConstants';
import { getFindTripDate } from '../../../services/helpers';
import calendarSchema from '../../../common/components/calendarSchema';
import {
    getCurrentYear,
    getMonthButton,
    getDaysButtons,
    getCalendarKeyboards,
    getCurrentMonthValue,
    getCurrentMonthNumber,
    getMinCalendarDateThreshold,
} from './findTripDateUtils';


const FindTripCalendarComponent = async ({
                                             chat_id,
                                             customNewYear,
                                             alreadyChosenDay,
                                             customMonthNumber,
                                             shouldDisableGoToNextMonthButton,
                                         }) => {
        const { day, month } = await getFindTripDate(chat_id);
        let finalChosenDay = alreadyChosenDay;

        if (isNil(alreadyChosenDay) && month === customMonthNumber) finalChosenDay = day;

        const shouldIncludeReplyMarkup = !customMonthNumber;
        const currentCalendarMonth = +customMonthNumber ? MONTHS[customMonthNumber - 1] : getCurrentMonthValue();
        const currentMonthNumber = +customMonthNumber || getCurrentMonthNumber();
        const currentYear = +customNewYear || getCurrentYear();
        const daysForCalendar = calendarSchema(currentMonthNumber - 1, currentYear);

        const daysButtons = getDaysButtons(chat_id, daysForCalendar, finalChosenDay, getMinCalendarDateThreshold());
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
