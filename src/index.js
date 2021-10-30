// TODO: import from project

import Example from "./scripts/example.mjs"

document.addEventListener("DOMContentLoaded", () => {

    console.log("hello world!")
    const main = document.getElementById("main");
    new Example(main);
});