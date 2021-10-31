class Example{
    constructor(ele) {
        this.ele = ele;
        this.ele.innerHTML = "<h1>I'm alive!</h1>";
        /* needs to bind
        this.handleClick = this.handleClick.bind(this);
        this.ele.addEventListener("click", this.handleClick);
         */

        // arrow function already binds for us
        this.ele.addEventListener("click", () => this.handleClick());
    }

    handleClick(){
        this.ele.children[0].innerText = "Ouch!";
    }
}


export default Example