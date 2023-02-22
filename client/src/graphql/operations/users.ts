import { gql } from "@apollo/client";

export default {
  Queries: {},
  Mutations: {
    createUsername: gql`
      mutation CreatUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
