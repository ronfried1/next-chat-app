import { GraphQLError } from "graphql";
import { ConversationPopulated, GraphQLContext } from "../../util/types";
import { Prisma } from "@prisma/client";

const resolvers = {
  Query: {
    conversations: async (
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<ConversationPopulated[]> => {
      const { session, prisma } = context;
      console.log("inside query conversation");

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      try {
        const { id } = session.user;
        /**
         * Find all conversations that user is part of
         */
        const conversations = await prisma.conversation.findMany({
          /**
           * Below has been confirmed to be the correct
           * query by the Prisma team. Has been confirmed
           * that there is an issue on their end
           * Issue seems specific to Mongo
           */
          // where: {
          //   participants: {
          //     some: {
          //       userId: {
          //         equals: id,
          //       },
          //     },
          //   },
          // },
          include: conversationPopulated,
        });

        console.log("inside query conversation");
        /**
         * Since above query does not work
         */
        return conversations.filter(
          (conversation) =>
            !!conversation.participants.find((p) => p.userId === id)
        );
      } catch (error: any) {
        console.log("error", error);
        throw new GraphQLError(error?.message);
      }
    },
  },

  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      console.log("inside Mutation createConversation");

      const { session, prisma, pubsub } = context;
      const { participantIds } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorized");
      }

      const {
        user: { id: userId },
      } = session;
      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        //emit a CONVERSATION_CREATED event using pubsub
        pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: conversation,
        });
        console.log("inside Mutation createConversation after publishing");
        return { conversationId: conversation.id };
      } catch (error: any) {
        console.log("createConversation error", error.message);
        throw new GraphQLError("Error creating conversation");
      }
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: (_: any, __: any, context: GraphQLContext) => {
        console.log("inside the sub sub sub");
        const { pubsub } = context;

        return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
      },
    },
  },
};

export const participantsPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: { id: true, username: true },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantsPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
