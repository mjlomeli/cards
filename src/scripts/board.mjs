/*
    Terminology of variables: educated by
    https://bicyclecards.com/how-to-play/solitaire
 */

class Board {
    constructor(...gridTemplateAreas){
        this.gridAreasStyle = gridTemplateAreas;
        this.index = {}
        this.areas = [];

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
        this.areas.forEach(key => this.index[key] = null);
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
            this.index[area] = div;
            this.rootElement.appendChild(div);
        });

    }

    enableDrop(area){

    }

    disableDrop(area){

    }
}


export {Board}