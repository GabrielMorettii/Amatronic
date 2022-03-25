import express from "express";
import '../typeorm';

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Olá dev!" });
});

export { app };
