import moongose from "mongoose";

import PictureService, { TMatchAggs } from "./services";

import { escapeRegExp } from "../../../helpers/utils.helper";
import logger from "../../../helpers/logger.helper";

import { IPicture } from "./services";

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
    allPictures: async (
      _root: any,
      args: { paginated: IPaginate; filter: IFilter & { status: string } },
      _context: any
    ) => {
      const ctx = "GET_PICTURES";
      logger.info(ctx, "Starting...");
      // Input
      const { filter, paginated = { page: 1, perPage: 10 } } = args;

      const { page = 1, perPage = 10 } = paginated;
      const { q, ids, status } = filter;

      const aggs: TMatchAggs = { $match: {} };

      if (q) {
        const reg = { $regex: new RegExp(escapeRegExp(q.trim()), "i") };
        aggs.$match["$or"] = [{ name: reg }, { description: reg }];
      }

      if (status) {
        aggs.$match["status"] = status;
      }

      if (ids) {
        ids.forEach((id) => new moongose.Types.ObjectId(id));
        aggs.$match["_id"] = { $in: ids };
      }

      logger.info(ctx, "Working...");
      const pageInfo = await PictureService.getPaginated({
        page,
        perPage,
        aggs: aggs.$match,
      });

      const pictures = await PictureService.getAll(aggs.$match);
      logger.info(ctx, "Validating if exist...");

      // Data response
      const response = {
        pageInfo,
        pictures: pictures,
      };

      // Response
      logger.info(ctx, "Finished!");
      return response;
    },
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
    addPicture: async (
      _root: any,
      args: IArgs<Omit<IPicture, "_id">>,
      _context: any
    ) => {
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
    updPicture: async (
      _root: any,
      args: IArgs<Omit<IPicture, "_id"> & { id: string }>,
      _context: any
    ) => {
      const ctx = "UPDATE_PICTURE";
      logger.info(ctx, "Starting...");
      // Input
      const {
        input: { id, status, name, description },
      } = args;

      logger.info(ctx, "Validate if exist...");

      const picture = await PictureService.findById(id);
      if (!picture) {
        throw new Error("Esta cuenta no existe");
      }

      // Process
      logger.info(ctx, "Working...");
      const response = await PictureService.modify(picture._id, {
        status,
        name,
        description,
      });

      // Response
      logger.info(ctx, "Finished!");
      return response;
    },
  },
};

export default resolvers;
