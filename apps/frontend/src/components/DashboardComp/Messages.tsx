import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../main";
import { useRef, useEffect } from "react";
import { addMessage } from "../../services/redux/slices/currentMessage";

const Messages = () => {
  const dispatch = useDispatch();
  const textRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const currentMsg = useSelector((state: RootState) => state.msgState);
  const currentUserId = useSelector(
    (state: RootState) => state.userState.user?.id
  );

  // Open WebSocket connection when a conversation is active
  useEffect(() => {
    const convo = currentMsg.currentConversation;
    if (!convo) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const port = 8080; // ws-server port

    const ws = new WebSocket(
      `${protocol}://${host}:${port}?convoId=${encodeURIComponent(convo.id)}`
    );

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as {
          type: string;
          data?: {
            id: string;
            content: string;
            senderId: string;
            createdAt: string;
          };
        };

        if (payload.type === "new_message" && payload.data) {
          dispatch(addMessage(payload.data));
        }
      } catch (error) {
        console.error("Error parsing WS message", error);
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connected for conversation:", convo.id);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected for conversation:", convo.id);
    };

    socketRef.current = ws;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMsg.currentConversation?.id]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMsg.currentConversation?.messages]);

  const sendMessage = () => {
    if (!currentMsg.currentConversation || !currentUserId) return;

    const content = textRef.current?.value.trim() || "";
    if (content === "") return;

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not connected. Cannot send message.");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "message",
        content,
      })
    );

    // Clear input after sending
    if (textRef.current) {
      textRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!currentMsg.currentConversation) {
    return (
      <div className="w-full h-full flex justify-center relative items-center bg-sky-700/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_2px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_2px,transparent_2px)] bg-size-[100px_100px]"></div>
        <p className="text-5xl font-bold text-gray-700">Start Convo</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-sky-700/10 flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_2px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_2px,transparent_2px)] bg-size-[100px_100px]"></div>

      {/* Header */}
      <div className="relative z-10 w-full text-xl font-semibold p-4 flex justify-between items-center bg-black">
        <div>
          <p>
            {currentMsg.currentConversation.user1Id === currentUserId
              ? currentMsg.currentConversation.user2.name
              : currentMsg.currentConversation.user1.name}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-2 ">
        {currentMsg.currentConversation.messages.map((el) => {
          const isSender = el.senderId === currentUserId;
          return (
            <div
              key={el.id}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-lg ${
                  isSender
                    ? "bg-linear-to-br from-sky-800 to-sky-900 rounded-2xl rounded-br-xs p-2 md:p-4 max-w-xs border border-cyan-500/20"
                    : "bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl rounded-tl-xs p-2 md:p-4 max-w-xs border border-cyan-500/20"
                } shadow-sm`}
              >
                <p className="wrap-break-word">{el.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 w-full p-4 ">
        <div className="grid grid-cols-11 items-center gap-2">
          <input
            ref={textRef}
            className="col-span-10 border border-white/20 px-3 py-4 rounded focus:outline-none focus:ring-0 focus:border-sky-600 transition-all duration-200"
            placeholder="Type a message..."
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            className="col-span-1 bg-sky-600/80 text-white py-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;