import calendarComponent from '../../../common/components/calendarComponent/calendarComponent';
import {getTripCreationMinCalendarDateThreshold} from './tripCreationCalendarUtils';

const FindTripCalendarComponent = async ({
                                             chat_id,
                                             customNewYear,
                                             alreadyChosenDay,
                                             customMonthNumber,
                                             shouldDisableGoToNextMonthButton,
                                         }) => calendarComponent({
        chat_id,
        customNewYear,
        alreadyChosenDay,
        customMonthNumber,
        shouldDisableGoToNextMonthButton,
        getMinCalendarDateThresholdCallback: () => getTripCreationMinCalendarDateThreshold(chat_id),
    })

export default FindTripCalendarComponent;
