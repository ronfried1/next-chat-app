import { SearchedUser } from "@/utils/types";
import React from "react";

type UserSearchListProps = {
  users: Array<SearchedUser>;
  addParticipants: (user: SearchedUser) => void;
};

const UserSearchList = ({ users, addParticipants }: UserSearchListProps) => {
  return (
    <>
      {users.length === 0 ? (
        <div className={"w-full  text-center "}>No users found</div>
      ) : (
        <div className={"join join-vertical justify-center mt-6"}>
          {users.map((user) => (
            <div
              key={user.id}
              className={
                "flex align-center gap-4 py-2 px-4 rounded hover:bg-base-200  "
              }
            >
              <div className={"flex items-center"}>
                <div className={"avatar placeholder"}>
                  <div className={"w-8 rounded-full bg-base-300 w-full"}>
                    <span className={"text-lg"}>
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className={"flex w-full justify-between"}>
                <div className={"flex items-center"}>{user.username}</div>
                <button
                  className={"btn  btn-accent btn-md"}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("after e pre");
                    
                    addParticipants(user);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserSearchList;
