import express from "express";
import setupDB from "./src/core/db.js";
import router from "./src/auth/user/user.controller.js";
const app = express();
const port = 3000;

setupDB();

app.use(express.json());

app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
