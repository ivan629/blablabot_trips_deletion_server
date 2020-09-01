import { createServer } from 'http';
import express from 'express';
import config from 'config';
import cors from 'cors';
import path from 'path';
const bodyParser = require('body-parser');

import logger from './logger';
import mainModule from './modules/mainModule';
import { apiUrlResolver, telegramBot } from './services';

const expressApp = express();
const corsOptions = { origin: '*' };

export const startHttpServer = () => new Promise((resolve) => {
    expressApp.use(cors(corsOptions));
    expressApp.use(bodyParser.json());
    expressApp.use(express.static(path.join(__dirname, '../views')));

    mainModule(expressApp, telegramBot);

    const server = createServer(expressApp)
        .listen(process.env.PORT || config.port, config.host, () => {
            logger.info(`Server is listening: ${apiUrlResolver.getHost()}`);
        });

    resolve(server);
});
