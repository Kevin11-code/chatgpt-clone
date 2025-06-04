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
      // Access the parent scroll container
      const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
      if (!scrollContainer) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer as HTMLElement;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setShowScrollButton(!isNearBottom);
      
      // Auto-scroll only if user is already near the bottom
      if (isNearBottom) {
        scrollToBottom();
      }
    };
      checkShouldScroll();
    
    // Add scroll event listener to show/hide scroll button
    const scrollContainer = document.querySelector('.flex-1.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkShouldScroll);
      return () => scrollContainer.removeEventListener('scroll', checkShouldScroll);
    }
  }, [messages]);
    // Listen for message sent event from ChatInput
  useEffect(() => {
    const handleMessageSent = () => {
      // Add slight delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    };
    
    window.addEventListener('chatMessageSent', handleMessageSent);
    return () => window.removeEventListener('chatMessageSent', handleMessageSent);}, []);return (
    <div className="h-full pt-4 pb-52">
      {messages?.empty && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-xl border border-slate-700/20 max-w-md mx-auto">
            <h3 className="text-center text-white text-lg font-medium mb-3">
              Welcome to ChatAI
            </h3>
            <p className="text-center text-slate-300 text-sm mb-6">
              Type a prompt below to start a conversation with ChatAI.
            </p>
            <div className="flex justify-center">
              <ArrowDownCircleIcon className="h-8 w-8 text-emerald-500 animate-bounce" />
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-3xl mx-auto">
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
        ))}
        {/* This empty div serves as our scroll target */}
        <div ref={messagesEndRef} className="h-24 mb-4" />
      </div>
        {/* Scroll to bottom button - appears when not at bottom */}
      {showScrollButton && messages?.docs && messages.docs.length > 2 && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-48 right-6 bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full shadow-lg transition-all duration-200 z-10 border border-slate-600 group"
          aria-label="Scroll to bottom"
        >
          <ArrowDownCircleIcon className="h-5 w-5 text-slate-200 group-hover:text-white" />
        </button>
      )}
    </div>
  );
}

export default Chat;
