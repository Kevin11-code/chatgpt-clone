import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

function HomePage() {  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden px-4 text-white max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Welcome to ChatAI</h1>
        <p className="text-gray-400 text-sm mb-8">Your personal AI assistant powered by advanced language models</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-[#121212] p-6 rounded-xl shadow-lg border border-[#2a2a2a]">
          <div className="flex items-center mb-4">
            <div className="bg-[#10a37f] p-2 rounded-lg mr-3">
              <SunIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium">Examples</h2>
          </div>
          <div className="space-y-3 text-sm">
            <p className="bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors duration-200">"Explain quantum computing in simple terms"</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors duration-200">"What are the major advancements in AI since 2020?"</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors duration-200">"How do I create a data visualization dashboard in React?"</p>
          </div>
        </div>
        
        <div className="bg-[#121212] p-6 rounded-xl shadow-lg border border-[#2a2a2a]">
          <div className="flex items-center mb-4">
            <div className="bg-[#10a37f] p-2 rounded-lg mr-3">
              <BoltIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium">Capabilities</h2>
          </div>
          <div className="space-y-3 text-sm">
            <p className="bg-[#1e1e1e] p-3 rounded-lg">Remembers previous messages in your conversation</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg">Provides thoughtful, detailed responses to your queries</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg">Built on advanced language models for natural conversations</p>
          </div>
        </div>
        
        <div className="bg-[#121212] p-6 rounded-xl shadow-lg border border-[#2a2a2a]">
          <div className="flex items-center mb-4">
            <div className="bg-[#10a37f] p-2 rounded-lg mr-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-medium">Limitations</h2>
          </div>
          <div className="space-y-3 text-sm">
            <p className="bg-[#1e1e1e] p-3 rounded-lg">May occasionally generate incorrect information</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg">May produce harmful instructions or biased content</p>
            <p className="bg-[#1e1e1e] p-3 rounded-lg">Limited knowledge of world events after training cutoff</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
