import jwt from "jsonwebtoken";
import type { NextFunction, Response, Request } from "express";
import { User } from "./models/user.model";

interface JwtUserPayload extends jwt.JwtPayload {
  email: string;
  id: string;
}

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("AUTH CHECK");
  
  try  {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log("COOKIES :",  req.cookies);
    

    console.log(token);

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "default_dev_secret") as JwtUserPayload;
    console.log(decodedToken);

    if (!decodedToken) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }

    const user = await User.findOne({ googleId: decodedToken.id });


    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; 
    }

    console.log("USER FOUND", user);

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};
