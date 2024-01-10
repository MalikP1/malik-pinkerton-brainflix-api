// small .json files contains id, title, channel and image
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const SERVER_PORT = process.env.PORT || 8080;
const apiUrl = process.env.API_URL;
const videoRoutes = require("./routes/video");

app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
  console.log("Logging request from middleware.");
  next();
});

app.use("/images", express.static("./public/images"));

app.get("/", (request, response) => {
  response.send("<h1>Brainflix API</h1>");
});

app.use("/videos", videoRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on ${apiUrl}${SERVER_PORT}/`);
});
