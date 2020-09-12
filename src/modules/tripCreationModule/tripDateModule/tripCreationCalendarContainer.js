import { getTripCreationMinCalendarDateThreshold } from './tripCreationCalendarUtils';
import calendarComponent from '../../../common/components/calendarComponent/calendarComponent';

const FindTripCalendarComponent = async ({
                                             chat_id,
                                             customNewYear,
                                             alreadyChosenDate,
                                             customMonthNumber,
                                             shouldDisableGoToNextMonthButton,
                                         }) => calendarComponent({
        chat_id,
        customNewYear,
        alreadyChosenDate,
        customMonthNumber,
        shouldDisableGoToNextMonthButton,
        getMinCalendarDateThresholdCallback: () => getTripCreationMinCalendarDateThreshold(chat_id),
    })

export default FindTripCalendarComponent;
