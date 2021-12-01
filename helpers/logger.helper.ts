import winston from "winston";

const logFile = new winston.transports.File({
  level: "info",
  filename: `${process.cwd()}/logs-lm.log`,
  handleExceptions: true,
  maxsize: 5242880, // 5 MB
  maxFiles: 5,
});

const logConsole = new winston.transports.Console({
  level: "debug",
  handleExceptions: true,
});

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD.MM.YYYY HH:mm:ss" }),
  winston.format.prettyPrint(),
  winston.format.printf(
    (content) =>
      `[${content.timestamp}] - [${content.level.toUpperCase()}] - ${
        content.message
      }`
  )
);

const logger = winston.createLogger({
  format,
  transports: [logFile, logConsole],
  exitOnError: false,
});

const info = (namespace: string, message: string, object?: any) => {
  if (object) logger.info(`[${namespace}] - ${message}`, object);
  else logger.info(`[${namespace}] - ${message}`);
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) logger.warn(`[${namespace}] - ${message}`, object);
  else logger.warn(`[${namespace}] - ${message}`);
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) logger.error(`[${namespace}] - ${message}`, object);
  else logger.error(`[${namespace}] - ${message}`);
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) logger.debug(`[${namespace}] - ${message}`, object);
  else logger.debug(`[${namespace}] - ${message}`);
};

export default {
  info,
  warn,
  error,
  debug,
};
