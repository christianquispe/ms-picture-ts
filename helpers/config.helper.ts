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
  picture: {
    name: process.env.MONGODB_NAME_PICTURE!,
    uri: process.env.MONGODB_URL_PICTURE!,
  },
}

const SERVICES = {
  sentry: {
    dsn: process.env.SENTRY_DSN!,
  },
}

const config = {
  server: SERVER,
  dbnorel: DBNOREL,
  services: SERVICES,
  upload: graphqlUploadExpress({
    maxFileSize: Number(process.env.FILE_MAX_SIZE!),
    maxFiles: Number(process.env.FILE_MAX_COUNT!),
  }),
}

export default config
