import React from "react";
import { SearchedUser } from "@/utils/types";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: SearchedUser[];
  removeParticipants: (userId: string) => void;
}

const Participants = ({
  participants,
  removeParticipants,
}: ParticipantsProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="flex gap-2 items-center rounded p-2 bg-base-200"
        >
          <div className="text">{participant.username}</div>
          <IoIosCloseCircleOutline
            size={20}
            cursor={"pointer"}
            onClick={(e) => {
              e.preventDefault();
              removeParticipants(participant.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Participants;
