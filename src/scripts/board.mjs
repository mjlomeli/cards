/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */
import {Deck} from "./deck.mjs";
import {Card} from "./card.mjs";

class Board {
    constructor(...gridTemplateAreas){
        this.gridAreasStyle = gridTemplateAreas;
        this.elementIndex = {}
        this.areas = [];
        this.deckIndex = {};

        this.rootElement = null;

    }

    buildBoard(){
        this.filter();
        this.createGridContainer()
    }

    filter(){
        let set = new Set();
        this.gridAreasStyle.forEach(row => {
            row.split(" ").forEach(set.add, set)
        });
        this.areas = Array.from(set);
        this.areas.forEach(key => this.elementIndex[key] = null);
        this.areas.forEach(key => this.deckIndex[key] = new Deck());
    }

    createGridContainer(){
        this.rootElement = document.createElement('div');
        this.rootElement.className = "grid-container";
        let style = this.gridAreasStyle.map(r =>`'${r}'`);
        this.rootElement.style = `grid-template-areas:${style.join(' ')}`;

        this.areas.forEach(area => {
            let div = document.createElement('div');
            div.className = "grid-item";
            div.style = `grid-area: ${area}`;
            div.id = `${area}`;
            this.elementIndex[area] = div;
            this.rootElement.appendChild(div);
        });
    }

    enableDrop(area){
        Card.enableGetsDrop(area, this.elementIndex[area]);
    }

    disableDrop(area){
        Card.disableGetsDrop(area);
    }
}


export {Board}