import server from "./server";

import logger from "./helpers/logger.helper";

const namespace = "or-express-ts";

const main = async () => {
  try {
    server
      .listen(server.get("port"), () =>
        logger.info(
          namespace,
          `Server running on ${server.get("env")} | ${server.get(
            "host"
          )}:${server.get("port")}`
        )
      )
      .on("error", (err) => Promise.reject(err));
  } catch (error: any) {
    logger.error(namespace, error.toString());
    process.exit(1);
  }
};

main();
