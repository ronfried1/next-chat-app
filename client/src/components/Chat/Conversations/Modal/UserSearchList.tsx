import { SearchedUser } from "@/util/typs";
import React from "react";

type UserSearchListProps = {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
};

const UserSearchList = ({ users, addParticipant }: UserSearchListProps) => {
  console.log("users is", users);

  return (
    <>
      {users.length === 0 ? (
        <div className="flex justify-center mt-6">
          <div>No users found</div>
        </div>
      ) : (
        <div className=" mt-8 hover:hero-overlay rounded-md">
          {users.map((user) => (
            <div
              className="flex flex-row items-center py-2 px-4 space-x-4 "
              key={user.id}
            >
              <div className="avatar">
                <div className="w-8 rounded-full ">
                  <img src={user?.image} alt={user.username} />
                  {/* <img
                    src={user?.image}
                    alt={`https://lh3.googleusercontent.com/a/AGNmyxbPI_ItRJgSd5JlsyMy-zNjXJ0qCd1dp-cCvRg=s96-c`}
                  /> */}
                </div>
                {/* <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span className="text-xs">AA</span>
                </div> */}
              </div>
              <div className="flex justify-between grow">
                <div className="flex items-center"> {user.username}</div>
                <button className="btn" onClick={() => addParticipant(user)}>
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
