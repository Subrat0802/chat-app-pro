import express from "express";
import { middleware } from "../middleware/middleware";
import { acceptRequest, findPeople, getAllFriends, getAllRequest, getMessages, openConversation, sendMessage, sendRequest } from "../controllers/request";

const reqRouter = express.Router();

reqRouter.get("/findPeople", middleware, findPeople)
reqRouter.post("/sendRequest", middleware, sendRequest)
reqRouter.get("/getAllRequest", middleware, getAllRequest);
reqRouter.post("/acceptRequest", middleware, acceptRequest);
reqRouter.get("/getAllFriends", middleware, getAllFriends);
reqRouter.post("/openConversation", middleware, openConversation);
reqRouter.post("/sendMessage", middleware, sendMessage);
reqRouter.get("/getMessages/:conversationId", middleware, getMessages);


export default reqRouter;