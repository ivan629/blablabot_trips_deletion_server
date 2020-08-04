// import fs from 'fs';
// import 'dotenv';
// import { APP } from './common/constants';
// import { initializeDatabase } from './db';
// import { startHttpServer } from './server';
// import logger from './logger';
//
// async function logIntro() {
//     const env = APP.ENV;
//     const banner = await new Promise((resolve, reject) => {
//         fs.readFile('./banner.txt', 'utf8', (err, text) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(text);
//         });
//     });
//
//     logger.info(`Starting application, environment: ${env}\r\n${banner}`);
// }
//
// (() => {
//     // catch ctrl+c event and exit normally
//     process.on('SIGINT', () => {
//         try {
//             logger.info('[Ctrl+C] Stopping application...');
//         } finally {
//             process.exit(1);
//         }
//     });
//
//     // catch uncaught exceptions, trace, then exit normally
//     process.on('uncaughtException', (err) => {
//         try {
//             logger.info('Stopping application...');
//             if (err) {
//                 logger.error('Uncaught exceptions occurred:', err);
//             }
//         } finally {
//             process.exit(2);
//         }
//     });
//
//     process.on('exit', (status) => {
//         try {
//             logger.info(`Stopping application... [${status}]`);
//         } finally {
//             // do nothing
//         }
//     });
// })();
//
// (async () => {
//     try {
//        await logIntro();
//        await initializeDatabase();
//        await startHttpServer()
//     } catch (err) {
//         try {
//             logger.error(err);
//         } finally {
//             process.exit(3);
//         }
//     }
// })();

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
