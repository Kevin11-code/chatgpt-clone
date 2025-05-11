import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };  return (
    <div
      onClick={createNewChat}
      className="border border-[#2a2a2a] rounded-md px-3 py-2.5 text-xs flex items-center justify-center space-x-2 hover:bg-[#1e1e1e] cursor-pointer text-white transition-all duration-200 ease-out mb-2 w-full"
    >
      <PlusIcon className="h-3.5 w-3.5" />
      <p className="text-xs">New Chat</p>
    </div>
  );
}

export default NewChat;
