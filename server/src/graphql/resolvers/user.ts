import { CreateUsernameRequest, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameRequest> => {
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }
      const { id } = session.user;
      const idd = session.user.id;

      const { username } = args;

      try {
        /**
         * Check that username is not already taken
         */
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: "Username already taken, Try another",
          };
        }

        await prisma.user.update({
          where: {
            //why is the compare value is the alias in line 21
            // and not the id itels?
            id: idd,
          },
          data: {
            username,
          },
        });
        /**
         * Update user
         */
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("error", error);
        return {
          error: error?.message,
        };
      }

      console.log("hey at the api", username);
      console.log("and the context is: ", context);
    },
  },
  // Subscription: {},
};

export default resolvers;
