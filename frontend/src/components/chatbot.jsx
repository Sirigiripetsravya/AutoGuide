import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { chatbot } from '@/lib/api';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const Chatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const chatMutation = useMutation({
    mutationFn: (message: string) => chatbot.sendMessage(message),
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: response.data.message,
          isUser: false,
        },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: message, isUser: true },
    ]);
    chatMutation.mutate(message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.isUser ? 'ml-auto text-right' : 'mr-auto'
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                msg.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="text-sm text-gray-500">AI is thinking...</div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" disabled={chatMutation.isPending}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};