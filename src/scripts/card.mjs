import {debug, isBrowser, isNodeJs, openJson, projectDirectory} from "./utilities/utilities.mjs";

class Card {
    static sound = new Sound('../src/sounds/card_flip.mp3');
    static dropReceivers = {};
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
        this.ondragover = null;

        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;

        this.enabled = true;
    }

    buildCard() {
        this.createCardElement();
    }

    createCardElement() {
        // Create the parts of the card
        this.rootElement = document.createElement('div');

        // Add meta data
        this.rootElement.setAttribute('class', 'card')
        this.rootElement.draggable = false;

        this.rootElement.appendChild(this.createFrontElement());
        this.rootElement.appendChild(this.createBackElement());
    }

    createFrontElement(){
        if (this.frontImageUrl === null)
            throw new Error("No image url provided. Can't build the Card.")

        // Create the parts of the card
        this.frontElement = document.createElement('div');
        this.frontImageElement = document.createElement('img');
        this.frontElement.draggable = false;
        this.frontImageElement.draggable = false;
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
        this.backElement.draggable = false;
        this.backImageElement.draggable = false;
        this.backElement.appendChild(this.backImageElement);

        // Add data
        this.backElement.setAttribute('class', 'card-side back');
        this.backImageElement.setAttribute('src', this.backImageUrl);

        // flip back card to face down, keeping the front face up
        this.backElement.classList.toggle('flip');
        
        return this.backElement;
    }

    flip() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        // classList access the css, we use .flip (note: doesn't need to have the same class name)
        if (!this.moved) {
            this.backElement.classList.toggle("flip");
            this.frontElement.classList.toggle("flip");
            Card.sound.play();
        }
    }

    flipUp(){
        if (!this.isVisible()) {
            this.flip();
        }
    }

    flipDown(){
        if (this.isVisible()) {
            this.flip();
        }
    }

    isVisible(){
        // checks if the front-side is facing down
        return this.backElement.classList.contains('flip');
    }

    enableFlippingOnClick() {
        // if the backside card isn't already flipped, it must be flipped
        // but our createElement will already flip it for us.
        // this.backElement.classList.toggle('flip');

        //save the bounded function to be able to remove the event listener later.
        this.rootElement.addEventListener("click", () => {
            this.flip();
        });
    }

    disableFlippingOnClick() {
        this.rootElement.onclick = null;
    }


    enableDragOnMouseClickHold() {
        this.onDragMouseDown = this.dragMouseDown.bind(this);
        this.rootElement.onmousedown = this.onDragMouseDown;
        this.rootElement.draggable = true;
    }


    elementDrag(e) {
        if (this.enabled) {
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
    }

    dragMouseDown(e) {
        if (this.enabled) {
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
    }

    closeDragElement() {
        if (this.enabled) {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    disableDragOnMouseClickHold() {
        this.rootElement.onmousedown = null;
        this.rootElement.draggable = false;
    }

    enableDragDrop(){
        this.rootElement.draggable = true;
        this.rootElement.classList.add('cursor-grab');
        this.rootElement.classList.remove('cursor-default');
        this.dragdropstart = this.dragDropStart.bind(this);
        this.rootElement.ondragstart = this.dragdropstart;

        this.dragdropend = this.dragDropEnd.bind(this);
        this.rootElement.ondragend = this.dragdropend;

        this.ondragover = this.onDragOver.bind(this);
        this.rootElement.ondragover = this.ondragover
    }

    disableDragDrop(){
        debug.event("disabledDragDrop", "started");
        this.rootElement.draggable = false;
        this.rootElement.classList.remove('cursor-grab');
        this.rootElement.classList.add('cursor-default');
        debug.log(`${this.rootElement.id} style='cursor-default'`);

        this.dragdropstart = null;
        this.rootElement.ondragstart = null;

        this.dragdropend = null;
        this.rootElement.ondragend = null;

        this.ondragover = null;
        this.rootElement.ondragover = null;
        debug.event("disabledDragDrop", "finished");
    }


    static enableGetsDrop(indexId, element){
        Card.dropReceivers[indexId] = element;
        element.ondrop = Card.getsDrop;
        element.ondragover = Card.givesDrop;
    }

    static disableGetsDrop(indexId){
        Card.dropReceivers[indexId].ondrop = null;
        Card.dropReceivers[indexId].ondragover = null;
        delete Card.dropReceivers[indexId];
    }

    static givesDrop(event){
        // needs to be static method
        debug.func("givesDrop", "started");
        event.preventDefault();
        debug.func("givesDrop", "finished");
    }

    static getsDrop(event){
        // needs to be static method
        debug.func("getsDrop", "started");
        event.preventDefault();

        let currentTargetId = event.currentTarget.id;
        let targetId = event.target.id;
        let data = event.dataTransfer.getData("Text");

        console.debug(`event.target.id = ${targetId}`);
        console.debug(`event.currentTarget.id = ${currentTargetId}`);
        console.debug(`event.dataTransfer.getData("Text") => ${data}`)

        if (currentTargetId === '' || currentTargetId === undefined)
            throw new Error("Current target must have an id");
        if (data === '' || data === undefined)
            throw new Error("Draggable object must have an id");
        event.target.appendChild(document.getElementById(data));
        debug.func("getsDrop", "finished");
    }

    dragDropStart(event){
        if (this.enabled) {
            debug.event("dragDropStart", "started");
            let currentTargetId = event.currentTarget.id;
            let targetId = event.target.id;

            debug.log(`started to drag the ${currentTargetId}`)
            //debug.log(`event.target.id = ${targetId}`);
            //debug.log(`event.currentTarget.id = ${currentTargetId}`);

            if (currentTargetId === '' || currentTargetId === undefined)
                throw new Error("Current target must have an id");

            // transferring the id of the element (aka, this.rootElement.id)
            event.dataTransfer.setData("Text", event.currentTarget.id);
            debug.event("dragDropStart", "finished");
        }
    }

    dragDropEnd(){
        // nothing
    }

    onDragOver(e){

    }

    disable(){
        this.enabled = false;
    }

    enable(){
        this.enabled = true;
    }

    isEnabled(){
        return this.enabled;
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

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute('class', 'audio');
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        let promise = this.sound.play()
        if (promise !== undefined){
            promise.then(_=> {
                debug.log("autoplay has started.");
            }).catch(error => {
                debug.error("Autoplay was prevented. Show a \"Play\" button so that user can start playback.")
            })
        }
    }
    this.pause = function(){
        this.sound.pause();
    }
    this.stop = function(){
        this.sound.stop();
    }
    this.restart = function(){
        this.sound.start
    }
    this.mute = function (){
        this.sound.muted = true;
    }
    this.unmute = function (){
        this.sound.muted = false;
    }
    this.sound.addEventListener('ended', () => {
       this.sound.currentTime = 0;
    });
}

export { Card }