// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Send, Search, Filter, MoreVertical, Pin, Archive, Trash2, Phone, Video, Star, Paperclip, Smile, Check, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

interface MessagesProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function Messages({ onNavigate }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState("support");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: "support",
      type: "support",
      name: "Support hubdispo.be",
      avatar: "S",
      lastMessage: "Votre envoi BE-2024-789 est maintenant en transit vers l'Allemagne",
      timestamp: "Il y a 5 min",
      unread: 1,
      online: true,
      pinned: true
    },
    {
      id: "consolidation",
      type: "group",
      name: "Groupe Consolidation - Allemagne",
      avatar: "G",
      lastMessage: "Thomas R.: Le conteneur part demain à 14h comme prévu",
      timestamp: "Il y a 12 min",
      unread: 0,
      online: false,
      pinned: false,
      participants: 4
    },
    {
      id: "customs",
      type: "specialist",
      name: "Expert douanier - Julie M.",
      avatar: "J",
      lastMessage: "Les documents pour votre envoi Italien sont prêts",
      timestamp: "Il y a 2h",
      unread: 0,
      online: true,
      pinned: false
    },
    {
      id: "carrier",
      type: "partner",
      name: "Transporteur DHL Express",
      avatar: "D",
      lastMessage: "Livraison programmée pour demain entre 10h-12h",
      timestamp: "Hier",
      unread: 1,
      online: false,
      pinned: false
    }
  ];

  const messages = {
    support: [
      {
        id: 1,
        sender: "support",
        name: "Marie (Support)",
        content: "Bonjour ! Votre envoi BE-2024-789 a bien été pris en charge et intégré dans notre groupe de consolidation vers l'Allemagne.",
        timestamp: "14:30",
        type: "text",
        status: "read"
      },
      {
        id: 2,
        sender: "user",
        name: "Vous",
        content: "Parfait ! Quand est-ce que le conteneur part ?",
        timestamp: "14:32",
        type: "text",
        status: "delivered"
      },
      {
        id: 3,
        sender: "support",
        name: "Marie (Support)",
        content: "Le départ est prévu demain jeudi à 14h00 depuis notre hub de Zeebruges. Vous recevrez une notification automatique.",
        timestamp: "14:33",
        type: "text",
        status: "read"
      },
      {
        id: 4,
        sender: "support",
        name: "Marie (Support)",
        content: "Votre envoi BE-2024-789 est maintenant en transit vers l'Allemagne. Suivi en temps réel disponible.",
        timestamp: "14:35",
        type: "text",
        status: "unread"
      }
    ],
    consolidation: [
      {
        id: 1,
        sender: "system",
        name: "Système",
        content: "Bienvenue dans le groupe de consolidation vers l'Allemagne ! 4 participants confirmés.",
        timestamp: "09:15",
        type: "system",
        status: "read"
      },
      {
        id: 2,
        sender: "thomas",
        name: "Thomas R.",
        content: "Bonjour à tous ! Mon envoi de composants électroniques est prêt.",
        timestamp: "10:22",
        type: "text",
        status: "read"
      },
      {
        id: 3,
        sender: "user",
        name: "Vous",
        content: "Parfait, le mien aussi. On peut consolider sans problème.",
        timestamp: "10:25",
        type: "text",
        status: "delivered"
      },
      {
        id: 4,
        sender: "thomas",
        name: "Thomas R.",
        content: "Le conteneur part demain à 14h comme prévu. Tout le monde est OK ?",
        timestamp: "11:48",
        type: "text",
        status: "read"
      }
    ]
  };

  const currentMessages = messages[selectedConversation as keyof typeof messages] || [];
  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulation d'envoi de message
      console.log("Message envoyé:", newMessage);
      setNewMessage("");
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "support":
        return "bg-[#1E40AF] text-white";
      case "group":
        return "bg-orange-500 text-white";
      case "specialist":
        return "bg-[#10B981] text-white";
      case "partner":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-4 w-4 text-[#1E40AF]" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      <div className="grid lg:grid-cols-4 gap-6 h-[700px]">
        {/* Liste des conversations */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Messages</CardTitle>
                <Button size="sm" variant="ghost">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-[#1E40AF]' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getConversationIcon(conversation.type)}`}>
                          {conversation.avatar}
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate flex items-center gap-1">
                            {conversation.name}
                            {conversation.pinned && <Pin className="h-3 w-3 text-gray-400" />}
                          </p>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex gap-1">
                            {conversation.type === "group" && (
                              <Badge variant="secondary" className="text-xs">
                                {conversation.participants} participants
                              </Badge>
                            )}
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="bg-[#1E40AF] text-white text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone de conversation */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {selectedConv && (
              <>
                {/* En-tête de conversation */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getConversationIcon(selectedConv.type)}`}>
                        {selectedConv.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedConv.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedConv.online ? "En ligne" : "Hors ligne"}
                          {selectedConv.type === "group" && ` • ${selectedConv.participants} participants`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            Marquer comme favori
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archiver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${
                          message.sender === 'user' 
                            ? 'bg-[#1E40AF] text-white' 
                            : message.type === 'system'
                            ? 'bg-gray-100 text-gray-600 text-center'
                            : 'bg-gray-100 text-gray-900'
                        } rounded-lg p-3`}>
                          {message.sender !== 'user' && message.type !== 'system' && (
                            <p className="text-xs font-medium mb-1 text-gray-600">{message.name}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-between mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">{message.timestamp}</span>
                            {message.sender === 'user' && getMessageStatus(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

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
                        className="min-h-[40px] max-h-32 resize-none"
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
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}