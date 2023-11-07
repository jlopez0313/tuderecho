import React, { useRef, useState } from "react";
import { ChatContext } from "./ChatContext";

import { decodeToken } from "react-jwt";
import socketIO from 'socket.io-client';
import { signal } from "@preact/signals-react";

const onlineUsers = signal([]);
const chatList = signal([])

export const ChatProvider = ({ children }) => {

  const socket = useRef();
  const token = localStorage.getItem("token") || "";
  const user = decodeToken(token);
  const [newMessage, setNewMessage] = useState(false);

  const connectToChat = () => {

    if (!socket.current)  {
        socket.current = socketIO.connect(import.meta.env.VITE_BACKEND);
        socket.current.emit("newUser", { ...user, socketID: socket.current.id });
    }

    onGetUsers();
    onNewMessage();
  };

  const onGetUsers = () => {
    socket.current.on("getUsers", async (data) => {
        const lista = data.filter((usuario) => usuario.uid !== user?.uid);
        onlineUsers.value = [...lista];
    });
  }

  const onNewMessage = () => {
    socket.current.on("newMessage", (data) => {
        const { to, sender } = data;
  
        if (to === user?.uid) {
          const from = onlineUsers.value.find((user) => user?.uid === sender);

          console.log( from );
          if (from) {
            onAddChat(from);
            setNewMessage( true )
          } else {
            console.log("Empty Users", onlineUsers, from, to);
          }
        }
      });
  }

  const onAddChat = (usuario) => {
    socket.current.emit(
      "join",
      { id: user.uid, friend: usuario.uid || usuario.id },
      (room) => {
        if (chatList.value.some((chat) => chat.user.uid === usuario.uid)) {
          return;
        } else if (chatList.value.length === 3) {
          onRemoveChat(0);
        } else {
          chatList.value = [...chatList.value, { user: usuario, room }];
        }
      }
    );
  };

  const onRemoveChat = (key) => {
    const list = [...chatList.value];
    list.splice(key, 1);
    chatList.value = list;
  };

  const expose = {
    setNewMessage,
    onNewMessage,
    connectToChat,
    onRemoveChat,
    onAddChat,
    onlineUsers,
    newMessage,
    chatList,
    socket,
  };

  return <ChatContext.Provider value={expose}>{children}</ChatContext.Provider>;
};
