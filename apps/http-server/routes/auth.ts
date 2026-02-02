import express from "express";
import { me, signin, signup } from "../controllers/auth";
import { middleware } from "../middleware/middleware";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.get("/me", middleware, me)

export default authRoute;