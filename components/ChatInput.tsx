"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const model = "text-davinci-003";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}` ||
          "/favicon.svg",
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //Toast Notification to say Loading
    const notification = toast.loading("ChatAI is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //Toast Notification to say Successful
      toast.success("ChatAI has responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm mb-3">
      <form onSubmit={sendMessage} className="px-5 py-2 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-gray-900 hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div></div>
    </div>
  );
}

export default ChatInput;
