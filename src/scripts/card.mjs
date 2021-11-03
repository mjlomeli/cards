import {isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";

class Card {
    constructor(frontImageUrl=null, backImageUrl=null){
        this.frontImageUrl = frontImageUrl;
        this.backImageUrl = backImageUrl;

        this.rootElement = null
        this.frontElement = null;
        this.frontImageElement = null;
        this.backElement = null;
        this.backImageElement = null;

        this.moved = false;
        this.onClick = null;
        this.onDragMouseDown = null;
        this.onElementDrag = null;
        this.onStopDragElement = null;
        this.dragdropstart = null;
        this.dragdropend = null;

        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }

    buildCard() {
        this.createCardElement();
    }

    createFrontElement(){
        if (this.frontImageUrl === null)
            throw new Error("No image url provided. Can't build the Card.")

        // Create the parts of the card
        this.frontElement = document.createElement('div');
        this.frontImageElement = document.createElement('img');
        this.frontElement.appendChild(this.frontImageElement);

        // Add data
        this.frontElement.setAttribute('class', 'card-side front');
        this.frontImageElement.setAttribute('src', this.frontImageUrl);
        return this.frontElement;
    }
    
    createBackElement() {
        if (this.backImageUrl === null)
            throw new Error("No image url provided. Can't build the Card.")

        // Create the parts of the card
        this.backElement = document.createElement('div');
        this.backImageElement = document.createElement('img');
        this.backElement.appendChild(this.backImageElement);

        // Add data
        this.backElement.setAttribute('class', 'card-side back');
        this.backImageElement.setAttribute('src', this.backImageUrl);

        // flip back card to face down, keeping the front face up
        this.backElement.classList.toggle('flip');
        
        return this.backElement;
    }

    createCardElement() {
        // Create the parts of the card
        this.rootElement = document.createElement('div');

        // Add meta data
        this.rootElement.setAttribute('class', 'card')

        this.rootElement.appendChild(this.createFrontElement());
        this.rootElement.appendChild(this.createBackElement());
    }

    flip() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        // classList access the css, we use .flip (note: doesn't need to have the same class name)
        if (!this.moved) {
            this.backElement.classList.toggle("flip");
            this.frontElement.classList.toggle("flip");
        }
    }

    enableFlippingOnClick() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        //save the bounded function to be able to remove the event listener later.
        this.onClick = this.flip.bind(this);
        this.rootElement.addEventListener("click", this.onClick);
    }

    disableFlippingOnClick() {
        this.rootElement.removeEventListener("click", this.onClick)
    }

    addCardAsChildToElement(element) {
        this.element ||= this.createCardElement();
        element.appendChild(this.element);
    }


    enableDragOnMouseClickHold() {
        this.onDragMouseDown = this.dragMouseDown.bind(this);
        this.rootElement.onmousedown = this.onDragMouseDown;
    }


    elementDrag(e) {
        this.moved = true;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        //TODO: ask why I don't have access to this.rootElement in this scope
        this.rootElement.style.top = (this.rootElement.offsetTop - this.pos2) + "px";
        this.rootElement.style.left = (this.rootElement.offsetLeft - this.pos1) + "px";
    }

    dragMouseDown(e) {
        this.moved = false;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        this.onElementDrag = this.elementDrag.bind(this);
        this.onStopDragElement = this.closeDragElement.bind(this);
        document.onmouseup = this.onStopDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.onElementDrag;
    }

    closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    disableDragOnMouseClickHold() {
        this.rootElement.onmousedown = null;
    }

    enableDragDrop(...ontoElements){
        ontoElements.forEach(elem => {
            elem.ondrop = this.getsDrop;
            elem.ondragover = this.givesDrop;
        });

        this.rootElement.draggable = true;
        this.dragdropstart = this.dragDropStart.bind(this);
        this.rootElement.ondragstart = this.dragdropstart;

        this.dragdropend = this.dragDropEnd.bind(this);
        this.rootElement.ondragend = this.dragdropend;
    }

    disableDragDrop(){
        this.rootElement.draggable = false;
        this.dragdropstart = null;
        this.rootElement.ondragstart = null;

        this.dragdropend = null;
        this.rootElement.ondragend = null;
    }

    givesDrop(event){
        // needs to be static method
        console.debug("Started givesDrop");
        event.preventDefault();
    }

    getsDrop(event){
        // needs to be static method
        event.preventDefault();
        console.debug("Started getsDrop");
        console.debug(`event.target.id = ${event.target.id}`);
        console.debug(`event.currentTarget.id = ${event.currentTarget.id}`);
        let data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }

    dragDropStart(event){
        console.debug("started to drag the element")
        console.debug(`event.target.id = ${event.target.id}`);
        console.debug(`event.currentTarget.id = ${event.currentTarget.id}`);

        // transferring the id of the element (aka, this.rootElement.id)
        event.dataTransfer.setData("Text", event.currentTarget.id);
    }

    dragDropEnd(){
        // nothing
    }

    contains(other){
        if (other instanceof Card)
            return this.equals(other);
        else {
            for (const property in this) {
                if (this[property] === other)
                    return true;
            }
        }
        return false;
    }

    toString(){
        return this.repr();
    }

    repr(){
        let frontImageUrl = JSON.stringify(this.frontImageUrl);
        let backImageUrl = JSON.stringify(this.backImageUrl);
        return `<Card(frontImageUrl=${frontImageUrl}, backImageUrl=${backImageUrl})>`;
    }

    equals(other){
        if (typeof other !== typeof this)
            return false;
        for (const property in this){
            if (other[property] !== this[property])
                return false;
        }
        return true;
    }
}

export { Card }