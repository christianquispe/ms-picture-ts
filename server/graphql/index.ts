import { graphqlHTTP } from "express-graphql";
import { stitchSchemas } from "@graphql-tools/stitch";

import logger from "../../helpers/logger.helper";

import pictures from "./pictures";
import cart from "./cart";

const gatewaySchema = stitchSchemas({
  subschemas: [pictures, cart],
});

const routes = graphqlHTTP({
  schema: gatewaySchema,
  graphiql: { headerEditorEnabled: true },
  customFormatErrorFn: (err) => {
    logger.error("server", err.message);
    const ctx = err.message;
    let statusCode;
    let message;
    if (err.path) {
      if (ctx.split(":").length > 1) {
        // Error in Process NodeJS
        statusCode = Number(ctx.split(":")[0]);
        message = ctx.split(":")[1];
      } else {
        // Error in functions PostgreSQL
        statusCode = 600;
        message = ctx;
      }
    } else {
      // Error in GraphQL
      statusCode = 500;
      message =
        err.message.split("; ").length > 1
          ? err.message.split("; ")[1]
          : "Not found";
    }
    return { message, statusCode };
  },
});

export default routes;
