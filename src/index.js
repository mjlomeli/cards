import {isNodeJs, isBrowser, debug} from "./scripts/utilities/utilities.mjs";
import {SolitaireGame} from "./scripts/solitaire_game.mjs";
import {Card} from "./scripts/card.mjs";
import {introduction, profile} from "./scripts/tutorial.mjs";


var main = function(){
    // code to run
    document.addEventListener("DOMContentLoaded", async () => {
        document.body.appendChild(profile())
        Card.initSound();

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        let audio_context = new AudioContext;

        let audioButton = document.createElement('button');
        audioButton.setAttribute('class', 'audio-button');
        let m = document.createElement('i');
        m.className = "fa fa-volume-mute"
        m.id = "audio-icon";
        audioButton.appendChild(m);
        Card.sound.mute();

        audioButton.addEventListener('click', (e) => {
            if(audio_context.state === 'running') {
                audio_context.suspend();
            } else if(audio_context.state === 'suspended') {
                audio_context.resume().then(function() {
                    // resumed
                });
            }
            if (Card.sound.sound.muted)
                m.className = "fas fa-volume-up";
            else
                m.className = "fa fa-volume-mute";
            Card.sound.sound.muted = !Card.sound.sound.muted;
        });

        document.body.appendChild(audioButton);

        window.SOUNDS = Card.sound;

        let game = new SolitaireGame();
        window.game = game; // for debugging

        await game.start();
        game.enableStockDrawOnClick();
        document.body.appendChild(introduction(game.rootElement));

        game.rootElement.on
    });
}

// Way of detecting if running off Node.js or Browser
if (isBrowser() || isNodeJs()){
    main();
}


