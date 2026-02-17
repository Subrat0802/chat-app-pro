import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";
import dotenv from "dotenv";

dotenv.config();

const wsServer = new WebSocketServer({ port: 8080 });

interface WSUserConnection {
  ws: WebSocket;
  userId: string;
  convoId: string;
}

// All active connections, scoped by conversation
const connections: WSUserConnection[] = [];

function getTokenFromCookies(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === "token") {
      return rest.join("=");
    }
  }

  return null;
}

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string" || !decoded) {
      return null;
    }

    // Our JWT payload is { userId: string }
    const payload = decoded as jwt.JwtPayload;
    if (!payload.userId || typeof payload.userId !== "string") {
      return null;
    }

    return payload.userId;
  } catch (error) {
    console.error("JWT verification error", error);
    return null;
  }
}

wsServer.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    ws.close();
    return;
  }

  // Expect URLs like: /?convoId=xyz
  const queryString = url.split("?")[1] || "";
  const queryParams = new URLSearchParams(queryString);
  const convoId = queryParams.get("convoId") || "";

  if (!convoId) {
    console.error("Missing convoId in websocket connection");
    ws.close();
    return;
  }

  const tokenFromCookie = getTokenFromCookies(
    request.headers.cookie as string | undefined,
  );

  if (!tokenFromCookie) {
    console.error("Missing auth token cookie for websocket connection");
    ws.close();
    return;
  }

  const userId = checkUser(tokenFromCookie);
  if (!userId) {
    ws.close();
    return;
  }

  const connection: WSUserConnection = {
    ws,
    userId,
    convoId,
  };

  connections.push(connection);

  ws.on("message", async (rawData) => {
    try {
      const parsed = JSON.parse(rawData as unknown as string) as {
        type: string;
        content?: string;
      };

      if (parsed.type === "message" && parsed.content && parsed.content.trim()) {
        // 1. Save message to DB
        const newMessage = await prismaClient.message.create({
          data: {
            content: parsed.content.trim(),
            senderId: userId,
            conversationId: convoId,
          },
        });

        const payload = JSON.stringify({
          type: "new_message",
          data: {
            id: newMessage.id,
            content: newMessage.content,
            senderId: newMessage.senderId,
            conversationId: newMessage.conversationId,
            createdAt: newMessage.createdAt,
          },
        });

        // 2. Broadcast to all users in this conversation (sender + friend)
        for (const conn of connections) {
          if (conn.convoId === convoId && conn.ws.readyState === WebSocket.OPEN) {
            conn.ws.send(payload);
          }
        }
      }
    } catch (error) {
      console.error("Error handling WS message", error);
    }
  });

  ws.on("close", () => {
    const idx = connections.indexOf(connection);
    if (idx !== -1) {
      connections.splice(idx, 1);
    }
  });
});