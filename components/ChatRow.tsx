import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };  // Extract the first line of the last message or use default text
  const chatTitle = messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat";
  const truncatedTitle = chatTitle.split('\n')[0].substring(0, 30) + (chatTitle.length > 30 ? '...' : '');
  
  return (
    <Link
      href={`/chat/${id}`}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 ${
        active 
          ? "bg-gradient-to-r from-[#10a37f]/20 to-[#10a37f]/5 border-l-2 border-l-[#10a37f] text-white" 
          : "hover:bg-[#1a1a1a] text-gray-300 hover:text-white"
      }`}
    >
      <div className="flex items-center space-x-2 overflow-hidden">
        <div className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md ${
          active ? "bg-[#10a37f]/20 text-[#10a37f]" : "bg-[#1e1e1e] text-gray-400 group-hover:text-gray-200"
        }`}>
          <ChatBubbleLeftIcon className="h-4 w-4" />
        </div>
        <p className="flex-1 truncate text-xs">
          {truncatedTitle}
        </p>
      </div>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          removeChat();
        }}
        className={`ml-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
          active ? "hover:bg-red-500/20" : "hover:bg-[#2a2a2a]"
        }`}
      >
        <TrashIcon className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
      </button>
    </Link>
  );
}

export default ChatRow;
