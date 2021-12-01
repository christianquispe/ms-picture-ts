/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'

const { graphqlUploadExpress } = require('graphql-upload')

dotenv.config()

const ENV = process.env.ENV! || process.env.APP_ENV!
const HOST = process.env.HOST! || process.env.APP_HOST!
const PORT = process.env.PORT! || process.env.APP_PORT!

const SERVER = {
  env: ENV,
  host: HOST,
  port: PORT,
}

const DBNOREL = {
  buyers: {
    name: process.env.MONGODB_NAME_BUYERS!,
    uri: process.env.MONGODB_URL_BUYERS!,
  },
}

const DBREL = {
  config: {
    host: process.env.POSTGRESQL_HOST!,
    database: process.env.POSTGRESQL_DB!,
    user: process.env.POSTGRESQL_USER!,
    password: process.env.POSTGRESQL_PWD!,
    pool: false,
  },
  driver: 'pg',
}

const LANGUAGE = {
  target: process.env.LANGUAGE!,
}

const PLATFORM = {
  landing: process.env.ENV_LANDING_URL!,
  auth: process.env.ENV_AUTH_URL!,
}

const FUNCTIONS = {
  notify: process.env.FX_NOTIFY!,
  storage: process.env.FX_STORAGE!,
  password: process.env.FX_PASSWORD!,
  hash: process.env.FX_HASH!,
}

const SERVICES = {
  pragmatic: {
    url: process.env.PRAGMATIC_BUYERS_URL!,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN!,
  },
}

const config = {
  platform: PLATFORM,
  server: SERVER,
  dbnorel: DBNOREL,
  dbrel: DBREL,
  lang: LANGUAGE,
  functions: FUNCTIONS,
  services: SERVICES,
  upload: graphqlUploadExpress({
    maxFileSize: Number(process.env.FILE_MAX_SIZE!),
    maxFiles: Number(process.env.FILE_MAX_COUNT!),
  }),
}

export default config
