import { Session } from "next-auth";
import React, { useRef, useState } from "react";
import ForwardedModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
}

const ConversationList = ({ session }: ConversationListProps) => {
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
      <ForwardedModal
        session={session}
        isOpen={isModalOpen}
        onToggleModal={handleToggleModal}
      />
    </div>
  );
};

export default ConversationList;
