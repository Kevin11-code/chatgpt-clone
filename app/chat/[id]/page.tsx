"use client";

import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.id as string || '';
  
  return (
    <div className="flex flex-col h-screen p-2 overflow-hidden">
      <Chat chatId={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  );
}
