import { Session } from "next-auth";
import React, { useRef, useState } from "react";
import ConversationModal from "./Modal/Modal";
import { ConversationPopulated } from "../../../../../server/src/util/types";
import conversation from "@/graphql/operations/conversation";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  session: Session;
  conversations: ConversationPopulated[];
}

const ConversationList = ({
  session,
  conversations,
}: ConversationListProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className={"flex w-full flex-col"}>
      <div
        className={
          "flex w-full py-2 px-4 mb-4 rounded bg-base-200 cursor-pointer "
        }
        onClick={handleToggleModal}
      >
        <text className={"w-full  text-center font-bold"}>
          Find or Start a conversation
        </text>
      </div>
      <ConversationModal
        session={session}
        isOpen={isModalOpen}
        onToggleModal={handleToggleModal}
      />
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
