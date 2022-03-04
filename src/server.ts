import express from "express";
import routes from "./controller/router";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`listening on port ${port}! 😎`));
