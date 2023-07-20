import { GraphQLContext } from "../../util/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantsIds: string[] },
      context: GraphQLContext
    ) => {
      console.log("inside Create Conversation", args);
    },
  },
};

export default resolvers;
