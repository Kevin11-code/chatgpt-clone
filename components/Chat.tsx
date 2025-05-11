"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  
  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
    // Check if we should auto-scroll or show scroll button
  useEffect(() => {
    const checkShouldScroll = () => {
      if (!chatContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setShowScrollButton(!isNearBottom);
      
      // Auto-scroll only if user is already near the bottom
      if (isNearBottom) {
        scrollToBottom();
      }
    };
    
    checkShouldScroll();
    
    // Add scroll event listener to show/hide scroll button
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkShouldScroll);
      return () => container.removeEventListener('scroll', checkShouldScroll);
    }
  }, [messages]);
  
  // Listen for message sent event from ChatInput
  useEffect(() => {
    const handleMessageSent = () => {
      scrollToBottom();
    };
    
    window.addEventListener('chatMessageSent', handleMessageSent);
    return () => window.removeEventListener('chatMessageSent', handleMessageSent);
  }, []);return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pt-4 pb-24">
      {messages?.empty && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-white text-lg mb-3">
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-8 w-8 mx-auto text-gray-400 animate-bounce" />
        </div>
      )}<div className="max-w-3xl mx-auto px-4">
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))}
        {/* This empty div serves as our scroll target */}
        <div ref={messagesEndRef} />
      </div>      {/* Scroll to bottom button - appears when not at bottom */}
      {showScrollButton && messages?.docs && messages.docs.length > 2 && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 bg-[#121212] hover:bg-[#1e1e1e] text-white p-2 rounded-full shadow-lg transition-opacity z-10"
        >
          <ArrowDownCircleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default Chat;
