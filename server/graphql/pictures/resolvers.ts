import PictureService from "./services";

import logger from "../../../helpers/logger.helper";

import { IPicture } from "./services";

interface IArgs<T> {
  input: Omit<T, "_id">;
}

const resolvers = {
  Query: {
    getPicture: async (
      _root: any,
      args: IArgs<{ id: string }>,
      _context: any
    ) => {
      const ctx = "OBTAIN_PICTURE";
      logger.info(ctx, "Starting...");
      // Input
      const {
        input: { id },
      } = args;

      // Process
      logger.info(ctx, "Working...");
      const picture = await PictureService.findById(id);
      logger.info(ctx, "Validating if exist...");
      if (!picture) {
        throw new Error("pictures.erros.getPicture");
      }

      // Response
      logger.info(ctx, "Finished!");
      return picture;
    },
  },
  Mutation: {
    addPicture: async (_root: any, args: IArgs<IPicture>, _context: any) => {
      const ctx = "CREATE_PICTURE";
      logger.info(ctx, "Starting...");
      // Input
      const { input } = args;

      // Process
      logger.info(ctx, "Working...");
      const response = await PictureService.create({ ...input });

      // Response
      logger.info(ctx, "Finished!");
      return response;
    },
  },
};

export default resolvers;
