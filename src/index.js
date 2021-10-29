import Example from "./scripts/example.js"

document.addEventListener("DOMContentLoaded", () => {

    console.log("hello world!")
    const main = document.getElementById("main");
    new Example(main);
});