"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import useSWR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const { data: model } = useSWR("model", {
    fallbackData: "gemini-2.0-flash",
  });
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    // Create a custom event to trigger scrolling in the chat component
    const scrollEvent = new CustomEvent('chatMessageSent');
    window.dispatchEvent(scrollEvent);

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
  };  return (
    <div className="mx-auto max-w-3xl w-full mb-4">
      <div className="bg-[#121212] border border-[#2a2a2a] shadow-lg text-white rounded-xl">
        <form onSubmit={sendMessage} className="relative">
          <input
            className="bg-transparent px-4 py-3.5 focus:outline-none w-full disabled:cursor-not-allowed disabled:text-gray-600 text-sm pr-14"
            disabled={!session}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Message ChatAI..."
          />
          <button
            disabled={!prompt || !session}
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              prompt && session
                ? "bg-[#10a37f] hover:bg-[#0e8e6d]"
                : "bg-[#1e1e1e] text-gray-500 cursor-not-allowed"
            } text-white p-2 rounded-lg transition-all duration-200`}
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
        <div className="px-3 pb-3 pt-1 text-xs text-center text-gray-500">
          ChatAI may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
