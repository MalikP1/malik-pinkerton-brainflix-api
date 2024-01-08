// small .json files contains id, title, channel and image

const express = require("express");

const app = express();

const videos = require("./data/videos.json");

const SERVER_PORT = 8080;

app.get("/", (request, response) => {
  response.send("<h1>Brainflix API</h1>");
});

app.get("/videos", (request, response) => {
  response.json(videos);
});

app.get("/videos/:id", (request, response) => {
  const videoId = request.params.id;

  const foundVideo = videos.find((video) => {
    return video.id === videoId;
  });

  if (!foundVideo) {
    response.status(404).json({ error: `id:${videoId} could not be found` });
  }
  response.status(200).json(foundVideo);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}/`);
});
