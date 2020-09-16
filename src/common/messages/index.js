import { get } from 'lodash';
import { LANGUAGES } from '../constants/botSettings';
import * as tripCitiesKeysActions from './tripCreationMessages/tripCitiesKeysActions';
import * as calendarKeysActions from './tripCreationMessages/calendarKeysActions';
import * as availableSeatsKeysActions from './tripCreationMessages/availableSeatsKeysActions';
import * as tripPriceKeysActions from './tripCreationMessages/tripPriceKeysActions';
import * as phoneNumberKeysActions from './tripCreationMessages/phoneNumberKeysActions';
import * as tripSummariseKeysActions from './tripCreationMessages/tripSummariseKeysActions';
import * as mainKeysActions from './main/mainKeysActions';
import * as myTripsKeysActions from './myTrips/myTripsKeysActions';
import * as findTripsKeysActions from './findTrips/findTripsKeysActions';
import * as summaryKeysActions from './summary/summaryKeysActions';
import * as commonKeysActions from './common/commonKeysActions';

import * as citiesMessages from './tripCreationMessages/citiesMessages';
import * as calendarMessages from './tripCreationMessages/calendarMessages';
import * as availableSeatsMessages from './tripCreationMessages/availableSeatsMessages';
import * as tripPriceMessages from './tripCreationMessages/tripPriceMessages';
import * as phoneNumberMessages from './tripCreationMessages/phoneNumberMessages';
import * as tripSummariseMessages from './tripCreationMessages/tripSummariseMessages';
import * as mainMessages from './main/mainMessages';
import * as myTripsMessages from './myTrips/myTripsMessages';
import * as findTripsMessages from './findTrips/findTripsMessages';
import * as summaryMessages from './summary/summaryMessages';
import * as commonMessages from './common/commonMessages';

const tripCitiesMessagesMap = {
    [tripCitiesKeysActions.SHOW_NEXT_CITY_KEY]: citiesMessages.SHOW_NEXT_CITY_MESSAGES,
    [tripCitiesKeysActions.CHOOSE_TRIP_CITY_KEY]: citiesMessages.CHOOSE_TRIP_CITY_MESSAGES,
    [tripCitiesKeysActions.NOT_FOUND_CITY_MESSAGE_KEY]: citiesMessages.NOT_FOUND_CITY_MESSAGES,
    [tripCitiesKeysActions.BLOCKED_FINAL_CITY_KEY]: citiesMessages.BLOCKED_FINAL_CITY_MESSAGES,
    [tripCitiesKeysActions.CITIES_ADD_NEW_HELP_TEXT_KEY]: citiesMessages.CITIES_ADD_NEW_HELP_TEXT_MESSAGES,
    [tripCitiesKeysActions.FINAL_CITY_IN_THE_TRIP_KEY]: citiesMessages.FINAL_CITY_IN_THE_TRIP_MESSAGES,
    [tripCitiesKeysActions.BLOCKED_FINAL_CITY_IN_THE_TRIP_MESSAGES]: citiesMessages.BLOCKED_FINAL_CITY_IN_THE_TRIP_MESSAGES,
    [tripCitiesKeysActions.CITY_ALREADY_EXISTS_ERROR_MESSAGE_KEY]: citiesMessages.CITY_ALREADY_EXISTS_ERROR_MESSAGES,
}

const calendarMessagesMap = {
    [calendarKeysActions.TIME_CHOOSING_MESSAGE_KEY]: calendarMessages.TIME_CHOOSING_MESSAGES,
    [calendarKeysActions.GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY]: calendarMessages.GO_TO_TRIP_END_TIME_PICKER_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TIME_PICKER_MESSAGE_KEY]: calendarMessages.BLOCKED_GO_TO_TIME_PICKER_MESSAGES,
    [calendarKeysActions.TIME_CHOOSING_HELP_MESSAGE_KEY]: calendarMessages.TIME_CHOOSING_HELP_MESSAGES,
    [calendarKeysActions.GO_TO_TIME_PICKER_MESSAGE_KEY]: calendarMessages.GO_TO_TIME_PICKER_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGE_KEY]: calendarMessages.BLOCKED_GO_TO_TRIP_END_TIME_PICKER_MESSAGES,
    [calendarKeysActions.TIME_STOP_CHOOSING_HELP_MESSAGE_KEY]: calendarMessages.TIME_STOP_CHOOSING_HELP_MESSAGES,
    [calendarKeysActions.PROPOSE_TRIP_KEY]: calendarMessages.PROPOSE_TRIP_MESSAGES,
    [calendarKeysActions.CALENDAR_START_TRIP_KEY]: calendarMessages.CALENDAR_START_TRIP_MESSAGES,
    [calendarKeysActions.CALENDAR_CONGRATS_MESSAGE_START_KEY]: calendarMessages.CALENDAR_CONGRATS_MESSAGE_START,
    [calendarKeysActions.CALENDAR_CONGRATS_MESSAGES_STOP_KEY]: calendarMessages.CALENDAR_CONGRATS_MESSAGES_STOP,
    [calendarKeysActions.CALENDAR_HELP_MESSAGE_KEY]: calendarMessages.CALENDAR_HELP_MESSAGES,
    [calendarKeysActions.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_KEY]: calendarMessages.BLOCKED_GO_TO_TIME_PICKER_KEYBOARD_MESSAGES,
}

const availableSeatsMessagesMap = {
    [availableSeatsKeysActions.AVAILABLE_SEATS_MESSAGE_KEY]: availableSeatsMessages.AVAILABLE_SEATS_MESSAGE,
    [availableSeatsKeysActions.CHOSEN_AVAILABLE_SEATS_MESSAGES_KEY]: availableSeatsMessages.CHOSEN_AVAILABLE_SEATS_MESSAGES,
    [availableSeatsKeysActions.CHOOSE_AVAILABLE_SEATS_MESSAGES_KEY]: availableSeatsMessages.CHOOSE_AVAILABLE_SEATS_MESSAGES,
    [availableSeatsKeysActions.AVAILABLE_SEATS_BLOCKED_MESSAGE_KEY]: availableSeatsMessages.AVAILABLE_SEATS_BLOCKED_MESSAGES,
    [availableSeatsKeysActions.GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES_KEY]: availableSeatsMessages.GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES,
    [availableSeatsKeysActions.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGE_KEY]: availableSeatsMessages.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_MESSAGES,
    [availableSeatsKeysActions.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_KEY]: availableSeatsMessages.BLOCKED_GO_TO_AVAILABLE_SEATS_SETTINGS_ACTION_MESSAGES,
}

const tripPriceMessagesMap = {
    [tripPriceKeysActions.CONFIRM_TRIP_PRICE_MESSAGE_KEY]: tripPriceMessages.CONFIRM_TRIP_PRICE_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_BLOCKED_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_BLOCKED_MESSAGES,
    [tripPriceKeysActions.SET_TRIP_PRICE_INITIAL_MESSAGES_KEY]: tripPriceMessages.SET_TRIP_PRICE_INITIAL_MESSAGES,
    [tripPriceKeysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_KEY]: tripPriceMessages.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_SETTINGS_FINISH_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_SETTINGS_FINISH_MESSAGES,
    [tripPriceKeysActions.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES_KEY]: tripPriceMessages.CONFIRM_TRIP_PRICE_BLOCKED_MESSAGES,
    [tripPriceKeysActions.TRIP_PRICE_SETTINGS_INITIAL_MESSAGES_KEY]: tripPriceMessages.TRIP_PRICE_SETTINGS_INITIAL_MESSAGES,
    [tripPriceKeysActions.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED_KEY]: tripPriceMessages.GO_TO_TRIP_PRICE_SETTINGS_MESSAGES_BLOCKED,
}

const phoneNumberMessagesMap = {
    [phoneNumberKeysActions.SHARE_CARRIER_PHONE_NUMBER_MESSAGE_KEY]: phoneNumberMessages.SHARE_CARRIER_PHONE_NUMBER_MESSAGES,
    [phoneNumberKeysActions.GO_TO_TRIP_SUMMARISE_MESSAGES_KEY]: phoneNumberMessages.GO_TO_TRIP_SUMMARISE_MESSAGES,
    [phoneNumberKeysActions.SEND_MY_PHONE_NUMBER_MESSAGES_KEY]: phoneNumberMessages.SEND_MY_PHONE_NUMBER_MESSAGES,
    [phoneNumberKeysActions.SAVED_PHONE_NUMBER_MESSAGES_KEY]: phoneNumberMessages.SAVED_PHONE_NUMBER_MESSAGES,
}

const tripSummariseMessagesMap = {
    [tripSummariseKeysActions.TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES_KEY]: tripSummariseMessages.TRIP_CREATION_SUMMARISE_INITIAL_MESSAGES,
    [tripSummariseKeysActions.TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES_KEY]: tripSummariseMessages.TRIP_CREATION_SUMMARISE_RECOMMENDATION_MESSAGES,
    [tripSummariseKeysActions.FINISH_TRIP_CREATION_MESSAGES_KEY]: tripSummariseMessages.FINISH_TRIP_CREATION_MESSAGES,
}

const mainMessagesMap = {
    [mainKeysActions.GO_TO_THE_MAIN_MENU_MESSAGES_KEY]: mainMessages.GO_TO_THE_MAIN_MENU_MESSAGES,
    [mainKeysActions.CHOOSE_ACTION_MESSAGES_KEY]: mainMessages.CHOOSE_ACTION_MESSAGES,
    [mainKeysActions.MY_TRIPS_MESSAGES_KEY]: mainMessages.MY_TRIPS_MESSAGES,
}

const myTripsMessagesMap = {
    [myTripsKeysActions.SHOW_I_AM_DRIVING_MESSAGES_KEY]: myTripsMessages.SHOW_I_AM_DRIVING_MESSAGES,
    [myTripsKeysActions.SHOW_BOOKED_TRIPS_MESSAGES_KEY]: myTripsMessages.SHOW_BOOKED_TRIPS_MESSAGES,
    [myTripsKeysActions.NOT_FOUND_TRIPS_MESSAGES_KEY]: myTripsMessages.NOT_FOUND_TRIPS_MESSAGES,
    [myTripsKeysActions.MY_TRIPS_CHOOSE_ROLE_MESSAGE_KEY]: myTripsMessages.MY_TRIPS_CHOOSE_ROLE_MESSAGE,
    [myTripsKeysActions.NOT_FOUND_CARRIER_TRIPS_MESSAGES_KEY]: myTripsMessages.NOT_FOUND_CARRIER_TRIPS_MESSAGES,
    [myTripsKeysActions.UNBOOK_TRIP_MESSAGES_KEY]: myTripsMessages.UNBOOK_TRIP_MESSAGES,
    [myTripsKeysActions.TRIP_LIST_CAPTION_MESSAGES_KEY]: myTripsMessages.TRIP_LIST_CAPTION_MESSAGES,
    [myTripsKeysActions.REMOVE_TRIP_BUTTON_MESSAGES_KEY]: myTripsMessages.REMOVE_TRIP_BUTTON_MESSAGES,
    [myTripsKeysActions.BOOKED_TRIP_LIST_CAPTION_MESSAGES_KEY]: myTripsMessages.BOOKED_TRIP_LIST_CAPTION_MESSAGES,
    [myTripsKeysActions.BOOK_TRIPS_MESSAGES_KEY]: myTripsMessages.BOOK_TRIPS_MESSAGES,
}

const findTripsMessagesMap = {
    [findTripsKeysActions.FIND_TRIP_QUICK_DATE_PICKER_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_QUICK_DATE_PICKER_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_CONGRATS_STOP_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_CONGRATS_STOP_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_SEARCH_TRIPS_BLOCKED_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_SEARCH_TRIPS_BLOCKED_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_SEARCH_TRIPS_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_SEARCH_TRIPS_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_MAX_CITIES_CONT_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_MAX_CITIES_CONT_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_CITIES_ADD_NEW_HELP_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_CITIES_ADD_NEW_HELP_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_GO_TO_CALENDAR_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_GO_TO_CALENDAR_MESSAGES,
    [findTripsKeysActions.CHOOSE_FIND_TRIP_CITY_MESSAGES_KEY]: findTripsMessages.CHOOSE_FIND_TRIP_CITY_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_ACTION_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_GO_TO_CALENDAR_BLOCKED_ACTION_MESSAGES,
    [findTripsKeysActions.FIND_TRIP_ACTION_MESSAGES_KEY]: findTripsMessages.FIND_TRIP_ACTION_MESSAGES,
    [findTripsKeysActions.FIND_CITY_ALREADY_EXISTS_ERROR_MESSAGES_KEY]: findTripsMessages.FIND_CITY_ALREADY_EXISTS_ERROR_MESSAGES,
    [findTripsKeysActions.CALENDAR_CONGRATS_START_MESSAGES_KEY]: findTripsMessages.CALENDAR_CONGRATS_START_MESSAGES,
    [findTripsKeysActions.FIND_TRIPS_NOT_FOUND_CITY_MESSAGES_KEY]: findTripsMessages.FIND_TRIPS_NOT_FOUND_CITY_MESSAGES,
    [findTripsKeysActions.CHOOSE_CITY_MESSAGES_KEY]: findTripsMessages.CHOOSE_CITY_MESSAGES,
}

const summaryMessagesMap = {
    [summaryKeysActions.TRIP_SUMMARY_MESSAGES_KEY]: summaryMessages.TRIP_SUMMARY_MESSAGES,
}

const commonMessagesMap = {
    [commonKeysActions.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES_KEY]: commonMessages.FIND_TRIPS_KEYBOARDS_DAY_MESSAGES,
    [commonKeysActions.CALENDAR_WEEK_DAYS_MESSAGES_KEY]: commonMessages.CALENDAR_WEEK_DAYS_MESSAGES,
    [commonKeysActions.CALENDAR_MONTHS_MESSAGES_KEY]: commonMessages.CALENDAR_MONTHS_MESSAGES,
    [commonKeysActions.CITIES_INITIAL_HELP_MESSAGES_KEY]: commonMessages.CITIES_INITIAL_HELP_TEXT_MESSAGES,
}

export const messagesMap = {
    ...mainMessagesMap,
    ...commonMessagesMap,
    ...summaryMessagesMap,
    ...myTripsMessagesMap,
    ...calendarMessagesMap,
    ...tripPriceMessagesMap,
    ...findTripsMessagesMap,
    ...tripCitiesMessagesMap,
    ...phoneNumberMessagesMap,
    ...tripSummariseMessagesMap,
    ...availableSeatsMessagesMap,
}

export const keysActions = {
    ...mainKeysActions,
    ...commonKeysActions,
    ...summaryKeysActions,
    ...myTripsMessagesMap,
    ...myTripsKeysActions,
    ...calendarKeysActions,
    ...findTripsKeysActions,
    ...tripPriceKeysActions,
    ...tripCitiesKeysActions,
    ...phoneNumberKeysActions,
    ...tripSummariseKeysActions,
    ...availableSeatsKeysActions,
};

export const getLocalizedMessage = (message, eventObject) => {
    const languageCode = get(eventObject, 'from.language_code', LANGUAGES.en);
    return messagesMap[message][languageCode];
}
