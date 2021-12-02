import mongoose from "mongoose";

import config from "../../helpers/config.helper";
import logger from "../../helpers/logger.helper";

const {
  dbnorel: { picture },
} = config;

const makeNewConnection = (name: string, uri: string) => {
  const db = mongoose.createConnection(uri);

  db.on("error", (error) => {
    logger.error(
      " :: MongoDB :: ",
      `Error connect to db-no-rel: ${name} :: ${JSON.stringify(error)}`
    );
    db.close().catch(() =>
      logger.info("MongoDB :: ", `Failed to close connection${name}`)
    );
  });
  db.on("connected", () =>
    logger.info(
      " :: MongoDB :: ",
      `Established connection to db-no-rel: ${name}`
    )
  );
  db.on("disconnect", () =>
    logger.info(" :: Mongo :: ", `Established connection to db-no-rel: ${name}`)
  );

  return db;
};

const connectionMongoWebPicture = makeNewConnection(picture.name, picture.uri);

export { connectionMongoWebPicture };
