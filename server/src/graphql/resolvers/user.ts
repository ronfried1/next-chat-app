import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {

      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }
      const { id } = session.user;
      console.log("this is the test", session.user);
      try {
        /**
         * Check if username taken by another user
         */
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (existingUser) {
          console.log("this is the test", existingUser);
          return {
            error: "Username already taken. Try another",
          };
        }

        /**
         * update username
         */
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log("createUsername error", error);
        return {
          error: error?.message as string,
        };
      }
    },
  },
  // Subscription: {},
};

export default resolvers;
