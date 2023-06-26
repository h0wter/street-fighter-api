import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

const port = 3050;
app.listen(port, () => {
  console.log(`Server running. Use our API on: http://localhost:${port}`);
});

export { app };
