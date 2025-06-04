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
    <button
      onClick={createNewChat}
      className="bg-gradient-to-br from-[#10a37f] to-[#0e8e6d] hover:from-[#0f9973] hover:to-[#0c7f60] rounded-lg px-4 py-3 text-sm flex items-center justify-center space-x-2.5 cursor-pointer text-white transition-all duration-300 ease-out shadow-md shadow-[#10a37f]/10 w-full active:scale-95 transform"
    >
      <PlusIcon className="h-4 w-4" />
      <span className="font-medium">New Chat</span>
    </button>
  );
}

export default NewChat;
