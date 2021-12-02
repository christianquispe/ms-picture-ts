import { Pictures } from "../../models";

export interface IPicture {
  _id: string;
  name?: string;
  status?: string;
}

class PictureService {
  async create(buyer: Omit<IPicture, "_id">) {
    const response: IPicture = await Pictures.create(buyer);

    return response;
  }

  async modify(id: string, params: any) {
    await Pictures.findByIdAndUpdate(id, params);
    const response: IPicture = await Pictures.findById(id).lean();

    return response;
  }

  async findById(id: string) {
    const response: IPicture = await Pictures.findById(id).lean();
    return response;
  }

  async findByHash(hash: string) {
    const response: IPicture = await Pictures.findOne({
      hash,
    }).lean();

    return response;
  }

  async findByEmail(email: string) {
    const response: IPicture = await Pictures.findOne({
      "contact.email": email,
    }).lean();

    return response;
  }

  async findByRucOrEmail(ruc: string, email: string) {
    const response: IPicture = await Pictures.findOne({
      $or: [{ "company.ruc": ruc }, { "contact.email": email }],
    }).lean();

    return response;
  }
}

export default new PictureService();