"use client";

import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.id as string || '';  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
        <Chat chatId={chatId} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-20 flex justify-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent">
        <div className="w-full max-w-3xl px-4 transform transition-all duration-200">
          <ChatInput chatId={chatId} />
        </div>
      </div>
    </div>
  );
}
