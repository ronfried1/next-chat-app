import { SearchedUser } from "@/util/typs";
// import { IoMdCloseCircleOutline } from "react-icons/io";
import React from "react";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipant: (userId: string) => void;
}

const Participants = ({
  participants,
  removeParticipant,
}: ParticipantsProps) => {
  return (
    <>
      <div className="flex mt-8 gap-2 flex-wrap ">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className=" flex flex-row content-center justify-center gap-1 px-3 py-2 bg-neutral bg-opacity-50 rounded-md "
          >
            <p className="">{participant.username}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                removeParticipant(participant.username);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
};

export default Participants;
