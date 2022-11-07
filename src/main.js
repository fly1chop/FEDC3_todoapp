import App from "./App.js";

const DUMMY_DATA = [
  {
    _id: 1,
    content: "Study Javascript",
    isCompleted: true,
  },
  {
    _id: 2,
    content: "Study React",
    isCompleted: false,
  },
  {
    _id: 3,
    content: "Study Typescript",
    isCompleted: false,
  },
];

const $target = document.querySelector("#app");

new App({ $target })


