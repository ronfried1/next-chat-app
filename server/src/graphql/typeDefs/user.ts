// import { gql } from "apollo-server-core";
// import { GraphQLError } from "graphql";

const typeDefs = `#graphql
    type User {
        id: String
        username: String

    }
    type Query {
        searchUsers(username:String): [User]
    }
    type Mutation{
        createUsername(username:String!): CreatUsernameResponse
    }

    type CreatUsernameResponse {
        success: Boolean
        eror: String
    }
`;


export default typeDefs