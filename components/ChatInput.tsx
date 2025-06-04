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
    <div className="mx-auto max-w-3xl w-full">
      <div className="bg-gradient-to-b from-[#121212] to-[#151515] border border-[#2a2a2a]/80 shadow-lg text-white rounded-xl backdrop-blur-sm">
        <form onSubmit={sendMessage} className="relative">
          <input
            className="bg-transparent px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#10a37f]/30 focus:border-[#10a37f] w-full disabled:cursor-not-allowed disabled:text-gray-600 text-sm pr-14 transition-all duration-200 rounded-xl"
            disabled={!session}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Message ChatAI..."
          />
          <button
            disabled={!prompt || !session}
            type="submit"
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${
              prompt && session
                ? "bg-gradient-to-br from-[#10a37f] to-[#0d8d6a] hover:from-[#0f9973] hover:to-[#0c7f60] shadow-md shadow-[#10a37f]/20"
                : "bg-[#1e1e1e] text-gray-500 cursor-not-allowed"
            } text-white p-2 rounded-lg transition-all duration-300 transform active:scale-95`}
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
        <div className="px-4 pb-3.5 pt-1.5 text-xs text-center text-gray-400 flex items-center justify-center">
          <svg className="h-3 w-3 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ChatAI may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
