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
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div></div>
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>
      <div>
        {session && (
          <div className="flex items-center mr-auto space-x-3 bg-[#343541] rounded-3xl py-1 px-1 w-[9rem]">
            <img
              src={session.user?.image!}
              alt="Profile picture"
              className="h-10 w-10 rounded-full"
            />
            <p
              className="text-white cursor-pointer hover:text-gray-300"
              onClick={() => signOut()}
            >
              Sign Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
