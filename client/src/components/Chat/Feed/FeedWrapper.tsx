import { Session } from "next-auth";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  session: Session;
}

const FeedWrapper = ({ session }: Props) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <div className=" hidden w-full flex-col md:w-[32rem] md:flex">
      Feed Wrapper
    </div>
  );
};

export default FeedWrapper;
