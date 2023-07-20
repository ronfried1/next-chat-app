import ConversationWrapper from "./Conversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <div className={"columns-3 flex w-full h-full"}>
      <ConversationWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
};

export default Chat;
