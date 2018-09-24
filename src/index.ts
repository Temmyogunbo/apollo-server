import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import merge from "lodash/merge";

import typeDefs from "./api/user/user.graphql";
import userResolvers from "./api/user/user.resolvers";
import models from "./database/models";
import { getMe } from "./utils/getMe";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers: merge({}, userResolvers),
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      me,
      models,
      secret: process.env.APP_SECRET,
    };
  },
});

server.listen().then(({ url }) => {
  process.stdout.write(` Server ready at ${url}\n`);
});
