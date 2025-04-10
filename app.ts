import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";
import userRoutes from "./routes/user.routes";



app.use("/api", authRoutes);
app.use("/api", emailRoutes);
app.use("/api/user", userRoutes);

export { app };
