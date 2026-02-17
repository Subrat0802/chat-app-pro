import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import {prismaClient} from "@repo/db/client";
import dotenv from "dotenv";


const ws = new WebSocketServer({port: 8080});

interface User {
    ws: WebSocket,
    messages: string[],
    userId: string,
    convoId: string
}

const convo: User[] = [];

function checkUser(token: string): string | null {
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decode);
        if(typeof decode === "string"){
            return null;
        }
        if(!decode || !decode.id){
            return null;
        }
        return decode.userId;
    }catch(error){
        console.log("error", error);
        return null;
    }
}


ws.on("connection", function connection(ws, request) {
    const url = request.url;

    if(!url){
        return;
    }
    
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const convoId = new URLSearchParams(url.split("?")[2]);
    const token = queryParams.get("token") || "";

    const userId = checkUser(token);
    if(userId == null){
        ws.close();
        return null;
    }

    convo.push({
        userId,
        messages: [],
        ws,
        convoId
    })

    ws.on("message", async function message(data){
        const parseData = JSON.parse(data as unknown as string);

        console.log(parseData);

        if(parseData.type == "join_convo"){

        }
    })
})