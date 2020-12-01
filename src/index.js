const http = require("http");
const express = require("express");
const IO = require("socket.io");

const cleanDict = require("./cleanDict");
const isWordInDict = require("./isWordInDict");
const pickLetters = require("./pickLetters");

cleanDict();

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = IO(server);

app.use(express.static("public"));

let users = [];
let userAnswers = [];

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("disconnect", () => {
    console.log("a user is disconnected");
  });

  // Client
  socket.on("c-new-user", (user) => {
    users.push(user);

    io.emit("s-user-list", users);
  });

  socket.on("c-new-draw", () => {
    startNewDraw(socket);
  });

  socket.on("c-send-answer", (data) => {
    console.log("data", data);

    const timestamp = Date.now();

    const isGoodAnswer = isWordInDict(data.answer);

    const answerLength = isGoodAnswer ? data.answer.length : 0;

    const userAnswer = {
      ...data,
      timestamp,
      isGoodAnswer,
      answerLength,
    };

    userAnswers.push(userAnswer);
  });

  // Server
  socket.emit("s-user-list", users);

  //   socket.on("c-message", (message) => {
  //     console.log("message server", message);
  //     io.emit("s-message", message);
  //   });

  //   socket.on("<name event>", (/** type serializable */) => {});
  /**
   * Serializable
   *  - String
   *  - Bool
   *  - Array
   *  - Object
   *  - Number
   *  - null
   *  - undefined
   */
});

const startNewDraw = () => {
  const letters = pickLetters();

  userAnswers = [];

  io.emit("s-panel-wait");
  setTimeout(() => {
    io.emit("s-panel-play", letters);
  }, 5000);

  setTimeout(() => {
    const goodAnswers = userAnswers.filter((u) => u.isGoodAnswer);
    goodAnswers.sort((a, b) => {
      return b.answerLength - a.answerLength;
    });
    goodAnswers.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

    const result = goodAnswers[0] || null;
    io.emit("s-panel-result", result);

    setTimeout(startNewDraw, 5000);
  }, 51000);
};

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
