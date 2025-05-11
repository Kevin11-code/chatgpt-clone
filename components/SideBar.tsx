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
    <div className="p-3 flex flex-col h-full">
      <div className="mb-1">
        <NewChat />
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
        
        {chats?.docs.length === 0 && !loading && (
          <div className="text-center text-gray-500 text-xs mt-4">
            No conversations yet
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
