let socket = null;

let els = {
  join: {
    list: null,
    input: null,
    btn: null,
  },
  play: {
    sendBtn: null,
    answer: null,
    possibilities: null,
    backBtn: null,
  },
  result: {
    winner: null,
  },
};

let user = null;

const init = () => {
  socket = io();

  // Attach DOM
  const joinEl = document.querySelector(".join");
  els.join.list = joinEl.querySelector("ul");
  els.join.input = joinEl.querySelector("input");
  els.join.btn = joinEl.querySelector("button");

  const playEl = document.querySelector(".play");
  els.play.sendBtn = playEl.querySelector("button");
  els.play.answer = playEl.querySelector(".answer");
  els.play.possibilities = playEl.querySelector(".possibilities");
  els.play.backBtn = playEl.querySelector("span");

  els.result.winner = document.querySelector(".result span");

  // Attach DOM events
  els.join.btn.addEventListener("click", onClickJoinBtn);

  els.play.possibilities.addEventListener("click", onClickPossibilities);
  els.play.backBtn.addEventListener("click", onRemoveLetter);
  els.play.sendBtn.addEventListener("click", onClickSend);

  // Socket event listener
  socket.on("s-user-list", onServerUserList);
  socket.on("s-panel-wait", onServerPanelWait);
  socket.on("s-panel-play", onServerPanelPlay);
  socket.on("s-panel-result", onServerPanelResult);
};

window.addEventListener("load", init);
