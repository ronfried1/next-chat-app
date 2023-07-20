import { Session } from "next-auth";
import React from "react";

interface Props {
    session: Session
}

const FeedWrapper = ({session}: Props) => {
  return <div className="w-full md:w-[32rem]">Feed Wrapper</div>;
};

export default FeedWrapper;
