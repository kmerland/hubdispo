// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Clock, CheckCheck, Bot, User, ArrowLeft, Minimize2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLanguage } from "./LanguageProvider";

interface DirectChatSupportProps {
  onNavigate?: (view: string, params?: any) => void;
  initialTopic?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  senderName?: string;
}

export default function DirectChatSupport({ onNavigate, initialTopic }: DirectChatSupportProps) {
  const { language } = useLanguage();
  const getInitialMessages = () => {
    switch (language) {
      case 'en':
        return [
          {
            id: '1',
            content: 'Hello! I\'m your virtual assistant for hubdispo.be. How can I help you today?',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 60000),
            senderName: 'AI Assistant'
          },
          {
            id: '2',
            content: 'A human support agent will be available in 2 minutes for specialized questions.',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 50000),
            senderName: 'AI Assistant'
          }
        ];
      case 'nl':
        return [
          {
            id: '1',
            content: 'Hallo! Ik ben uw virtuele assistent voor hubdispo.be. Hoe kan ik u vandaag helpen?',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 60000),
            senderName: 'AI Assistent'
          },
          {
            id: '2',
            content: 'Een menselijke supportmedewerker zal over 2 minuten beschikbaar zijn voor gespecialiseerde vragen.',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 50000),
            senderName: 'AI Assistent'
          }
        ];
      default: // French
        return [
          {
            id: '1',
            content: 'Bonjour ! Je suis votre assistant virtuel hubdispo.be. Comment puis-je vous aider aujourd\'hui ?',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 60000),
            senderName: 'Assistant IA'
          },
          {
            id: '2',
            content: 'Un agent support humain sera disponible dans 2 minutes pour des questions spécialisées.',
            sender: 'bot' as const,
            timestamp: new Date(Date.now() - 50000),
            senderName: 'Assistant IA'
          }
        ];
    }
  };

  const [messages, setMessages] = useState<Message[]>(getInitialMessages());
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [supportAgentConnected, setSupportAgentConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simuler la connexion d'un agent support après 2 minutes
    const timer = setTimeout(() => {
      setSupportAgentConnected(true);
      const agentMessage = language === 'en' 
        ? 'Sophie from technical support has joined the conversation. How can I help you?'
        : language === 'nl'
        ? 'Sophie van technische ondersteuning heeft zich bij het gesprek aangesloten. Hoe kan ik u helpen?'
        : 'Sophie du support technique vient de se joindre à la conversation. Comment puis-je vous aider ?';
      
      const agentName = language === 'en' 
        ? 'Sophie - Support'
        : language === 'nl'
        ? 'Sophie - Ondersteuning'
        : 'Sophie - Support';
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: agentMessage,
        sender: 'support',
        timestamp: new Date(),
        senderName: agentName
      }]);
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simuler une réponse automatique
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: supportAgentConnected 
          ? "Je regarde votre question et vous réponds dans un instant..."
          : "Je comprends votre question. Voici quelques suggestions qui pourraient vous aider :",
        sender: supportAgentConnected ? 'support' : 'bot',
        timestamp: new Date(),
        senderName: supportAgentConnected ? 'Sophie - Support' : 'Assistant IA'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    "Je ne trouve pas comment créer un envoi",
    "Problème avec la consolidation",
    "Documents douaniers incorrects",
    "Suivi de mon colis",
    "Facturation et tarifs",
    "Problème technique"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStatus = (status?: string) => {
    switch (status) {
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case 'sent':
        return <CheckCheck className="h-4 w-4 text-gray-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
      {/* En-tête */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate?.('help')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au centre d'aide
        </Button>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* En-tête du chat */}
        <CardHeader className="border-b bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-[#1E40AF] text-white">
                    {supportAgentConnected ? 'S' : 'IA'}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-[#1E40AF]" />
                  Chat Support hubdispo.be
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  {supportAgentConnected ? 'Sophie - Support technique' : 'Assistant IA - 24h/24'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${isConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {isConnected ? 'En ligne' : 'Hors ligne'}
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender !== 'user' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className={`text-xs ${
                        message.sender === 'bot' ? 'bg-[#10B981] text-white' : 'bg-[#1E40AF] text-white'
                      }`}>
                        {message.sender === 'bot' ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-600">{message.senderName}</span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#1E40AF] text-white'
                      : message.sender === 'bot'
                      ? 'bg-[#10B981]/10 text-gray-800 border border-[#10B981]/20'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === 'user' && getMessageStatus(message.status)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%]">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className={`text-xs ${
                      supportAgentConnected ? 'bg-[#1E40AF] text-white' : 'bg-[#10B981] text-white'
                    }`}>
                      {supportAgentConnected ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">
                    {supportAgentConnected ? 'Sophie - Support' : 'Assistant IA'}
                  </span>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Réponses rapides */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Questions fréquentes :</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.slice(0, 3).map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setNewMessage(response)}
                  className="text-xs"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Zone de saisie */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isConnected}
                className="pr-12"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {!isConnected && (
            <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
              <Clock className="h-4 w-4" />
              Reconnexion en cours...
            </div>
          )}
        </div>
      </Card>

      {/* Informations supplémentaires */}
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#10B981]" />
              Temps de réponse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assistant IA</span>
                <Badge className="bg-green-100 text-green-700">Immédiat</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Agent humain</span>
                <Badge className="bg-blue-100 text-blue-700">≤ 2 min</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expert technique</span>
                <Badge className="bg-amber-100 text-amber-700">≤ 5 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autres options de support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.('phone-support')}
            >
              📞 Appel téléphonique (9h-17h)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.('email-support')}
            >
              ✉️ Support par email (2h de réponse)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.('documentation')}
            >
              📚 Documentation complète
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}