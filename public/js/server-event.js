const onServerPanelWait = () => {
  showPanel("waiting");
};

const onServerPanelPlay = (letters) => {
  showPanel("play");
  showLetters(letters);
};

const onServerPanelResult = (user) => {
  showPanel("result");
  showWinner(user);
};

const onServerUserList = (users) => {
  if (user !== null) {
    if (users[0].username === user.username) {
      els.join.btn.textContent = "Start";
    } else {
      els.join.btn.classList.add("hide");
    }
  }

  const lis = els.join.list.querySelectorAll("li").forEach((el) => el.remove());
  console.log("users", users);
  // els.join.list.querySelector()
  users.forEach((u) => {
    els.join.list.insertAdjacentHTML("beforeend", `<li>${u.username}</li>`);
  });
};
