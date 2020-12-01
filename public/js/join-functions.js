const onClickJoinBtn = () => {
  if (els.join.btn.textContent === "Start") {
    socket.emit("c-new-draw");
    return;
  }

  const username = els.join.input.value;
  const socketId = socket.id;
  user = {
    socketId,
    username,
  };
  socket.emit("c-new-user", user);

  els.join.input.classList.add("hide");
};
