const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    text: "Good Morning",
    user: "Nicole",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", (req, res) => {
  const user = req.body.user;
  const text = req.body.text;

  messages.push({ text: text, user: user, added: new Date() });

  res.redirect("/");
});

indexRouter.get("/messages/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const message = messages[id];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messages/message", { message });
});

module.exports = indexRouter;
