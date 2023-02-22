import type { NextPage, NextPageContext } from "next";
import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";
const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log("here is data", session);

  const reloadSession = () => {};

  return (
    // flex justify-center items-center h-screen
    <div className="container">
      {session?.user.username ? (
        <Chat />
      ) : (
        <div className=" flex items-center justify-center h-screen">
          <Auth session={session} reloadSession={reloadSession} />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
0;
