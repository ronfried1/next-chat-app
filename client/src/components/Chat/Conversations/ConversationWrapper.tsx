import { Session } from "next-auth";
import React, { useEffect } from "react";
import ConversationList from "./ConversationList";
import { useQuery } from "@apollo/client";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationData } from "@/utils/types";
import { ConversationPopulated } from "../../../../../server/src/util/types";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationWrapper = ({ session }: ConversationWrapperProps) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    subscribeToMore,
  } = useQuery<ConversationData>(ConversationOperations.Queries.conversations);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
console.log("before the if statment");

        if (!subscriptionData.data) return prev;
console.log("ballls",  subscriptionData.data);
console.log("ballls",  prev.conversations);

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  //Execute subscription on mount
  useEffect(() => {
    subscribeToNewConversations();
    console.log("after all");
  }, []);

  return (
    <div className={"w-full md:w-[32rem] bg-neutral-focus py-6 px-3"}>
      <ConversationList
        session={session}
        conversations={conversationData?.conversations || []}
      />
    </div>
  );
};

export default ConversationWrapper;


// {"_id":{"$oid":"64b560488775d6a419fa8f3a"},"userId":{"$oid":"64b560478775d6a419fa8f39"},"type":"oauth","provider":"google","providerAccountId":"112257237352744815396","access_token":"ya29.a0AbVbY6Pvx--r81IC_ScHuCAlGhbCCkRG5xZUhuca5mRB1edozoZwYjexoAGqELe8K9jdzCCSqrfjFzQ20WIjwmgcqR_dqBrS6q805oukcd-MKcIIp9tbaZuAtK1l2ucTavdGeNdR8kF2vQmeQiVb2hzgXnGkaCgYKAXMSARISFQFWKvPlVbjHX4Fz6bdFQDhg8JzUxQ0163","expires_at":{"$numberLong":"1689611861"},"token_type":"Bearer","scope":"openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3NmRhOWQzMTJjMzlhNDI5OTMyZjU0M2U2YzFiNmU2NTEyZTQ5ODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NjAzNDU0MzYzMDAtMTVsbTZhZThkNmNzcjRnazdydjZlNGs5bWJ0MW5xZXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NjAzNDU0MzYzMDAtMTVsbTZhZThkNmNzcjRnazdydjZlNGs5bWJ0MW5xZXEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTIyNTcyMzczNTI3NDQ4MTUzOTYiLCJlbWFpbCI6InVzYW5kdXMxNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImIzcG5zaXl5TldXX2VGdVFSTmszcUEiLCJuYW1lIjoiUm9uIFlleiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRmcWE0Z05GdkZZSFhaV3NhVGNtUlJuQVBvTGVmaFFmaGEyZlVIQ2FQTT1zOTYtYyIsImdpdmVuX25hbWUiOiJSb24iLCJmYW1pbHlfbmFtZSI6IllleiIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjg5NjA4MjYzLCJleHAiOjE2ODk2MTE4NjN9.O_HnPDNsrJVVcyPN2J_Fb62VtD4NCJOBCNQrEq2Ea3ooQ6TNxuQ9j04nvY6jOpcBqTlMn-hccekBMJ4WnMPGuy03DkmFG4okBvRIshsBWFZ8gHdRrLfb-2NiXwgE-yh6Rru6bo19g7sC2SmnDFoXH1lOD6qkBGyj8XPCsy52SqKygVRHkzRFdmXn4MvlLU1wzcSzG7ciGFewYdBVI75Ox29xnADbrwsyjyGHsL_hsyikhEydCyDQ0RZgw69YBPY-WUb9fYSF13Abmm1bB2Y6eduauqW3mcIwX-lKqiWgkXfCYSzvmTzmsfjoGCAAMGVE1o890adzlunGZTVTHptY7g"}

// {"_id":{"$oid":"640877794293582f36acf379"},"name":"Ron Fried","email":"ron.fried15@gmail.com","emailVerified":null,"image":"https://lh3.googleusercontent.com/a/AGNmyxYMB0Yq1p35HK7bAaIi3DPflsQCHXLDhVaJCls=s96-c","username":"ronf"}