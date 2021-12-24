import { Cart } from "../../models";

export interface IAddToCart {
  productId: string;
  type: string;
  quantity?: number;
}

export interface ICartItem {
  _id: string;
  type?: string;
  quantity?: number;
  productSummary?: any;
}

interface InputPaginated {
  page: number;
  perPage: number;
  aggs: TMatchAggs["$match"];
}

export type TMatchAggs = {
  $match: {
    [key: string]:
      | {
          [key: string]: {
            $regex: RegExp;
          };
        }[]
      | string
      | { $in: any };
  };
};

class CartService {
  async getAll(aggs?: TMatchAggs["$match"]) {
    const response: ICartItem[] = await Cart.find(aggs || {}).lean();
    return response;
  }

  async getPaginated(paginated: InputPaginated) {
    const { page, perPage, aggs } = paginated;

    const total = await Cart.find(aggs).countDocuments();
    return {
      total,
      currentPage: page,
      perPage,
      hasPreviousPage: page > 1,
      hasNextPage: total > page * perPage,
    };
  }

  async create(params: IAddToCart) {
    const response: ICartItem = await Cart.create(params);

    return response;
  }

  async modify(id: string, params: any) {
    await Cart.findByIdAndUpdate(id, params);
    const response: ICartItem = await Cart.findById(id).lean();

    return response;
  }

  async findById(id: string) {
    const response: IAddToCart = await Cart.findById(id).lean();
    return response;
  }

  async findByHash(hash: string) {
    const response: IAddToCart = await Cart.findOne({
      hash,
    }).lean();

    return response;
  }

  async findByEmail(email: string) {
    const response: IAddToCart = await Cart.findOne({
      "contact.email": email,
    }).lean();

    return response;
  }

  async findByRucOrEmail(ruc: string, email: string) {
    const response: IAddToCart = await Cart.findOne({
      $or: [{ "company.ruc": ruc }, { "contact.email": email }],
    }).lean();

    return response;
  }
}

export default new CartService();
