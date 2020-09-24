import config from 'config';

export const getHost = () =>
    `${config.host || 'localhost'}:${process.env.PORT || config.port}`;
