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
  };  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-between ${active ? "bg-[#1e1e1e] text-white" : "hover:bg-[#1e1e1e] text-gray-300"}`}
    >
      <ChatBubbleLeftIcon className="h-4 w-4 flex-shrink-0" />
      <p className="flex-1 hidden md:inline-flex truncate text-xs">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={(e) => {
          e.preventDefault();
          removeChat();
        }}
        className="h-4 w-4 text-gray-500 hover:text-red-500 flex-shrink-0"
      />
    </Link>
  );
}

export default ChatRow;
