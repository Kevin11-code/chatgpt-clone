"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
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
    <div className="p-4 flex flex-col h-full bg-[#080808]">
      <div className="mb-3">
        <NewChat />
      </div>
      
      {chats?.docs.length === 0 && !loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="bg-[#1a1a1a] rounded-xl p-5 w-full max-w-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
            <div className="h-12 w-12 bg-[#0c0c0c] rounded-full flex items-center justify-center mx-auto mb-3">
              <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-gray-400 text-xs mb-1">No conversations yet</p>
            <p className="text-gray-500 text-xs">Start a new chat to begin</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1.5 pr-1">
          <h2 className="text-xs uppercase text-gray-500 font-semibold mb-2 pl-2">Conversations</h2>
          {loading ? (
            <div className="space-y-2 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-[#1a1a1a] h-10 rounded-lg opacity-50"
                />
              ))}
            </div>
          ) : (
            chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SideBar;
