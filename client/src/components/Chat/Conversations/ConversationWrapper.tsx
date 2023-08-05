import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";
import { useQuery } from "@apollo/client";
import ConversationOperations from "../../../graphql/operations/conversation";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationWrapper = ({ session }: ConversationWrapperProps) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
  } = useQuery(ConversationOperations.Queries.conversations);

  console.log("here is data", conversationData);

  return (
    <div className={"w-full md:w-[32rem] bg-neutral-focus py-6 px-3"}>
      <ConversationList session={session} />
    </div>
  );
};

export default ConversationWrapper;
