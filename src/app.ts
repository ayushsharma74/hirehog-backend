import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
        credentials: true
    }
));
app.use(cookieParser())
app.use(express.json());
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";
import userRoutes from "./routes/user.routes";



app.use("/api", authRoutes);
app.use("/api", emailRoutes);
app.use("/api/user", userRoutes);

export { app };
