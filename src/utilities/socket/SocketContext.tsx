import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector} from "react-redux";
import { RootState } from "../../redux";
import { useAppDispatch } from "../../hooks/accessHook";
import { logoutAction } from "../../redux/store/actions/auth";



const SOCKET_URL = import.meta.env.VITE_REACT_APP_CHAT_URL;

interface SocketContextType {
    socket: Socket | null;
    messages: any[];
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: [],
});

export const useSocketContext = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { data } = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages] = useState<any[]>([]);

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    useEffect(() => {
        if ((data?.role === "instructor" || data?.role === "student" || data?.role === "admin") && SOCKET_URL) {
            const newSocket = io(SOCKET_URL, {
                path: "/socket.io/",
                query: { userId: data._id },
                transports: ["websocket"],
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            // newSocket.on("message received", (newMessage,roomId) => {
            //   console.log("it is the message received oin teeeeeeeeeeeee",newMessage,roomId);
            //     setMessages((prev) => [...prev, newMessage]);
            // });

            newSocket.on("connect", () => {
                console.log("✅ Socket connected");
            });

            newSocket.on("disconnect", () => {
                console.log("🔌 Socket disconnected");
            });

            // newSocket.on("connect_error", (err) => {
            //     console.error("🚫 Connection error:", err);
            // });

            newSocket.on("user-blocked", () => {
                console.warn("🚫 User blocked. Logging out...");
                handleLogout();
            });

            return () => {
                newSocket.off("getOnlineUsers");
                newSocket.off("message received");
                newSocket.off("connect");
                newSocket.off("disconnect");
                // newSocket.off("connect_error");
                newSocket.off("user-blocked");
                newSocket.close();
            };
        } else {
            if (socket) socket.close();
            setSocket(null);
        }
    }, [data]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, messages }}>
            {children}
        </SocketContext.Provider>
    );
};


