import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat() {
  const { friendId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState(null);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const roomId = [currentUser._id, friendId].sort().join("_");

  useEffect(() => {
    socket.emit("join_room", roomId);

    const token = localStorage.getItem("token");

    // Load friend info
    const loadFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/profile/${friendId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFriend(res.data);
      } catch (err) {
        console.error("Failed to load friend:", err);
      }
    };

    // Load chat history
    const loadMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    loadFriend();
    loadMessages();

    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId, friendId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      roomId,
      senderId: currentUser._id,
      receiverId: friendId,
      message: input
    });

    setInput("");
  };

  const isSentByMe = (msg) => {
    const senderId = msg.sender?._id || msg.sender;
    return senderId?.toString() === currentUser._id?.toString();
  };

  if (!friend) return (
    <div className="chat-wrapper">
      <p className="chat-loading">Loading chat...</p>
    </div>
  );

  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          {friend.name?.charAt(0)}
        </div>
        <div className="chat-header-info">
          <h2 className="chat-header-name">{friend.name}</h2>
          <span className="chat-header-status">Connected</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            <p>No messages yet. Say hi to {friend.name}! 👋</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const sentByMe = isSentByMe(msg);
            return (
              <div
                key={i}
                className={`chat-message-row ${sentByMe ? "row-sent" : "row-received"}`}
              >
                {/* Avatar for received messages */}
                {!sentByMe && (
                  <div className="chat-avatar chat-avatar-friend">
                    {friend.name?.charAt(0)}
                  </div>
                )}

                <div className={`chat-bubble ${sentByMe ? "bubble-sent" : "bubble-received"}`}>
                  {/* Sender name */}
                  <span className="bubble-sender-name">
                    {sentByMe ? "You" : friend.name}
                  </span>
                  <p className="bubble-text">{msg.message}</p>
                  <span className="bubble-time">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                {/* Avatar for sent messages */}
                {sentByMe && (
                  <div className="chat-avatar chat-avatar-me">
                    {currentUser.name?.charAt(0)}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Message ${friend.name}...`}
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send ➤
        </button>
      </div>
    </div>
  );
}

export default Chat;