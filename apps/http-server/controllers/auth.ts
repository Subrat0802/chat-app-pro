import { type CookieOptions, type Request, type Response } from "express";
import { signinValidation, signupValidation } from "../config/authValidation";
import { prismaClient } from "@repo/db/client";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } =
      await signupValidation.parseAsync(req.body);

    const checkUserEmail = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (checkUserEmail) {
      return res.status(404).json({
        message: "User already present, try different email",
        success: false,
      });
    }

    const checkUsername = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (checkUsername) {
      return res.status(404).json({
        message: "Username already present, try different username",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prismaClient.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    if (!response) {
      return res.status(404).json({
        message: "Error while creatig user id",
        success: false,
      });
    }

    res.status(200).json({
      message: "User signup successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    let errorMessage = "Something went wrong, server!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(500).json({
      message: "Internal server error please try again.",
      success: false,
      error: errorMessage,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = await signinValidation.parseAsync(
      req.body,
    );

    const orConditions = [];

    if (email) {
      orConditions.push({ email });
    }

    if (username) {
      orConditions.push({ username });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        OR: orConditions,
      },
    });

    if(!user){
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(404).json({
        message: "incorreect Password",
        success: false,
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(403).json({
        message: "Missing jwt token",
        success: false,
      });
    }

    const token = await jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    const options: CookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    (user as any).password = undefined;

    res.cookie("token", token, options).status(200).json({
      message: "User signin successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    let errorMessage = "Something went wrong, server!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(500).json({
      message: "Internal server error please try again.",
      success: false,
      error: errorMessage,
    });
  }
};

