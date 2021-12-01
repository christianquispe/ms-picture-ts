import logger from "../../../helpers/logger.helper";

const resolvers = {
  Query: {
    getBuyer: async (_root: any, args: any, _context: any) => {
      const ctx = "OBTAIN_BUYER";
      logger.info(ctx, "Starting...");
      // Input
      const {
        input: { name },
      } = args;

      // Process
      logger.info(ctx, "Validating existence...");

      // Response
      logger.info(ctx, "Finished!");
      return {
        name,
      };
    },
  },
  Mutation: {
    test: async (_root: any, args: any, _context: any) => {
      const ctx = "UPDATE_BUYER";
      logger.info(ctx, "Starting...");
      // Input
      const {
        input: { name },
      } = args;

      // Data

      // Process
      logger.info(ctx, "Validating if exist...");

      // Response
      logger.info(ctx, "Finished !!!");
      return {
        name,
      };
    },
  },
};

export default resolvers;
