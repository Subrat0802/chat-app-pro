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
      <div className="w-0 lg:w-full h-full flex justify-center relative items-center bg-sky-700/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_2px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_2px,transparent_2px)] bg-size-[100px_100px]"></div>
        <p className="text-5xl font-bold text-gray-700 hidden lg:block">Start Convo</p>
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




// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from "../../main";
// import { useRef, useEffect, useState } from "react";
// import { addMessage } from "../../services/redux/slices/currentMessage";

// // ─── Inline styles for non-Tailwind effects ───────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap');

//   .messages-root * {
//     font-family: 'Syne', sans-serif;
//   }

//   .msg-mono {
//     font-family: 'JetBrains Mono', monospace;
//   }

//   .msg-bubble-in {
//     animation: bubbleIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
//     opacity: 0;
//     transform: translateY(8px) scale(0.97);
//   }

//   @keyframes bubbleIn {
//     to {
//       opacity: 1;
//       transform: translateY(0) scale(1);
//     }
//   }

//   .send-btn::before {
//     content: '';
//     position: absolute;
//     inset: -1px;
//     border-radius: inherit;
//     background: linear-gradient(135deg, #0284c7, #38bdf8, #0284c7);
//     background-size: 200% 200%;
//     animation: shimmer 3s ease infinite;
//     z-index: -1;
//     opacity: 0;
//     transition: opacity 0.2s;
//   }

//   .send-btn:hover::before {
//     opacity: 1;
//   }

//   .send-btn:hover {
//     box-shadow: 0 0 20px rgba(2, 132, 199, 0.5);
//   }

//   @keyframes shimmer {
//     0% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//     100% { background-position: 0% 50%; }
//   }

//   .input-field:focus {
//     box-shadow: 0 0 0 1px rgba(2, 132, 199, 0.4), inset 0 0 20px rgba(2, 132, 199, 0.02);
//   }

//   .avatar-glow {
//     box-shadow: 0 0 0 1px rgba(2, 132, 199, 0.4), 0 0 14px rgba(2, 132, 199, 0.2);
//   }

//   .scrollbar-hide::-webkit-scrollbar { display: none; }
//   .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

//   .noise-overlay::after {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
//     pointer-events: none;
//     opacity: 0.4;
//   }

//   .header-line {
//     background: linear-gradient(90deg, transparent, rgba(2, 132, 199, 0.7), transparent);
//   }
// `;

// const Messages = () => {
//   const dispatch = useDispatch();
//   const textRef = useRef<HTMLInputElement | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const socketRef = useRef<WebSocket | null>(null);
//   const [isFocused, setIsFocused] = useState(false);

//   const currentMsg = useSelector((state: RootState) => state.msgState);
//   const currentUserId = useSelector(
//     (state: RootState) => state.userState.user?.id
//   );

//   useEffect(() => {
//     const convo = currentMsg.currentConversation;
//     if (!convo) {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//       return;
//     }

//     const protocol = window.location.protocol === "https:" ? "wss" : "ws";
//     const host = window.location.hostname;
//     const port = 8080;

//     const ws = new WebSocket(
//       `${protocol}://${host}:${port}?convoId=${encodeURIComponent(convo.id)}`
//     );

//     ws.onmessage = (event) => {
//       try {
//         const payload = JSON.parse(event.data) as {
//           type: string;
//           data?: {
//             id: string;
//             content: string;
//             senderId: string;
//             createdAt: string;
//           };
//         };
//         if (payload.type === "new_message" && payload.data) {
//           dispatch(addMessage(payload.data));
//         }
//       } catch (error) {
//         console.error("Error parsing WS message", error);
//       }
//     };

//     ws.onopen = () => console.log("WebSocket connected:", convo.id);
//     ws.onclose = () => console.log("WebSocket disconnected:", convo.id);

//     socketRef.current = ws;

//     return () => {
//       socketRef.current?.close();
//       socketRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentMsg.currentConversation?.id]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMsg.currentConversation?.messages]);

//   const sendMessage = () => {
//     if (!currentMsg.currentConversation || !currentUserId) return;
//     const content = textRef.current?.value.trim() || "";
//     if (!content) return;
//     if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
//       console.warn("WebSocket not connected.");
//       return;
//     }
//     socketRef.current.send(JSON.stringify({ type: "message", content }));
//     if (textRef.current) textRef.current.value = "";
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // ── Get other user's name initial for avatar ──────────────────────────────
//   const otherUser = currentMsg.currentConversation
//     ? currentMsg.currentConversation.user1Id === currentUserId
//       ? currentMsg.currentConversation.user2
//       : currentMsg.currentConversation.user1
//     : null;

//   const otherName = otherUser?.name ?? "";
//   const initial = otherName.charAt(0).toUpperCase();

//   // ── Empty state ───────────────────────────────────────────────────────────
//   if (!currentMsg.currentConversation) {
//     return (
//       <>
//         <style>{globalStyles}</style>
//         <div
//           className="messages-root noise-overlay relative w-full h-full flex flex-col items-center justify-center"
//           style={{ background: "#080808" }}
//         >
//           {/* Subtle grid */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(2,132,199,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.04) 1px, transparent 1px)",
//               backgroundSize: "48px 48px",
//             }}
//           />
//           <div className="relative flex flex-col items-center gap-4 hidden lg:flex">
//             {/* Amber orb */}
//             <div
//               className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
//               style={{
//                 background: "radial-gradient(circle, rgba(2,132,199,0.18) 0%, transparent 70%)",
//                 border: "1px solid rgba(2,132,199,0.25)",
//                 boxShadow: "0 0 40px rgba(2,132,199,0.1)",
//               }}
//             >
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//               </svg>
//             </div>
//             <p
//               className="text-3xl font-bold tracking-tight"
//               style={{ color: "rgba(255,255,255,0.12)", letterSpacing: "-0.02em" }}
//             >
//               No conversation selected
//             </p>
//             <p className="msg-mono text-xs" style={{ color: "rgba(255,255,255,0.08)" }}>
//               choose a contact to begin
//             </p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{globalStyles}</style>
//       <div
//         className="messages-root noise-overlay relative w-full h-full flex flex-col"
//         style={{ background: "#080808" }}
//       >
//         {/* Grid background */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(2,132,199,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.03) 1px, transparent 1px)",
//             backgroundSize: "48px 48px",
//           }}
//         />

//         {/* ── Header ─────────────────────────────────────────────────────── */}
//         <div
//           className="relative z-10 flex items-center gap-4 px-6 py-4"
//           style={{
//             background: "rgba(10,10,10,0.95)",
//             backdropFilter: "blur(20px)",
//             borderBottom: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           {/* Avatar */}
//           <div
//             className="avatar-glow w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
//             style={{
//               background: "linear-gradient(135deg, rgba(2,132,199,0.4) 0%, rgba(56,189,248,0.2) 100%)",
//             }}
//           >
//             <span
//               className="msg-mono font-bold text-sm"
//               style={{ color: "rgba(56,189,248,0.95)" }}
//             >
//               {initial}
//             </span>
//           </div>

//           {/* Name + status */}
//           <div className="flex flex-col gap-0.5">
//             <p
//               className="font-bold text-base tracking-tight leading-none"
//               style={{ color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}
//             >
//               {otherName}
//             </p>
//             <div className="flex items-center gap-1.5">
//               <span
//                 className="w-1.5 h-1.5 rounded-full"
//                 style={{ background: "#22c55e", boxShadow: "0 0 4px #22c55e" }}
//               />
//               <span className="msg-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
//                 online
//               </span>
//             </div>
//           </div>

//           {/* Decorative top-right accent */}
//           <div className="ml-auto flex items-center gap-3">
//             <div
//               className="msg-mono text-xs px-2 py-1 rounded"
//               style={{
//                 color: "rgba(56,189,248,0.6)",
//                 border: "1px solid rgba(2,132,199,0.2)",
//                 background: "rgba(2,132,199,0.07)",
//               }}
//             >
//               E2E
//             </div>
//           </div>
//         </div>

//         {/* Amber hairline below header */}
//         <div className="header-line h-px w-full relative z-10" />

//         {/* ── Messages ───────────────────────────────────────────────────── */}
//         <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-3 scrollbar-hide">
//           {currentMsg.currentConversation.messages.map((el, i) => {
//             const isSender = el.senderId === currentUserId;
//             const time = el.createdAt
//               ? new Date(el.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "";

//             return (
//               <div
//                 key={el.id}
//                 className={`msg-bubble-in flex flex-col ${isSender ? "items-end" : "items-start"}`}
//                 style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }}
//               >
//                 <div
//                   className="relative max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl"
//                   style={
//                     isSender
//                       ? {
//                           background:
//                             "linear-gradient(135deg, rgba(2,132,199,0.35) 0%, rgba(14,165,233,0.2) 100%)",
//                           border: "1px solid rgba(2,132,199,0.3)",
//                           borderBottomRightRadius: "4px",
//                           boxShadow: "0 4px 24px rgba(2,132,199,0.1)",
//                         }
//                       : {
//                           background: "rgba(255,255,255,0.04)",
//                           border: "1px solid rgba(255,255,255,0.07)",
//                           borderTopLeftRadius: "4px",
//                           boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
//                         }
//                   }
//                 >
//                   <p
//                     className="text-sm leading-relaxed break-words"
//                     style={{ color: isSender ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)" }}
//                   >
//                     {el.content}
//                   </p>
//                 </div>

//                 {/* Timestamp */}
//                 {time && (
//                   <span
//                     className="msg-mono mt-1 text-xs px-1"
//                     style={{ color: "rgba(255,255,255,0.2)" }}
//                   >
//                     {time}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* ── Input ──────────────────────────────────────────────────────── */}
//         <div
//           className="relative z-10 px-5 py-4"
//           style={{
//             background: "rgba(8,8,8,0.98)",
//             borderTop: "1px solid rgba(255,255,255,0.05)",
//           }}
//         >
//           <div
//             className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300"
//             style={{
//               background: "rgba(255,255,255,0.04)",
//               border: `1px solid ${isFocused ? "rgba(2,132,199,0.5)" : "rgba(255,255,255,0.08)"}`,
//               boxShadow: isFocused ? "0 0 0 3px rgba(2,132,199,0.08)" : "none",
//             }}
//           >
//             <input
//               ref={textRef}
//               className="input-field 
//   flex-1 
//   bg-transparent 
//   text-sm 
//   border-none 
//   outline-none 
//   focus:outline-none 
//   focus:ring-0 
//   focus:border-none"
//               placeholder="Write something..."
//               onKeyDown={handleKeyPress}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               style={{
//                 color: "rgba(255,255,255,0.85)",
//                 caretColor: "rgba(56,189,248,0.9)",
//                 fontFamily: "'Syne', sans-serif",
//               }}
//             />

//             {/* Send button */}
//             <button
//               onClick={sendMessage}
//               className="send-btn relative flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
//               style={{
//                 background: "linear-gradient(135deg, #0284c7, #38bdf8)",
//                 border: "none",
//               }}
//             >
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="22" y1="2" x2="11" y2="13" />
//                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
//               </svg>
//             </button>
//           </div>

//           {/* Footer hint */}
//           <p
//             className="msg-mono text-center text-xs mt-2"
//             style={{ color: "rgba(255,255,255,0.1)" }}
//           >
//             end-to-end encrypted · press enter to send
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Messages;