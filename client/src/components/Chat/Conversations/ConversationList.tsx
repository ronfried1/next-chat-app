// tsrsfc

import { Session } from "next-auth";
import ConversationModal from "./Modal/Modal";
import * as React from "react";

interface ConversationListProps {
  session: Session;
}

const ConversationList = ({ session }: ConversationListProps): JSX.Element => {
  return (
    <div className="card w-full bg-base-100">
      <div
        className=" justify-center py-2 px-4  rounded-md "
        onClick={() => {}}
      >
        <ConversationModal
          session={session}
          text="Find or start a conversation"
        />
      </div>
    </div>
  );
};

export default ConversationList;
