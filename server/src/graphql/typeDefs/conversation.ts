import { gql } from "graphql-tag";
// import { GraphQLError } from "graphql";

const typeDefs = gql`
  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }
  type CreateConversationResponse {
    conversationId: String
  }
`;

export default typeDefs;
