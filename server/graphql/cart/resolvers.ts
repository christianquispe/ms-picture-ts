import moongose from "mongoose";

import CartService, { TMatchAggs } from "./services";
import PictureService from "../pictures/services";

import { escapeRegExp } from "../../../helpers/utils.helper";
import logger from "../../../helpers/logger.helper";

import { IAddToCart } from "./services";

interface IArgs<T> {
  input: T;
}

interface IPaginate {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: string;
}

interface IFilter {
  q?: string;
  ids?: string[];
  id?: string;
}

const resolvers = {
  Query: {
    getTest: async (_root: any, args: { test: string }, _context: any) => {
      const ctx = "GET_PICTURES";
      logger.info(ctx, "Starting...");
      // Input
      const { test } = args;

      // Process
      logger.info(ctx, "Process...");
      const response = {
        test,
      };

      // Response
      logger.info(ctx, "Finished!");
      return response;
    },
  },
  Mutation: {
    addToCart: async (_root: any, args: IArgs<IAddToCart>, _context: any) => {
      const ctx = "ADD_TO_PICTURE";
      logger.info(ctx, "Starting...");
      // Input
      const {
        input: { productId, type, quantity },
      } = args;
      let product;

      // Process
      logger.info(ctx, "Validate type...");
      if (type === "picture") {
        product = await PictureService.findById(productId);
        if (!product) {
          throw new Error("Este producto no existe");
        }
      } else {
        throw new Error("Solo tenemos cuadros");
      }

      logger.info(ctx, "Working...");
      const params = {
        type,
        productId,
        productSummary: product,
        quantity,
      };

      const response = await CartService.create(params);

      // Response
      logger.info(ctx, "Finished!");
      return response;
    },
  },
};

export default resolvers;
