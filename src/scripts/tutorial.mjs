function popupIntroBox(elementMessage) {
    // Credit goes to Mark Malignan
    // https://codepen.io/MarcMalignan/pen/xByvJ
    function divClass(tag, className) {
        let ele = document.createElement(tag);
        ele.className = className;
        return ele;
    }

    let movingZone = divClass('div', 'moving-zone');
    let popup = divClass('div', 'popup');
    let popupContent = divClass('div', 'popup-content');
    let popupText = divClass('div', 'popup-text');

    popupContent.appendChild(popupText);
    popup.appendChild(popupContent);
    movingZone.appendChild(popup);

    popupText.appendChild(elementMessage);


    return movingZone;
}

function popupMiniBox(elementMessage) {
    function divClass(tag, className) {
        let ele = document.createElement(tag);
        ele.className = className;
        return ele;
    }

    let movingZone = divClass('div', 'moving-zone-mini');
    let popup = divClass('div', 'popup-mini');
    let popupContent = divClass('div', 'popup-content-mini');
    let popupText = divClass('div', 'popup-text-mini');

    popupContent.appendChild(popupText);
    popup.appendChild(popupContent);
    movingZone.appendChild(popup);

    popupText.appendChild(elementMessage);

    return movingZone;
}


function introduction(nextElementTransition) {
    let elementRoot = document.createElement('div');

    let header = document.createElement('h1');
    header.textContent = "Welcome to MoveItThere!";
    elementRoot.appendChild(header);

    let rulesHeader = document.createElement('h2');
    rulesHeader.textContent = "Rules";
    elementRoot.appendChild(rulesHeader);

    let p1 = document.createElement('p');
    p1.textContent = "Your may transfer any top card  faced up  to any of the piles but maintain the "+
        "sequence of descending value and alternating color. An empty spot in the Tableau may be " +
        "filled with a king. If you cannot move any cards from the Tableau, "+
        " 1 card may be drawn from the Stock pile and placed in the Talon.";
    elementRoot.appendChild(p1);

    let p2 = document.createElement('p');
    p2.textContent = "When foundations have been filled in ascending order (Ace to King with the "+
        "same colors), the game is won. If no more moves can be made and "+
        "the Foundations is incomplete, the game is lost.";
    elementRoot.appendChild(p2);

    let p3 = document.createElement('p');
    p3.textContent = "Refresh the page to begin again.";
    elementRoot.appendChild(p3);

    let beginButton = document.createElement('button');
    beginButton.textContent = "Click To Begin"
    elementRoot.appendChild(beginButton);

    let movingPopup = popupIntroBox(elementRoot);

    beginButton.addEventListener("click", (e) => {
        movingPopup.remove();
        document.body.appendChild(nextElementTransition);
        quotes();
    });


    document.body.addEventListener('mousemove', movement);
    return movingPopup;
}

function movement(e) {
    let popup = document.querySelector('.popup');
    let popupMini = document.querySelector('.popup-mini');

    var moveForce = 30;
    var rotateForce = 15;


    var docX = document.body.clientWidth;
    var docY = document.body.clientHeight;

    var moveX = (e.pageX - docX / 2) / (docX / 2) * -moveForce;
    var moveY = (e.pageY - docY / 2) / (docY / 2) * -moveForce;

    var rotateY = (e.pageX / docX * rotateForce * 2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce * 2) - rotateForce);

    if (popup !== null) {
        popup.style.left = moveX + 'px';
        popup.style.top = moveY + 'px';
        popup.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }else if (popupMini !== null) {
        popupMini.style.left = moveX + 'px';
        popupMini.style.top = moveY + 'px';
        popupMini.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }
}

function quotes() {
    function selfClosingMessage(message, seconds) {
        let div = document.createElement('div');
        div.textContent = message;
        let box = popupMiniBox(div);
        setTimeout(() => box.remove(), seconds * 1000);
        return box;
    }

    let quote1 = "I've been stuck in quarantine with a deck of cards.";
    document.body.append(selfClosingMessage(quote1, 10));
    let quote2 = "I guess you could say I'm in solitaire confinement.";
    setTimeout(() => document.body.append(selfClosingMessage(quote2, 10)), 30 * 1000);
    let quote3 = "You've probably heard of this game's more successful brother?";
    setTimeout(() => document.body.append(selfClosingMessage(quote3, 10)), 60 * 1000);
    let quote4 = "Uno";
    setTimeout(() => document.body.append(selfClosingMessage(quote4, 10)), 75 * 1000);
    let quote5 = "When you play MoveItThere...";
    setTimeout(() => document.body.append(selfClosingMessage(quote5, 10)), 110 * 1000);
    let quote6 = "You're the best in the room!";
    setTimeout(() => document.body.append(selfClosingMessage(quote6, 10)), 130 * 1000);
    let quote7 = "Why doesn't Batman like solitaire?"
    setTimeout(() => document.body.append(selfClosingMessage(quote7, 10)), 180 * 1000);
    let quote8 = "There's no joker";
    setTimeout(() => document.body.append(selfClosingMessage(quote8, 10)), 200 * 1000);
    let quote9 = "Move it there!";
    setTimeout(() => document.body.append(selfClosingMessage(quote9, 10)), 240 * 1000);
    let quote10 = "Chuck Norris can win at MoveItThere with only 18 cards.";
    setTimeout(() => document.body.append(selfClosingMessage(quote10, 10)), 270 * 1000);
}



function profile(){
    let linkedin = document.createElement('a');
    linkedin.href = "https://www.linkedin.com/in/mauricio-l-759796172/";
    linkedin.target = "_blank";
    let linkImage = document.createElement('img');
    linkImage.src = "src/themes/profile/linkedin.png";
    linkImage.alt = "linkedin logo";
    linkImage.className = "link-image";
    linkedin.appendChild(linkImage);


    let github = document.createElement('a');
    github.href = "https://github.com/mjlomeli"
    github.target = "_blank";
    let gitImage = document.createElement('img');
    gitImage.src = "src/themes/profile/github.svg";
    gitImage.alt = "github logo";
    gitImage.className = "git-image";
    github.appendChild(gitImage);

    let div = document.createElement('div');
    div.className = "profile";
    div.appendChild(github);
    div.appendChild(linkedin);
    return div;
}

export {introduction, quotes, popupIntroBox, profile}
