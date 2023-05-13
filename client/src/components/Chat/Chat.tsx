import { signOut } from "next-auth/react";
import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <div className="flex h-screen">
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
      {/* <button onClick={() => signOut()}>Logout</button> */}
    </div>
  );
};

export default Chat;
