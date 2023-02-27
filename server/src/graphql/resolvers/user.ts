import { GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ) => {
      const { username } = args;
      const { session, prisma } = context;

      console.log("hey at the api", username);
      console.log("and the context is: ", context);
    },
  },
  // Subscription: {},
};

export default resolvers;
