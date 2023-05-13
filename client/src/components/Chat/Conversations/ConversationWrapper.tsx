import { Session } from "next-auth";
import React from "react";
import ConversationList from "./ConversationList";

type ConversationWrapperProps = {
  session: Session;
};

const ConversationWrapper = ({ session }: ConversationWrapperProps) => {
  return (
    <div className=" w-full  py-6 px-3 md:w-96  bg-base-200">
      {/* Ske;etion Loader  */}
      <ConversationList session={session} />
    </div>
  );
};

export default ConversationWrapper;
