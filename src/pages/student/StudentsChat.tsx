import { useState, useRef, useEffect } from "react";
import { commonRequest, URL } from "../../common/api";
import { config } from "../../common/config";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import { useSocketContext } from "../../utilities/socket/SocketContext";

type Message = {
  _id: string;
  name: string;
  sender: string;
  text: string;
  timestamp: string;
};

type Participant = {
  _id: string;
  name: string;
};

type RawChatRoom = {
  _id: string;
  name: string;
  messages: Message[];
  participants: Participant[];
};

type ChatRoom = {
  id: string;
  name: string;
  messages: Message[];
  participants: Participant[];
};

const StudentsChat = () => {
  const { data: currentUser } = useSelector((state: RootState) => state.user);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { socket, onlineUsers } = useSocketContext();

  const fetchChatRooms = async () => {
    try {
      const response = await commonRequest<RawChatRoom[]>(
        "GET",
        `${URL}/api/chat/rooms`,
        null,
        config
      );
      if (response?.data) {
        const rooms: ChatRoom[] = response.data.map((room) => ({
          id: room._id,
          name: room.name,
          messages: room.messages || [],
          participants: room.participants || [],
        }));
        setChatRooms(rooms);
      }
    } catch (err) {
      console.error("Error fetching chat rooms:", err);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (chatRooms.length > 0 && !activeRoomId) {
      // Select a random room if no active room is set
      const randomRoom = chatRooms[Math.floor(Math.random() * chatRooms.length)];
      setActiveRoomId(randomRoom.id);
    }
  }, [chatRooms, activeRoomId]);

  const activeRoom = chatRooms.find((room) => room.id === activeRoomId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom?.messages]);

  useEffect(() => {
    if (socket && activeRoomId) {
      socket.emit("joinRoom", activeRoomId);
    }
  }, [socket, activeRoomId]);

  useEffect(() => {
    if (!socket) return;
  
    const handler = ({ message: newMsg, roomId }: { message: Message; roomId: string }) => {
      console.log("New message received:", newMsg);
      if (newMsg && newMsg.sender && newMsg.text && newMsg.timestamp) {
        setChatRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId
              ? { ...room, messages: [...room.messages, newMsg] }
              : room
          )
        );
      }
    };
  
    socket.on("message received", handler);
  
    return () => {
      socket.off("message received", handler);
    };
  }, [socket]);
  

  const handleSend = async () => {
    if (!newMessage.trim() || !activeRoomId || !currentUser?._id) return;

    const newMsg: Message = {
      _id: Date.now().toString(),
      name: currentUser.name,
      sender: currentUser._id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Update UI immediately
    setChatRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === activeRoomId
          ? { ...room, messages: [...room.messages, newMsg] }
          : room
      )
    );

    // Reset input
    setNewMessage("");

    try {
      // Send to backend via REST
      await commonRequest(
        "POST",
        `${URL}/api/chat/send`,
        { roomId: activeRoomId, text: newMessage },
        config
      );

      // Send via WebSocket
      console.log(newMsg,activeRoomId,"in the sending part" )
      socket?.emit("message", {
        roomId: activeRoomId,
        message: newMsg,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Chat Rooms List */}
      <div className="w-full md:w-2/5 lg:w-1/3 bg-white border-b md:border-r md:border-b-0 flex flex-col overflow-hidden">
        <h2 className="text-lg font-bold p-4 border-b">Chat Rooms</h2>
        <div className="flex-1 overflow-y-auto">
          {chatRooms.length === 0 ? (
            <div className="p-4 text-gray-500">No chat rooms available</div>
          ) : (
            chatRooms.map((room) => (
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
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col h-full max-h-[36rem]">
        {/* Header */}
        <div className="p-4 border-b bg-white font-bold flex justify-between items-center">
          <span>{activeRoom?.name ?? "Select a chat room"}</span>
          <button
            onClick={() => setShowParticipants((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showParticipants ? "Hide Participants" : "Show Participants"}
          </button>
        </div>

        {/* Participants */}
        {showParticipants && (
          <div className="bg-gray-100 p-3 border-b max-h-32 overflow-y-auto">
            {activeRoom?.participants?.map((participant) => (
              <div
                key={participant._id}
                className="text-sm flex items-center gap-2 mb-1"
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    onlineUsers.includes(participant._id)
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span>{participant.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {activeRoom?.messages.map((msg) => {
            const isCurrentUser = msg.sender === currentUser?._id;
            return (
              <div
                key={msg._id}
                className={`flex flex-col max-w-md ${
                  isCurrentUser ? "ml-auto text-right" : "mr-auto text-left"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{msg.name}</div>
                <div
                  className={`p-3 rounded-lg ${
                    isCurrentUser ? "bg-blue-100" : "bg-white border"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
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

export default StudentsChat;





























// import { useState, useRef, useEffect } from "react";
// import { commonRequest, URL } from "../../common/api";
// import { config } from "../../common/config";
// import { RootState } from "../../redux";
// import { useSelector } from "react-redux";
// import { useSocketContext } from "../../utilities/socket/SocketContext";

// type Message = {
//   _id: string;
//   name: string;
//   sender: string;
//   text: string;
//   timestamp: string;
// };

// type Participant = {
//   _id: string;
//   name: string;
// };

// type RawChatRoom = {
//   _id: string;
//   name: string;
//   messages: Message[];
//   participants: Participant[];
// };

// type ChatRoom = {
//   id: string;
//   name: string;
//   messages: Message[];
//   participants: Participant[];
//   unreadMessages: number; // New field for unread messages
// };

// const StudentsChat = () => {
//   const { data: currentUser } = useSelector((state: RootState) => state.user);
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
//   const [activeRoomId, setActiveRoomId] = useState<string>("");
//   const [newMessage, setNewMessage] = useState("");
//   const [showParticipants, setShowParticipants] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { socket, onlineUsers } = useSocketContext();

//   const fetchChatRooms = async () => {
//     try {
//       const response = await commonRequest<RawChatRoom[]>(
//         "GET",
//         `${URL}/api/chat/rooms`,
//         null,
//         config
//       );
//       if (response?.data) {
//         const rooms: ChatRoom[] = response.data.map((room) => ({
//           id: room._id,
//           name: room.name,
//           messages: room.messages || [],
//           participants: room.participants || [],
//           unreadMessages: 0, // Initialize unread message count
//         }));
//         setChatRooms(rooms);
//       }
//     } catch (err) {
//       console.error("Error fetching chat rooms:", err);
//     }
//   };

//   useEffect(() => {
//     fetchChatRooms();
//   }, []);

//   useEffect(() => {
//     if (chatRooms.length > 0 && !activeRoomId) {
//       // Select a random room if no active room is set
//       const randomRoom = chatRooms[Math.floor(Math.random() * chatRooms.length)];
//       setActiveRoomId(randomRoom.id);
//     }
//   }, [chatRooms, activeRoomId]);

//   const activeRoom = chatRooms.find((room) => room.id === activeRoomId);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeRoom?.messages]);

//   useEffect(() => {
//     if (socket && activeRoomId) {
//       socket.emit("joinRoom", activeRoomId);
//     }
//   }, [socket, activeRoomId]);

//   useEffect(() => {
//     if (!socket) return;

//     const handler = ({ message: newMsg, roomId }: { message: Message; roomId: string }) => {
//       console.log("New message received:", newMsg);
//       if (newMsg && newMsg.sender && newMsg.text && newMsg.timestamp) {
//         setChatRooms((prevRooms) =>
//           prevRooms.map((room) =>
//             room.id === roomId
//               ? {
//                   ...room,
//                   messages: [...room.messages, newMsg],
//                   // Increment unread message count for the active room
//                   unreadMessages: room.id === activeRoomId ? room.unreadMessages : room.unreadMessages + 1,
//                 }
//               : room
//           )
//         );
//       }
//     };

//     socket.on("message received", handler);

//     return () => {
//       socket.off("message received", handler);
//     };
//   }, [socket, activeRoomId]);

//   const handleSend = async () => {
//     if (!newMessage.trim() || !activeRoomId || !currentUser?._id) return;

//     const newMsg: Message = {
//       _id: Date.now().toString(),
//       name: currentUser.name,
//       sender: currentUser._id,
//       text: newMessage,
//       timestamp: new Date().toISOString(),
//     };

//     // Update UI immediately
//     setChatRooms((prevRooms) =>
//       prevRooms.map((room) =>
//         room.id === activeRoomId
//           ? { ...room, messages: [...room.messages, newMsg], unreadMessages: 0 }
//           : room
//       )
//     );

//     // Reset input
//     setNewMessage("");

//     try {
//       // Send to backend via REST
//       await commonRequest(
//         "POST",
//         `${URL}/api/chat/send`,
//         { roomId: activeRoomId, text: newMessage },
//         config
//       );

//       // Send via WebSocket
//       socket?.emit("message", {
//         roomId: activeRoomId,
//         message: newMsg,
//       });
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen overflow-hidden">
//       {/* Chat Rooms List */}
//       <div className="w-full md:w-2/5 lg:w-1/3 bg-white border-b md:border-r md:border-b-0 flex flex-col overflow-hidden">
//         <h2 className="text-lg font-bold p-4 border-b">Chat Rooms</h2>
//         <div className="flex-1 overflow-y-auto">
//           {chatRooms.length === 0 ? (
//             <div className="p-4 text-gray-500">No chat rooms available</div>
//           ) : (
//             chatRooms.map((room) => (
//               <div
//                 key={room.id}
//                 className={`p-4 cursor-pointer hover:bg-gray-100 ${room.id === activeRoomId ? "bg-blue-100" : ""}`}
//                 onClick={() => {
//                   setActiveRoomId(room.id);
//                   // Reset unread message count when room is activated
//                   setChatRooms((prevRooms) =>
//                     prevRooms.map((r) =>
//                       r.id === room.id ? { ...r, unreadMessages: 0 } : r
//                     )
//                   );
//                 }}
//               >
//                 <div className="font-medium">{room.name}</div>
//                 <div className="text-sm text-gray-500 truncate">
//                   {room.messages.length > 0 ? room.messages[room.messages.length - 1].text : "No messages yet"}
//                 </div>
//                 {room.unreadMessages > 0 && (
//                   <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-2">
//                     {room.unreadMessages} new message{room.unreadMessages > 1 ? "s" : ""}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col h-full max-h-[36rem]">
//         {/* Header */}
//         <div className="p-4 border-b bg-white font-bold flex justify-between items-center">
//           <span>{activeRoom?.name ?? "Select a chat room"}</span>
//           <button
//             onClick={() => setShowParticipants((prev) => !prev)}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             {showParticipants ? "Hide Participants" : "Show Participants"}
//           </button>
//         </div>

//         {/* Participants */}
//         {showParticipants && (
//           <div className="bg-gray-100 p-3 border-b max-h-32 overflow-y-auto">
//             {activeRoom?.participants?.map((participant) => (
//               <div key={participant._id} className="text-sm flex items-center gap-2 mb-1">
//                 <div
//                   className={`h-2 w-2 rounded-full ${onlineUsers.includes(participant._id) ? "bg-green-500" : "bg-red-500"}`}
//                 ></div>
//                 <span>{participant.name}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//           {activeRoom?.messages.map((msg) => {
//             const isCurrentUser = msg.sender === currentUser?._id;
//             return (
//               <div
//                 key={msg._id}
//                 className={`flex flex-col max-w-md ${isCurrentUser ? "ml-auto text-right" : "mr-auto text-left"}`}
//               >
//                 <div className="text-xs text-gray-500 mb-1">{msg.name}</div>
//                 <div className={`p-3 rounded-lg ${isCurrentUser ? "bg-blue-100" : "bg-white border"}`}>
//                   <div className="text-sm">{msg.text}</div>
//                   <div className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
//                 </div>
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t bg-white flex gap-2">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border px-4 py-2 rounded-md"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsChat;


