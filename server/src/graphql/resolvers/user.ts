import { User } from "@prisma/client";
import { CreateUsernameResponse, GraphQLContext } from "../../util/types";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username: SearchedUsername } = args;
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
              contains: SearchedUsername,
              not: myUsername,
              mode: "insensitive",
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("searchUser error", error);
        throw new GraphQLError(error?.message);
      }
    },
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
