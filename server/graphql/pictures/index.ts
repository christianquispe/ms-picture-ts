import { makeExecutableSchema } from "@graphql-tools/schema";
import { importSchema } from "graphql-import";
import path from "path";

import resolvers from "./resolvers";

const typeDefs = importSchema(path.resolve(__dirname, "./schema.gql"));

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
