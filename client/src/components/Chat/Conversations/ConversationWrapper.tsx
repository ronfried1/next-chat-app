import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";

interface Props {
  session: Session;
}

const ConversationWrapper = ({ session }: Props) => {
  return (
    <div className={"w-full md:w-[32rem] bg-neutral-focus py-6 px-3"}>
      <ConversationList session={session} />
    </div>
  );
};

export default ConversationWrapper;
