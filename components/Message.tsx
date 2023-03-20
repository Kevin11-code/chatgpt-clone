import { DocumentData } from "firebase/firestore";

type Props = { message: DocumentData };

function Message({ message }: Props) {
  const isChatAI = message.user.name === "ChatAI";

  return (
    <div
      className={`py-5 text-slate-300 ${
        isChatAI && "bg-cyan-900/10 text-[#eee9] tracking-[0.5px]"
      }`}
    >
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="avatar" className="h-8 w-8" />
        <p className="pt-1 text-md">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
