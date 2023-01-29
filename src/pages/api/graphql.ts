import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
		lastName: String
  }

  type Query {
    getUser: User
  }
`;

const resolvers = {
  Query: {
    getUser: () => ({ id: "1", firstName: "Hello", lastName: "World" }),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};