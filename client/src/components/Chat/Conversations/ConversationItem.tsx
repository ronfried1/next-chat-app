import React from "react";
import { ConversationPopulated } from "../../../../../server/src/util/types";

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const ConversationItem = ({ conversation }: ConversationItemProps) => {
  return (
    <div className={"p-4 rounded hover:bg-neutral"}>
      {conversation.id}
    </div>
  );
};

export default ConversationItem;
