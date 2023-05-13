import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import UserOparation from "../../../../graphql/operations/users";
import ConversationOparation from "../../../../graphql/operations/converation";
import React, { useState } from "react";
import {
  SearchUsersInput,
  SearchUsersData,
  SearchedUser,
  CreateConversationData,
} from "@/util/typs";
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

type ModalProps = {
  session: Session;
  text: string;
};

const ConversationModalModal = ({ session, text }: ModalProps) => {
  const {
    user: { id: userId },
  } = session;
  const [username, setUserName] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOparation.Queries.searchUsers);

  const [createConversation, { loading: createConverstionLoading }] =
    useMutation<CreateConversationData, { participantIds: Array<string> }>(
      ConversationOparation.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      console.log("here is data", data);
    } catch (error: any) {
      console.log("onCreateConversation error", error);
      toast.error(error?.message);
    }
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUserName("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my-modal-3"
        className="cursor-pointer card-title justify-center"
      >
        {text}
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative max-w-sm">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create a Conversation</h3>
          <div className="py-4">
            <form className="form-control" onSubmit={onSearch}>
              <label className="input-group input-group-vertical">
                <input
                  type="text"
                  placeholder="Enter a username"
                  className="input input-bordered"
                  value={username}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <button
                  className={`btn mt-3 p-3 ${loading ? "loading" : ""}`}
                  disabled={!username}
                >
                  Search
                </button>
              </label>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                addParticipant={addParticipant}
                users={data.searchUsers}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <div
                  className={`btn w-full mt-4 ${
                    createConverstionLoading ? "loading" : ""
                  }`}
                  onClick={onCreateConversation}
                >
                  Create Conversation
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationModalModal;
