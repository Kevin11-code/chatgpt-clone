"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  return (
    <div className=" p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="space-y-2 h-[88vh] overflow-y-auto scrollbar-hide">
          <NewChat />
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      <div className="">
        {session && (
          <div
            className=" flex items-center my-2 space-x-3 cursor-pointer bg-[#343541] hover:bg-[#3495] rounded-3xl justify-center py-2 px-1 w-full"
            onClick={() => signOut()}
          >
            <img
              src={session.user?.image!}
              alt="Profile picture"
              className="h-8 w-8 rounded-full"
            />
            <p className="text-white text-md font-semibold">Sign Out</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
