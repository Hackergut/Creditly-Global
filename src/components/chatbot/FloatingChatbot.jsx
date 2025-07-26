
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatbot } from '@/api/functions';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Loader2
} from 'lucide-react';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [suggestedFAQs, setSuggestedFAQs] = useState([]);
  const [showQuickFAQs, setShowQuickFAQs] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick FAQ buttons per avvio rapido
  const quickFAQs = [
    {
      icon: "💰",
      question: "Come posso richiedere un credito?",
      category: "Crediti"
    },
    {
      icon: "⏱️",
      question: "Quali sono i tempi di approvazione?",
      category: "Tempi"
    },
    {
      icon: "📋",
      question: "Quali documenti sono necessari?",
      category: "Documenti"
    },
    {
      icon: "🏠",
      question: "Cos'è il Superbonus 110%?",
      category: "Superbonus"
    },
    {
      icon: "🤖",
      question: "Come funziona il Credito d'Imposta 4.0?",
      category: "Industria 4.0"
    },
    {
      icon: "📊",
      question: "Cosa sono i crediti IVA?",
      category: "IVA"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, suggestedFAQs, showQuickFAQs]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);
    setSuggestedFAQs([]);
    setShowQuickFAQs(false); // Hide quick FAQs after first message

    // Add user message to conversation
    const newConversation = [...conversation, { role: 'user', content: userMessage }];
    setConversation(newConversation);

    try {
      const response = await chatbot({
        message: userMessage,
        conversation: conversation
      });

      if (response.data) {
        setConversation(response.data.conversation || [...newConversation, { role: 'assistant', content: response.data.response }]);

        // Set suggested FAQs if available
        if (response.data.suggestedFAQs && response.data.suggestedFAQs.length > 0) {
          setSuggestedFAQs(response.data.suggestedFAQs);
        }

        // Show notification if chat is closed
        if (!isOpen) {
          setHasNewMessage(true);
        }
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setConversation([...newConversation, {
        role: 'assistant',
        content: 'Mi dispiace, al momento non riesco a rispondere. Puoi provare a riformulare la domanda o contattare il supporto direttamente. 😅'
      }]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFAQClick = (faqQuestion) => {
    setMessage(faqQuestion);
    setSuggestedFAQs([]); // Clear suggestions after one is clicked
    setShowQuickFAQs(false);
    // Auto-send the FAQ question
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleQuickFAQClick = (faqQuestion) => {
    setMessage(faqQuestion);
    setShowQuickFAQs(false);
    inputRef.current?.focus(); // Focus input field after setting message
  };

  const openChat = () => {
    setIsOpen(true);
    setHasNewMessage(false);

    // Welcome message if first time opening
    if (conversation.length === 0) {
      setConversation([{
        role: 'assistant',
        content: 'Ciao! 👋 Sono l\'assistente AI di Creditly Global. Posso aiutarti con domande sui crediti fiscali, procedure di richiesta e tutto quello che riguarda la nostra piattaforma. \n\nScegli una domanda rapida qui sotto o scrivi la tua domanda personalizzata! 😊'
      }]);
      setShowQuickFAQs(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={openChat}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#13E8E9] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#13E8E9] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isMinimized ? 'bottom-6 right-6 w-80 h-16' : 
          // Responsive sizing: mobile vs desktop
          'bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 w-full max-w-sm mx-auto sm:mx-0 h-[85vh] sm:h-[600px]'
        }`}>
          <Card className="w-full h-full backdrop-filter backdrop-blur-12px bg-slate-800/95 border-2 border-slate-700/60 shadow-2xl">
            {/* Chat Header */}
            <CardHeader className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-[#13E8E9]/20 to-[#0ea5e9]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[#13E8E9] text-slate-900">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-sm">Assistente AI</CardTitle>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChat}
                    className="w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Chat Messages - Responsive height */}
                <CardContent className="p-0 overflow-hidden" style={{ height: 'calc(100% - 140px)' }}>
                  <div className="h-full overflow-y-auto p-4 space-y-4">
                    {conversation.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                          msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            {msg.role === 'user' ? (
                              <AvatarFallback className="bg-slate-600 text-white">
                                <User className="w-3 h-3" />
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-[#13E8E9] text-slate-900">
                                <Bot className="w-3 h-3" />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div
                            className={`p-3 rounded-2xl text-sm leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-[#13E8E9] text-slate-900'
                                : 'bg-slate-700/50 text-white border border-slate-600/50'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Quick FAQ Buttons - Responsive grid */}
                    {showQuickFAQs && conversation.length <= 1 && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2 max-w-[95%] sm:max-w-[90%]">
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            <AvatarFallback className="bg-[#13E8E9] text-slate-900">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="bg-slate-700/50 text-white border border-slate-600/50 p-3 rounded-2xl text-sm">
                              🚀 Domande Frequenti - Clicca per iniziare:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {quickFAQs.map((faq, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuickFAQClick(faq.question)}
                                  className="text-left justify-start text-xs p-2 h-auto whitespace-normal bg-slate-700/20 border-slate-600/50 text-slate-300 hover:bg-slate-700/40 hover:text-white hover:border-[#13E8E9]/50 transition-all duration-200"
                                >
                                  <div className="flex flex-col items-start w-full">
                                    <div className="flex items-center space-x-1 mb-1">
                                      <span>{faq.icon}</span>
                                      <span className="text-xs font-medium text-[#13E8E9]">{faq.category}</span>
                                    </div>
                                    <span className="text-xs leading-tight">{faq.question}</span>
                                  </div>
                                </Button>
                              ))}
                            </div>
                            <div className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowQuickFAQs(false)}
                                className="text-xs text-slate-400 hover:text-slate-300 hover:bg-transparent"
                              >
                                Nascondi domande rapide
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Suggested FAQs from AI Response */}
                    {suggestedFAQs.length > 0 && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2 max-w-[90%] sm:max-w-[85%]">
                          <Avatar className="w-6 h-6 flex-shrink-0">
                            <AvatarFallback className="bg-[#13E8E9] text-slate-900">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div className="bg-slate-700/50 text-white border border-slate-600/50 p-3 rounded-2xl text-sm">
                              💡 Domande correlate che potrebbero interessarti:
                            </div>
                            {suggestedFAQs.map((faq, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleFAQClick(faq)}
                                className="w-full text-left justify-start text-xs p-2 h-auto whitespace-normal bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-[#13E8E9]/50"
                              >
                                💡 {faq}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {loading && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-[#13E8E9] text-slate-900">
                              <Bot className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-slate-700/50 text-white border border-slate-600/50 p-3 rounded-2xl">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Chat Input - Mobile optimized */}
                <div className="p-3 sm:p-4 border-t border-slate-700/50">
                  <div className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Scrivi la tua domanda..."
                      className="flex-1 bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-[#13E8E9]/50 h-10 sm:h-12 text-sm"
                      disabled={loading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || loading}
                      className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-slate-900 px-3 sm:px-4 h-10 sm:h-12"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Assistente AI specializzato in crediti fiscali
                    </div>
                    {!showQuickFAQs && conversation.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowQuickFAQs(true)}
                        className="text-xs text-slate-400 hover:text-slate-300 hover:bg-transparent p-1"
                      >
                        🚀 FAQ
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
