import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";
import { useQuery } from "@apollo/client";
import ConversationOperations from "../../../graphql/operations/conversation";
import { ConversationData } from "@/utils/types";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationWrapper = ({ session }: ConversationWrapperProps) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
  } = useQuery<ConversationData>(ConversationOperations.Queries.conversations);

  console.log("here is DATA", conversationData);

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
