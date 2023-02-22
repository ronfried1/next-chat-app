import { signOut } from "next-auth/react";

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div className="">
      Chat!
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Chat;
