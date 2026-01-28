import express from "express";
import authRoute from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prismaClient } from "@repo/db/client";
import reqRouter from "./routes/request";



const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser());


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/chat", reqRouter);


async function startServer() {
    try{
        await prismaClient.$connect();
        console.log("DB is connected");

        app.listen(3001, () => {
            console.log("Server is running at port 3001")
        })
    }catch(error){
        console.log("Failed to connect db", error);
    }
}

startServer();