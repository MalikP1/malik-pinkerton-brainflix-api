const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();
const SERVER_PORT = process.env.PORT || 8080;
const apiUrl = process.env.API_URL;

function readVideos() {
  const file = fs.readFileSync("./data/videos.json");
  const data = JSON.parse(file);
  return data;
}

function updateVideos(data) {
  const stringified = JSON.stringify(data);
  fs.writeFileSync("./data/videos.json", stringified);
}

// router.get("/", (request, response) => {
//   const data = readVideos();
//   response.json(data);
// });

router.get("/", (request, response) => {
  const data = readVideos();
  response.status(200).json(
    data.map((videos) => {
      return {
        id: videos.id,
        title: videos.title,
        channel: videos.channel,
        image: apiUrl + SERVER_PORT + videos.image,
      };
    })
  );
});

router.get("/:id", (request, response) => {
  const videoId = request.params.id;
  const data = readVideos();

  const foundVideo = data.find((video) => {
    return video.id === videoId;
  });
  console.log(foundVideo.views + 1);
  if (!foundVideo) {
    response.status(404).json({ error: `id:${videoId} could not be found` });
  }
  response.status(200).json(foundVideo);
});

router.post("/", (request, response) => {
  console.log(request.body);
  const newVideo = {
    id: crypto.randomUUID(),
    title: request.body.title,
    channel: "Logged in user",
    image: "/images/Upload-video-preview.jpg",
    description: request.body.description,
    views: "1",
    likes: "0",
    duration: "0:00",
    video: "",
    timestamp: Date.now(),
    comments: [],
  };

  if (!newVideo.title && !newVideo.description) {
    response
      .status(404)
      .json({ error: "Please enter a title and description" });
  }
  if (!newVideo.title) {
    response.status(404).json({ error: "Please enter a title" });
  }

  if (!newVideo.description) {
    response.status(404).json({ error: "Please enter a description" });
  }
  const data = readVideos();
  data.push(newVideo);
  updateVideos(data);
  response.status(201).json(newVideo);
});

module.exports = router;
