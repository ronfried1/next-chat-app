import { gql } from "graphql-tag";
// import { GraphQLError } from "graphql";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }
  type CreateConversationResponse {
    conversationId: String
  }

  type Conversation {
    id: String
    # latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type Participant{
    id: String
    user: User 
    hasSeenLatestMessage: Boolean
  }

  type Query {
    conversations: [Conversation]
  }
`;

export default typeDefs;
