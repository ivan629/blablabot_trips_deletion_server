import { messagesMap } from '../messages';

export const listenerCase = (msgKey, msgText) =>
    Object.values(messagesMap[msgKey]).includes(msgText);
