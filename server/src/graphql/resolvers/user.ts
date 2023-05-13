import { User } from "@prisma/client";
import { CreateUsernameRequest, GraphQLContext } from "../../util/types";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username: searchedUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("searchUser error", error);
        // throw new Error();
        throw new GraphQLError(error?.message);
      }
    },
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
      const { id: userId } = session.user;
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
            id: userId,
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
    },
  },
  // Subscription: {},
};

export default resolvers;
