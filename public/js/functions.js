const showPanel = (panelName) => {
  document.querySelectorAll(".panel").forEach((el) => {
    el.classList.add("hide");
  });

  document.querySelector(`.${panelName}`).classList.remove("hide");
};
