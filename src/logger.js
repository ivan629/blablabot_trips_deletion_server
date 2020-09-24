import { compact, isEmpty } from 'lodash';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import config from 'config';

const DEFAULT_LOG_LEVEL = 'warn';
const DEFAULT_LOG_FILE = './logs/api.log';

function ensureLogFilePathExists(logsPath) {
    const dir = path.dirname(logsPath);
    if (dir === '.') {
        return;
    }

    dir.split('/').reduce((accPath, subDir) => {
        const subDirPath = `${accPath}${subDir}/`;
        if (!fs.existsSync(subDirPath)) {
            fs.mkdirSync(subDirPath);
        }
        return subDirPath;
    }, '');
}

function getLogFilePath(createIfNotExist) {
    if (!config.logger.fileEnabled) {
        return null;
    }
    const logFilePath = config.logger.logFile || DEFAULT_LOG_FILE;
    if (createIfNotExist) {
        ensureLogFilePathExists(logFilePath);
        return logFilePath;
    }

    return fs.existsSync(logFilePath) ? logFilePath : null;
}

function crateConsoleLogTransportIfEnabled() {
    if (!config.logger.consoleEnabled) {
        return null;
    }
    return new winston.transports.Console({
        level: config.logger.level || DEFAULT_LOG_LEVEL,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.prettyPrint(),
            winston.format.printf(
                ({ timestamp, level, message, meta, ...rest }) => {
                    const details = isEmpty(rest) ? {} : rest;

                    if (!isEmpty(meta)) {
                        details.meta = meta;
                    }

                    const detailsStr = isEmpty(details)
                        ? ''
                        : `\r\n${JSON.stringify(details, null, 2)}`;

                    return `${timestamp} ${level}: ${message}${detailsStr}`;
                }
            )
        ),
    });
}

function crateFileLogTransportIfEnabled() {
    const logFilePath = getLogFilePath(
        true /* create if enabled and do not exists yet */
    );
    if (!logFilePath) {
        return null;
    }

    return new winston.transports.File({
        level: config.logger.level || DEFAULT_LOG_LEVEL,
        format: winston.format.json(),
        filename: logFilePath,
        maxsize: 1048576, // 1 MB
        maxFiles: 100,
    });
}

const logger = winston.createLogger({
    transports: compact([
        crateConsoleLogTransportIfEnabled(),
        crateFileLogTransportIfEnabled(),
    ]),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat()
    ),
});

export default logger;
