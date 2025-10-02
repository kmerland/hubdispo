// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { Send, Minimize2, X, User, Bot, Phone, Mail, Clock, CheckCircle, Smile, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface LiveChatProps {
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

export default function LiveChat({ onClose, onMinimize, isMinimized = false }: LiveChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "offline">("connected");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      content: "Bienvenue sur le chat de support hubdispo.be ! Un agent va vous répondre sous peu.",
      timestamp: "14:30",
      type: "system"
    },
    {
      id: 2,
      sender: "agent",
      name: "Marie (Support)",
      content: "Bonjour ! Je suis Marie, votre experte hubdispo.be. Comment puis-je vous aider aujourd'hui ?",
      timestamp: "14:31",
      type: "text",
      avatar: "M"
    },
    {
      id: 3,
      sender: "user",
      name: "Vous",
      content: "Bonjour ! J'ai une question sur la consolidation de mes envois.",
      timestamp: "14:32",
      type: "text"
    },
    {
      id: 4,
      sender: "agent",
      name: "Marie (Support)",
      content: "Parfait ! Je vais vous expliquer comment optimiser vos consolidations. Quels sont vos destinations principales ?",
      timestamp: "14:33",
      type: "text",
      avatar: "M"
    }
  ]);

  const quickReplies = [
    "Comment ça marche ?",
    "Tarifs et prix",
    "Problème avec un envoi",
    "Questions douanières",
    "Support technique"
  ];

  const agentInfo = {
    name: "Marie Dubois",
    role: "Expert hubdispo.be",
    responseTime: "&lt; 2 minutes",
    rating: 4.9,
    languages: ["Français", "Nederlands", "English"]
  };

  useEffect(() => {
    // Simulation de frappe
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        // Ajouter une réponse simulée
        const responses = [
          "Je vérifie cela pour vous...",
          "Excellente question ! Voici la réponse...",
          "Laissez-moi vous aider avec cela.",
          "Je vais consulter votre dossier."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: "agent",
          name: "Marie (Support)",
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: "text",
          avatar: "M"
        }]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "user",
        name: "Vous",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      setIsTyping(true);
    }
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "En ligne";
      case "connecting":
        return "Connexion...";
      case "offline":
        return "Hors ligne";
      default:
        return "Inconnu";
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onMinimize}
          className="rounded-full w-14 h-14 bg-[#1E40AF] hover:bg-[#1E40AF]/90 shadow-lg"
        >
          💬
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50">
      <Card className="h-full flex flex-col shadow-2xl">
        {/* En-tête du chat */}
        <CardHeader className="pb-3 bg-[#1E40AF] text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-white text-[#1E40AF] font-semibold">
                    M
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getConnectionStatusColor()} border-2 border-white rounded-full`}></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">{agentInfo.name}</h3>
                <p className="text-xs text-blue-100">{agentInfo.role} • {getConnectionStatusText()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={onMinimize}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Informations agent */}
        <div className="px-4 py-2 bg-blue-50 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Temps de réponse: {agentInfo.responseTime}
            </span>
            <Badge variant="secondary" className="text-xs">
              ⭐ {agentInfo.rating}/5
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs ${
                  message.sender === 'user' 
                    ? 'bg-[#1E40AF] text-white' 
                    : message.type === 'system'
                    ? 'bg-gray-100 text-gray-600 text-center text-xs'
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg p-3`}>
                  {message.sender === 'agent' && message.type !== 'system' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-[#1E40AF] text-white">
                          {message.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-gray-600">{message.name}</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center justify-between mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span className="text-xs">{message.timestamp}</span>
                    {message.sender === 'user' && <CheckCircle className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-[#1E40AF] text-white">M</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-gray-600">Marie tape...</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Réponses rapides */}
        {quickReplies.length > 0 && (
          <div className="px-4 py-2 border-t">
            <div className="flex flex-wrap gap-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Zone de saisie */}
        <div className="p-4">
          <div className="flex items-end gap-2">
            <Button size="sm" variant="ghost">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[40px] max-h-24 resize-none text-sm"
              />
            </div>
            <Button size="sm" variant="ghost">
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions rapides en bas */}
        <div className="px-4 pb-3">
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <button className="flex items-center gap-1 hover:text-[#1E40AF]">
              <Phone className="h-3 w-3" />
              Appeler
            </button>
            <button className="flex items-center gap-1 hover:text-[#1E40AF]">
              <Mail className="h-3 w-3" />
              Email
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}