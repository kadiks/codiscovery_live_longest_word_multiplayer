const onClickPossibilities = ({ target }) => {
  if (!target.matches("li")) {
    return;
  }

  const letter = target.textContent;

  els.play.backBtn.insertAdjacentHTML(
    "beforebegin",
    `<li class="${letter}">${letter}</li>`
  );

  target.remove();
};

const onClickSend = () => {
  showPanel("has-answered");
  const lis = els.play.answer.querySelectorAll("li");
  const letters = [];
  lis.forEach((el) => {
    letters.push(el.textContent);
  });

  const answer = letters.join("");

  const userAnswer = {
    ...user,
    answer,
  };

  socket.emit("c-send-answer", userAnswer);

  lis.forEach((el) => {
    el.remove();
  });
};

const onRemoveLetter = ({ target }) => {
  const lis = els.play.answer.querySelectorAll("li");
  const lastLi = lis[lis.length - 1];

  const letter = lastLi.textContent;

  els.play.possibilities.insertAdjacentHTML(
    "beforeend",
    `<li class="${letter}">${letter}</li>`
  );

  lastLi.remove();
};

const showLetters = (letters) => {
  els.play.possibilities.querySelectorAll("li").forEach((el) => {
    el.remove();
  });

  letters.forEach((letter) => {
    els.play.possibilities.insertAdjacentHTML(
      "beforeend",
      `<li class="${letter}">${letter}</li>`
    );
  });
};
