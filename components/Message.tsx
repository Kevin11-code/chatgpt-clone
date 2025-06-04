import { DocumentData } from "firebase/firestore";
import React from "react";

type Props = { message: DocumentData };

function Message({ message }: Props) {
  const isChatAI = message.user.name === "ChatAI";
  
  const processMessageText = (text: string) => {
    if (!text) return [];
    
    // Split the text into blocks separated by empty lines
    const blocks = text.split(/\n{2,}/);
    
    return blocks.map((block, blockIndex) => {
      const lines = block.split('\n');
      
      // Check if this is a list block
      if (lines.every(line => line.trim().match(/^[\*\-•●■→]\s+.+/) || line.trim() === '')) {
        return (
          <ul key={blockIndex} className="my-3 space-y-1">
            {lines.map((line, i) => {
              if (line.trim() === '') return null;
              const listContent = line.trim().replace(/^[\*\-•●■→]\s+/, '');
              return (
        <li key={i} className="flex items-start text-white">
                  <span className="mr-2 inline-block">•</span>
                  <span className="text-white">{processFormattedText(listContent)}</span>
                </li>
              );
            })}
          </ul>
        );
      }
      
      // Check if this is a heading
      if (lines.length === 1) {
        // H1 style heading with # prefix
        if (lines[0].trim().match(/^#\s+.+/)) {
          const heading = lines[0].trim().replace(/^#\s+/, '');
          return <h2 key={blockIndex} className="text-lg font-bold mt-4 mb-2 text-white">{heading}</h2>;
        }
        
        // H2 style heading with ## prefix
        if (lines[0].trim().match(/^##\s+.+/)) {
          const heading = lines[0].trim().replace(/^##\s+/, '');
          return <h3 key={blockIndex} className="text-base font-bold mt-3 mb-2 text-white">{heading}</h3>;
        }
        
        // H3 style heading with ### prefix
        if (lines[0].trim().match(/^###\s+.+/)) {
          const heading = lines[0].trim().replace(/^###\s+/, '');
          return <h4 key={blockIndex} className="text-sm font-bold mt-3 mb-1 text-white">{heading}</h4>;
        }
        
        // Heading with surrounding ** markers
        if (lines[0].trim().startsWith('**') && lines[0].trim().endsWith('**')) {
          const heading = lines[0].trim().replace(/^\*\*|\*\*$/g, '');
          return <h3 key={blockIndex} className="text-base font-bold mt-3 mb-2 text-white">{heading}</h3>;
        }
      }
      
      // Check if this is a code block with ``` markers
      if (block.trim().startsWith('```') && block.trim().endsWith('```')) {
        const codeContent = block.trim().slice(3, -3).trim();
        return (          <pre key={blockIndex} className="bg-[#1e1e1e] p-3 rounded-md my-3 overflow-x-auto border border-[#333333]">
            <code className="text-sm text-white">{codeContent}</code>
          </pre>
        );
      }
        // Regular paragraph
      return (
        <div key={blockIndex} className="my-2">
          {lines.map((line, i) => {            if (line.trim() === '') return <br key={i} />;
            return (
              <p key={i} className="my-1 text-white !text-opacity-100">{processFormattedText(line)}</p>
            );
          })}
        </div>
      );
    });
  };
  
  // Process inline formatting (bold, code, etc.)
  const processFormattedText = (text: string) => {
    if (!text) return text;      // First handle code snippets with backticks
    const codeRegex = /`([^`]+)`/g;
    const textWithCodeProcessed = text.split(codeRegex);
    
    if (textWithCodeProcessed.length > 1) {
      return (
        <>
          {textWithCodeProcessed.map((part, i) => {
            // Every odd index is code
            if (i % 2 !== 0) {
              return <code key={i} className="bg-[#1e1e1e] px-1 py-0.5 rounded text-xs text-white font-medium">{part}</code>;
            }
            // Process bold in non-code parts
            return processBoldText(part, i);
          })}
        </>
      );
    }
    
    // If no code, just process bold
    return processBoldText(text, 0);
  };
  
  const processBoldText = (text: string, key: number) => {
    if (!text.includes('**')) return text;
    
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts = text.split(boldRegex);
    
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, i) => {
            // Every odd index is bold
            if (i % 2 !== 0) {
              return <strong key={`${key}-${i}`} className="font-bold">{part}</strong>;
            }
            return <span key={`${key}-${i}`}>{part}</span>;
          })}
        </>
      );
    }
    
    return text;
  };
  return (
    <div
      className={`${
        isChatAI 
          ? "bg-[#0c0c0c] border-b border-[#1a1a1a]" 
          : "bg-[#080808]"
      } transition-colors duration-200`}
    >
      <div className="py-6 sm:py-8 max-w-3xl mx-auto px-4 md:px-8 group">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-5 mt-1">
            {isChatAI ? (
              <div className="h-9 w-9 bg-gradient-to-br from-[#10a37f] to-[#0e8e6d] rounded-md flex items-center justify-center text-white shadow-lg shadow-[#10a37f]/10">
                <svg width="20" height="20" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849Z" fill="currentColor"></path>
                </svg>
              </div>
            ) : (
              <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-[#1e1e1e] shadow-lg">
                <img src={message.user.avatar} alt="avatar" className="h-full w-full object-cover" />
              </div>
            )}
          </div>            <div className="flex-grow max-w-full">
            <div className="flex items-center mb-1.5">
              <span className="text-sm font-medium text-white">
                {isChatAI ? "ChatAI" : message.user.name}
              </span>
            </div>              <div className="text-white text-sm leading-relaxed whitespace-pre-wrap [&_*]:!text-white !text-opacity-100 font-normal">
              {processMessageText(message.text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
