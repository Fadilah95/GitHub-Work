import { useEffect, useState } from "react";

function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      text: "Welcome to the Live Chat Simulator!",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Sample automatic messages
  const sampleMessages = [
    "Hello! How are you?",
    "Welcome to the chat!",
    "React is fun to learn.",
    "This message was generated automatically.",
    "Have a great day!",
    "useEffect is working!",
    "New message received.",
  ];

  // =========================================
  // AUTO-GENERATE MESSAGE
  // =========================================
  useEffect(() => {
    if (!isOnline) {
      return;
    }

    const interval = setInterval(() => {
      const randomMessage =
        sampleMessages[
          Math.floor(Math.random() * sampleMessages.length)
        ];

      const newMessage = {
        id: Date.now(),
        sender: "Bot",
        text: randomMessage,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
      ]);
    }, 3000);

    // Cleanup interval when component unmounts
    // or when isOnline changes
    return () => {
      clearInterval(interval);
    };
  }, [isOnline]);

  // =========================================
  // HANDLE ONLINE / OFFLINE STATUS
  // =========================================
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // =========================================
  // CLEAR ALL MESSAGES
  // =========================================
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <h1>Live Chat Simulator</h1>

      <div className="connection-status">
        Status:{" "}
        <strong>
          {isOnline ? "Online" : "Offline"}
        </strong>
      </div>

      {!isOnline && (
        <div className="offline-message">
          You are currently offline. New messages are paused.
        </div>
      )}

      <div className="chat-box">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="message"
            >
              <strong>{message.sender}</strong>

              <p>{message.text}</p>

              <small>{message.time}</small>
            </div>
          ))
        )}
      </div>

      <button onClick={clearMessages}>
        Clear Messages
      </button>
    </div>
  );
}

export default LiveChat;