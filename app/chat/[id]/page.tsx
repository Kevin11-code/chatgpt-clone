"use client";

import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.id as string || '';    return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={chatId} />
      <div className="pb-4 pt-2 relative flex justify-center">
        <div className="w-full max-w-3xl">
          <ChatInput chatId={chatId} />
        </div>
      </div>
    </div>
  );
}
