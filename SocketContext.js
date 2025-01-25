import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { socketUrl } from "./Constants/url";

// Create a Context for the Socket
const SocketContext = createContext();

// Custom hook to use the SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider to wrap the app and provide the socket instance
export const SocketProvider = ({ children }) => {
  const { profile } = useSelector((state) => state.profileSlice);
  const socketRef = useRef(null); // Store the socket instance in the ref
  const [isConnected, setIsConnected] = useState(false); // Connection status

  let socket;

  useEffect(() => {
    socket = io(socketUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 200, // Retry 200 times if disconnected
      reconnectionDelay: 1000, // Wait 1 second before trying to reconnect
      reconnectionDelayMax: 5000, // Wait up to 5 seconds between reconnection attempts
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.warn("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (profile && socket) {
  //     console.log("inside home screen hook socket connected");
  //     socket.emit("new-captain-connect", profile._id);
  //   }
  // }, [profile, socket]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
