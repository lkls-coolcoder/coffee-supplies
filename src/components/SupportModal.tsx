import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    {
      sender: 'agent',
      text: "Hello! Welcome to Artisanal Roast Co. B2B Roastery Support. How can I assist your cafe with blend customization, roast schedules, or delivery today?",
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let reply = "Our master roaster will calibrate your order. Would you like a direct phone call from our logistics desk?";
      if (userMsg.toLowerCase().includes('sample')) {
        reply = "You can request 3 x 250g complimentary sample bags from the 'Samples' button in the top menu!";
      } else if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('discount')) {
        reply = "Our bulk tiers start at 10kg (12% off) and 25kg+ (20% off). All discounts are calculated automatically at checkout.";
      }
      setMessages((prev) => [...prev, { sender: 'agent', text: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-6 shadow-2xl border border-black space-y-4 flex flex-col h-[520px] text-[#1A1A1A]">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-black">support_agent</span>
            <div>
              <h3 className="font-headline text-lg font-light uppercase tracking-wider">
                Roastery Specialist
              </h3>
              <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">● Specialist Online</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black p-1 cursor-pointer font-bold">
            ✕
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-gray-50 border border-gray-200 font-mono">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-gray-300'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="flex gap-2 flex-shrink-0">
          <input
            type="text"
            placeholder="Ask about roasts, shipping, or custom blends..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-gray-50 border border-gray-300 px-3 py-2 text-xs font-mono focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
