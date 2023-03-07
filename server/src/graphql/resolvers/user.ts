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
<<<<<<< HEAD
      const { username } = args;
=======
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }
<<<<<<< HEAD
      const { id: userId } = session.user;
=======
      const { id } = session.user;
      const idd = session.user.id;

      const { username } = args;
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c

      try {
        /**
         * Check that username is not already taken
<<<<<<< HEAD

=======
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c
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
<<<<<<< HEAD
            id: userId,
=======
            id: idd,
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c
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
<<<<<<< HEAD
      } catch (error) {
        console.log("error", error);
        return {
          error: error,
=======
      } catch (error: any) {
        console.log("error", error);
        return {
          error: error?.message,
>>>>>>> b42569cf8653b1a675da9b7b8a9b7ef1d911de1c
        };
      }

      console.log("hey at the api", username);
      console.log("and the context is: ", context);
    },
  },
  // Subscription: {},
};

export default resolvers;
