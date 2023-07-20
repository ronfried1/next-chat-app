import { Session } from "next-auth";
import React, { useRef } from "react";
import ConversationModal from "./Modal/Modal";

interface ConversationListProps {
  session: Session;
}

const ConversationList = ({ session }: ConversationListProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleToggleModal = () => {
    const ref = modalRef.current;
    if (ref) {
      ref.open ? ref.close() : ref.showModal();
    }
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
      <ConversationModal session={session} ref={modalRef} />
    </div>
  );
};

export default ConversationList;
