import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    LANGUAGE,
    MY_TRIPS,
    FIND_TRIP,
    BOOK_TRIP_TEXT,
    UNBOOK_TRIP_TEXT,
    BOOK_TRIP_ACTION,
    UNBOOK_TRIP_ACTION,
    REMOVE_TRIP_BUTTON,
    GO_TO_THE_MAIN_MENU,
    FINISH_TRIP_CREATION,
    SEND_MY_PHONE_NUMBER,
    GO_TO_TRIP_SUMMARISE,
    NEXT_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR,
    SHOW_BOOKED_TRIPS_MESSAGE,
    SHOW_I_AM_DRIVING_MESSAGE,
    CANCEL_TRIP_BOOKING_ACTION,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    FIND_TRIP_GO_TO_CALENDAR_BLOCKED,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
} from '../../common/constants/commonСonstants';

import { FIND_TRIPS_KEYBOARDS_DAY } from '../../common/constants/findTripConstants';

import { keysActions, tripCreationMessages } from '../../common/messages/tripCreationMessages'
import { FINAL_CITY_IN_THE_TRIP_KEY } from '../../common/messages/tripCreationMessages/calendarKeysActions';
import { SET_AVAILABLE_SEATS_CUNT, BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY } from '../../common/messages/tripCreationMessages/availableSeatsKeysActions';

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
            [{ text: tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }]
        ]
    }
};

export const tripPriceSettingsKeyboardFinish = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }]
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
            [{ text: tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
        ]
    }
};

export const availableSeatsKeyboardBlocked = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: tripCreationMessages(keysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
        ]
    }
};

export const initialKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                { text: FIND_TRIP },
                { text: tripCreationMessages(keysActions.PROPOSE_TRIP_KEY) }],
            [
                { text: MY_TRIPS },
                { text: LANGUAGE },
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

export const myTripsTripActionKeyboard = (trip_id, alreadyBookedTripsIds, includeReplyMarkup = false) => {
    const text = Object.values(alreadyBookedTripsIds).includes(trip_id) ? UNBOOK_TRIP_TEXT : BOOK_TRIP_TEXT;
    const callback_data = Object.values(alreadyBookedTripsIds).includes(trip_id)
        ? createAction(UNBOOK_TRIP_ACTION, trip_id)
        : createAction(BOOK_TRIP_ACTION, trip_id);

    const button = {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text,
                    callback_data
                }
            ],
        ]
    }

    return includeReplyMarkup ? { reply_markup: button } : button
};

export const myTripsChooseRoleKeyboard = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: SHOW_BOOKED_TRIPS_MESSAGE,
                },
                {
                    text: SHOW_I_AM_DRIVING_MESSAGE,
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                },
            ]
        ]
    }
};

export const calendarKeyboard = nextButtonAction => ({
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {
                    text: nextButtonAction,
                }
            ],
            [
                {
                    text: GO_TO_THE_MAIN_MENU,
                },
            ]
        ]
    }
});

export const cancelBookedTripKeyboard = tripId => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [
                {
                    text: UNBOOK_TRIP_TEXT,
                    callback_data: createAction(CANCEL_TRIP_BOOKING_ACTION, tripId)
                }
            ],
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
            [{ text: tripCreationMessages(BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
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
            [{ text: tripCreationMessages(FINAL_CITY_IN_THE_TRIP_KEY) }],
            [{ text: GO_TO_THE_MAIN_MENU }],
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
