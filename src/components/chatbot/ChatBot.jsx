import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// Componente messaggio ottimizzato
const Message = React.memo(({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`flex items-start space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-[#13E8E9]/20' : 'bg-white/10'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-[#13E8E9]" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className={`p-3 rounded-lg ${
        isUser 
          ? 'bg-[#13E8E9]/10 text-white border border-[#13E8E9]/30' 
          : 'bg-white/10 text-white border border-white/20'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  </div>
));

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Ciao! 👋 Sono l'assistente di Creditly Global. Come posso aiutarti con i tuoi crediti fiscali?",
      isUser: false,
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Aggiungi messaggio utente
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const { data } = await chatbot({
        message: userMessage,
        conversation: messages.slice(1).map(m => ({
          role: m.isUser ? "user" : "assistant",
          content: m.text
        }))
      });

      if (data?.response) {
        setMessages(prev => [...prev, { text: data.response, isUser: false }]);
      } else {
        throw new Error("Risposta non valida dal server");
      }
    } catch (error) {
      console.error("Errore chatbot:", error);
      setMessages(prev => [...prev, {
        text: "Mi dispiace, al momento non riesco a rispondere. Riprova più tardi o contatta il supporto direttamente. 😅",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Apri chat assistente"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] bg-[#2c2e43]/95 border-[#13E8E9]/30 shadow-2xl backdrop-blur-sm flex flex-col">
          {/* Header ottimizzato */}
          <div className="flex items-center justify-between p-4 border-b border-[#13E8E9]/30 bg-[#13E8E9]/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#13E8E9]/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#13E8E9]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Assistente Creditly</h3>
                <p className="text-xs text-white/70">Online ora</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages ottimizzate */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <Message 
                key={index}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input ottimizzato */}
          <div className="p-4 border-t border-[#13E8E9]/30">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrivi un messaggio..."
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#13E8E9]/50 focus:ring-1 focus:ring-[#13E8E9]/50"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}