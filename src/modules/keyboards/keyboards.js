import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    USER_PAY_START,
    SETTINGS,
    MY_TRIPS,
    FIND_TRIP,
    PROPOSE_TRIP,
    REMOVE_TRIP_BUTTON,
    CONFIRM_TRIP_PRICE,
    GO_TO_THE_MAIN_MENU,
    FINISH_TRIP_CREATION,
    SEND_MY_PHONE_NUMBER,
    NEXT_CITY_IN_THE_TRIP,
    FINAL_CITY_IN_THE_TRIP,
    SET_AVAILABLE_SEATS_CUNT,
    GO_TO_TRIP_PRICE_SETTINGS,
    CONFIRM_TRIP_PRICE_BLOCKED,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    GO_TO_TRIP_SUMMARISE,
    FIND_TRIP_GO_TO_CALENDAR,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
    GO_TO_TRIP_PRICE_SETTINGS_BLOCKED,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS,
} from '../../common/constants/commonСonstants';

import { FIND_TRIPS_KEYBOARDS_DAY } from '../../common/constants/findTripConstants';

export const phoneNumberKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: SEND_MY_PHONE_NUMBER,
                    request_contact: true
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
};

export const phoneNumberKeyboardGoToSummarise = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: GO_TO_TRIP_SUMMARISE }
            ],
            [
                { text: GO_TO_THE_MAIN_MENU },
            ]
        ]
    }
};

export const tripPriceSettingsKeyboardInitial = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: CONFIRM_TRIP_PRICE_BLOCKED,
                    callback_data: createAction(CONFIRM_TRIP_PRICE_BLOCKED)
                },
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
};

export const tripPriceSettingsKeyboardFinish = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: CONFIRM_TRIP_PRICE,
                    callback_data: createAction(CONFIRM_TRIP_PRICE)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
};

export const availableSeatsKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(8).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 4)
    }
};

export const tripSummaryKeyboards = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FINISH_TRIP_CREATION,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
};

export const availableSeatsCongratsKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: GO_TO_TRIP_PRICE_SETTINGS,
                    callback_data: createAction(GO_TO_TRIP_PRICE_SETTINGS)
                }
            ],
            [
               {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
               }
          ],
        ]
    }
};

export const availableSeatsKeyboardBlocked = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: GO_TO_TRIP_PRICE_SETTINGS_BLOCKED,
                    callback_data: createAction(GO_TO_TRIP_PRICE_SETTINGS_BLOCKED)
                }
            ],
            [
               {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
               }
          ],
        ]
    }
};

export const initialKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FIND_TRIP,
                    callback_data: createAction(FIND_TRIP),
                },
                {
                    text: PROPOSE_TRIP,
                    callback_data: createAction(PROPOSE_TRIP)
                }
            ],
            [
                {
                    text: MY_TRIPS,
                    callback_data: createAction(MY_TRIPS)
                },
                {
                    text: USER_PAY_START,
                    callback_data: createAction(USER_PAY_START)
                }
            ],
            [
                {
                    text: SETTINGS,
                    callback_data: createAction(SETTINGS)
                }
            ],
        ]
    }
};

export const findTripsDaysAndCalendarKeyboard = {
    reply_markup: {
        inline_keyboard: chunk(new Array(4).fill(null).reduce((result, item, index) => {
            result.push({
                text: FIND_TRIPS_KEYBOARDS_DAY[index],
                callback_data: createAction(FIND_TRIPS_KEYBOARDS_DAY[index], index),
            });

            return result;
        }, []), 2)
    }
};

export const calendarKeyboard = nextButtonAction => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: nextButtonAction,
                    callback_data: createAction(nextButtonAction)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ]
        ]
    }
});

export const removeTripKeyBoard = trip_id => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: REMOVE_TRIP_BUTTON,
                    callback_data: createAction(REMOVE_TRIP_BUTTON, trip_id)
                }
            ],
        ]
    }
});


export const blockedTimePickerKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
                    callback_data: createAction(BLOCKED_GO_TO_TRIP_END_TIME_PICKER)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};

export const blockedTimeStopPickerKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS,
                    callback_data: createAction(BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};

export const goToMenuKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
};

export const calendarNotCompletedKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(NEXT_CITY_IN_THE_TRIP)
                },
            ],
        ]
    }
};

export const creatingCitiesKeyboards = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FINAL_CITY_IN_THE_TRIP,
                    callback_data: createAction(FINAL_CITY_IN_THE_TRIP)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};

export const blockedCitiesKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: BLOCKED_FINAL_CITY_IN_THE_TRIP,
                    callback_data: createAction(BLOCKED_FINAL_CITY_IN_THE_TRIP)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};

export const blockedFindTripCitiesKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
                    callback_data: createAction(FIND_TRIP_GO_TO_CALENDAR_BLOCKED)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};
export const findTripGoToCalendarKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: FIND_TRIP_GO_TO_CALENDAR,
                    callback_data: createAction(FIND_TRIP_GO_TO_CALENDAR)
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                    callback_data: createAction(GO_TO_THE_MAIN_MENU)
                },
            ],
        ]
    }
};
