import { chunk } from 'lodash';
import { createAction } from '../../common/utils/utils';
import {
    MY_TRIPS,
    FIND_TRIP,
    PROPOSE_TRIP,
    CONFIRM_TRIP_PRICE,
    GO_TO_THE_MAIN_MENU,
    FINISH_TRIP_CREATION,
    FINAL_CITY_IN_THE_TRIP,
    NEXT_CITY_IN_THE_TRIP,
    SET_AVAILABLE_SEATS_CUNT,
    GO_TO_TRIP_PRICE_SETTINGS,
    BLOCKED_FINAL_CITY_IN_THE_TRIP,
    BLOCKED_GO_TO_TRIP_END_TIME_PICKER,
    BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS,
    GO_TO_TRIP_PRICE_SETTINGS_BLOCKED,
    CONFIRM_TRIP_PRICE_BLOCKED,
    SEND_MY_PHONE_NUMBER,
    CHECK_TRIP_CREATION_DATA,
} from '../../common/constants/commonСonstants';

export const phoneNumberKeyboard = {
    reply_markup: {
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

export const phoneNumberKeyboardFinish = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: CHECK_TRIP_CREATION_DATA,
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
        inline_keyboard: chunk(new Array(30).fill(null).reduce((result, item, index) => {
            result.push({
                text: index + 1,
                callback_data: createAction(SET_AVAILABLE_SEATS_CUNT, index + 1),
            });

            return result;
        }, []), 6)
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
                    text: MY_TRIPS,
                    callback_data: createAction(MY_TRIPS)
                }
            ],
            [
                {
                    text: FIND_TRIP,
                    callback_data: createAction(FIND_TRIP),
                },
             ],
            [
                {
                    text: PROPOSE_TRIP,
                    callback_data: createAction(PROPOSE_TRIP)
                }
            ],
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
