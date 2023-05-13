import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";


const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ) => {
      const { session, prisma } = context;
      const { participantIds } = args;
      console.log("inside create conversation");

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.;
      } catch (error) {
        console.log("createConversation error", error);
        throw new GraphQLError("Error creating conversation");
      }
    },
  },
};

export default resolvers;
