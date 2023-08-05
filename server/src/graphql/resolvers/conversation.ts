import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";
import { Prisma } from "@prisma/client";

const resolvers = {
  Query: {
    conversations: async (
      _: any,
      __: any,
      context: GraphQLContext
    ) => {
      console.log("conversation query");
    },
  },

  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { session, prisma } = context;
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

        return { conversationId: conversation.id };
      } catch (error: any) {
        console.log("createConversation error", error.message);
        throw new GraphQLError("Error creating conversation");
      }
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
