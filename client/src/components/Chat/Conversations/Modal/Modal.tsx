import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import UserOperations from "../../../../graphql/operations/users";
import ConversationOperations from "../../../../graphql/operations/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
} from "@/utils/types";
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

interface ModalProps {
  session: Session;
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ session }, ref) => {
    const {
      user: { id: userId },
    } = session;

    const [username, setUsername] = useState("");
    const [participants, setParticipants] = useState<SearchedUser[]>([]);
    const [searchUsers, { data, error, loading }] = useLazyQuery<
      SearchUsersData,
      SearchUsersInput
    >(UserOperations.Queries.searchUsers);
    const [createConversation, { loading: createConversationLoading }] =
      useMutation<CreateConversationData, CreateConversationInput>(
        ConversationOperations.Mutations.createConversation
      );

    const onCreateConversation = async () => {
      const participantsIds = [userId, ...participants.map((p) => p.id)];
      try {
        const { data } = await createConversation({
          variables: { participantIds: participantsIds },
        });

        console.log("here is data", data);
      } catch (error: any) {
        console.log("onCreateConversation error, error");
        toast.error(error?.message);
      }
    };

    const onSearch = (event: React.FormEvent) => {
      event.preventDefault();
      searchUsers({ variables: { username } });
    };

    const addParticipants = (user: SearchedUser) => {
      setParticipants((prev) => [...prev, user]);
      setUsername("");
    };

    const removeParticipants = (userId: string) => {
      setParticipants((prev) => prev.filter((user) => user.id !== userId));
    };

    return (
      <dialog ref={ref} className={"modal"}>
        <form method={"dialog"} className={"modal-box"}>
          <button
            className={"btn btn-sm btn-circle btn-ghost absolute right-2 top-2"}
          >
            ✕
          </button>
          <div className={" w-full join join-vertical gap-4"}>
            <h3 className={"font-bold text-lg"}>Create a Conversation</h3>
            <input
              type={"text"}
              placeholder={"Enter a username"}
              className={"input input-bordered w-full "}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <button className={"btn"} disabled={!username} onClick={onSearch}>
              {loading && <span className="loading loading-spinner"></span>}
              Search
            </button>
            {data?.searchUsers && (
              <UserSearchList
                addParticipants={addParticipants}
                users={data.searchUsers}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                />
                <button
                  className={"btn btn-accent w-full mt-6"}
                  onClick={onCreateConversation}
                >
                  {createConversationLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Create Conversation
                </button>
              </>
            )}
          </div>
        </form>
      </dialog>
    );
  }
);

export default Modal;
