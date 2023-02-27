import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import UserOperation from "../../graphql/operations/users";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/typs";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperation.Mutations.createUsername);

  console.log("here is Data", data, loading, error);

  const onSubmit = async () => {
    if (!username) return;
    try {
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-xl flex justify-center text-center">
      {session ? (
        <div className="card-body items-center text-center">
          <div className="card-title text-2xl content-center mb-8">
            Create a username
          </div>
          <input
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter a username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className="card-actions mt-3">
            <button className="btn" onClick={onSubmit}>
              Save
            </button>
            <button className="btn" onClick={() => signOut()}>
              out
            </button>
          </div>
        </div>
      ) : (
        <div className="card-body items-center text-center">
          <div className="card-title">MessengerQl </div>
          <div className="card-actions">
            <button
              type="button"
              // text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2
              className="btn"
              onClick={() => signIn("google")}
            >
              <img
                className="w-4 h-4 mr-2 -ml-1"
                src="/images/googlelogo.png"
              />
              {/* <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg> */}
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
