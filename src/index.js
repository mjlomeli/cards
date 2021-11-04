import Example from "./scripts/example.mjs"


document.addEventListener("DOMContentLoaded", () => {
    // This is the main for all HTML contenten to render
    console.log("hello world!")
    const main = document.getElementById("main");
    new Example(main);


    const div = document.createElement('div');
    div.textContent
    document.body.append(div)

});
