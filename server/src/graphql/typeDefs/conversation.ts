import { gql } from "graphql-tag";
// import { GraphQLError } from "graphql";

const typeDefs = gql`
  scaler Date

  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }
  type CreateConversationResponse {
    conversationId: String
  }

  type Conversation {
    id: String
    # latestMessage: message
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
    conversations: [conversation]
  }
`;

export default typeDefs;
