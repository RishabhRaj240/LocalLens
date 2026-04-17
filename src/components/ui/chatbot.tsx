"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{role: 'user'|'bot', content: string}[]>([
    { role: 'bot', content: 'Hi there! I am your LocalLens assistant. How can I help you find your next experience?' }
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const currentMessage = message;
    const newHistory = [...chatLog, { role: 'user' as const, content: currentMessage }];
    
    setChatLog(newHistory);
    setMessage("");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMessage, history: chatLog })
      });
      
      const data = await response.json();
      
      if (data.reply) {
         setChatLog([...newHistory, { role: 'bot', content: data.reply }]);
      } else {
         setChatLog([...newHistory, { role: 'bot', content: "Sorry, I encountered an error. Please check your API configuration." }]);
      }
    } catch (error) {
      console.error(error);
      setChatLog([...newHistory, { role: 'bot', content: "Failed to reach the AI server." }]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-teal text-white rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center justify-center p-4"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden border border-border flex flex-col h-[500px]"
          >
            <div className="bg-brand-charcoal pt-5 pb-4 px-6 flex justify-between items-center z-10 text-white">
              <div className="font-heading font-medium tracking-wide">Local Lens Assistant</div>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-amber transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto bg-muted/10 flex flex-col gap-4">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 max-w-[85%] rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-teal text-white rounded-tr-sm' : 'bg-white border border-border text-foreground rounded-tl-sm shadow-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-border flex items-center gap-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..." 
                className="flex-1 bg-muted/50 border-none rounded-xl px-4 py-3 outline-none text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-brand-teal"
              />
              <button 
                onClick={handleSend}
                className="p-3 bg-brand-charcoal text-white rounded-xl hover:bg-brand-charcoal/90 transition-colors"
               >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
