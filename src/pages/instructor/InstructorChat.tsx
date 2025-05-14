import { useState, useRef, useEffect } from "react";

type Message = {
  _id: string;
  sender: string;
  text: string;
  timestamp: string;
};

type ChatRoom = {
  id: string;
  name: string;
  messages: Message[];
};

const sampleChatRooms: ChatRoom[] = [
  {
    id: "course1",
    name: "React Basics",
    messages: Array.from({ length: 15 }, (_, i) => ({
      _id: `${i + 1}`,
      sender: i % 2 === 0 ? "Instructor" : "You",
      text: `Sample message ${i + 1}`,
      timestamp: new Date().toISOString(),
    })),
  },
  {
    id: "course2",
    name: "Advanced Node.js",
    messages: [
      {
        _id: "1",
        sender: "Instructor",
        text: "Let’s dive deep into Node.js.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

const InstructorChat = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(sampleChatRooms);
  const [activeRoomId, setActiveRoomId] = useState<string>("course1");
  const [newMessage, setNewMessage] = useState("");

  const activeRoom = chatRooms.find((room) => room.id === activeRoomId)!;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom.messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updatedRooms = chatRooms.map((room) =>
      room.id === activeRoomId
        ? {
            ...room,
            messages: [
              ...room.messages,
              {
                _id: Date.now().toString(),
                sender: "You",
                text: newMessage,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : room
    );

    setChatRooms(updatedRooms);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Panel - Chat Room List */}
      <div className="w-full md:w-2/5 lg:w-1/3 bg-white border-b md:border-r md:border-b-0 flex flex-col">
        <h2 className="text-lg font-bold p-4 border-b">Chat Rooms</h2>
        <div className="flex-1 overflow-y-auto">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                room.id === activeRoomId ? "bg-blue-100" : ""
              }`}
              onClick={() => setActiveRoomId(room.id)}
            >
              <div className="font-medium">{room.name}</div>
              <div className="text-sm text-gray-500 truncate">
                {room.messages.length > 0
                  ? room.messages[room.messages.length - 1].text
                  : "No messages yet"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col h-full max-h-[36rem]">
        {/* Header */}
        <div className="p-4 border-b bg-white font-bold">{activeRoom.name}</div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {activeRoom.messages.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-md p-3 rounded-lg ${
                msg.sender === "You" ? "ml-auto bg-blue-100" : "bg-white border"
              }`}
            >
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border px-4 py-2 rounded-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorChat;
