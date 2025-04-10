import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";

app.use("/api", authRoutes);
app.use("/api", emailRoutes);

export { app };
