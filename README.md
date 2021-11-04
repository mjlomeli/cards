[![mjlomeli - cards](https://img.shields.io/static/v1?label=mjlomeli&message=cards&color=blue&logo=github)](https://github.com/mjlomeli/cards)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - cards](https://img.shields.io/github/issues/mjlomeli/cards)](https://github.com/mjlomeli/cards/issues)
<div align="left">

[![VIEW SITE - DOWN](https://img.shields.io/static/v1?label=VIEW+SITE&message=DOWN&color=D56049&style=for-the-badge&logo=digitalocean)](https://http://mauriciois.me/cards/)

</div>

# Cards

## License

Released under [MIT](/LICENSE) by [@Mauricio](https://github.com/mjlomeli).

**Email** : [Mauricio](mailto:mauricio.jr.lomeli@gmail.com)

## Purpose

This is a recreation of the Solitaire card game entirely out of Javascript and HTML5. Its primary purpose is as a proof
of concept.

#Welcome to MoveItThere!
##Rules
#### Your may transfer any top card  faced up  to any of the piles but maintain the sequence of descending value and alternating color. An empty spot in the Tableau may be filled with a king. If you cannot move any cards from the Tableau, 1 card may be drawn from the Stock pile and placed in the Talon.

#### When foundations have been filled in ascending order (Ace to King with the "+
        "same colors), the game is won. If no more moves can be made and "+
        "the Foundations is incomplete, the game is lost.";
    elementRoot.appendChild(p2);


### In Cards, users will be able to:

* Drag and drop_test
* Card selection
* Restart the game after finishing.
* More TBA after completion of above

### In addition, this project will include:

* A comprehensive README
* Instructional guide

### Technologies, Libraries, APIs

* Used a mp3 to make sounds of the cards.
* Made a version of the Cartesian Product from Python's documentation.

## Structure

Split the objects into 5 modules:

1. Card
    - Has a shape
    - Front face image
    - Back face image
    - Flippable
    - Id
    - Draggable
2. Deck
    - Is a data structure of Cards.
    - Shuffles
    - Draws card(s)
3. Board
    - Links cards to positions on a grid.
    - Background
    - Datastructures are hash optimized.
4. Game
    - Player takes turns to solve the game.
    - Is all the logic for making the rules of the game.
5. Utilities
    - Cartesian product
    - Immutable matrix multiplication.
    - Checks system for compatible environments (e.g. Web or NodeJs).
    - Debugging tools.
    - Proxy tools for more customizations.
    - Directory and file operations.
6. Tutorial
   - Display instructions for the player to learn how to play.
   - Pops up quotes.

## Goals

#### Day 1: _Wireframe & UML_

* _Design a wireframe concept and upload design details._

<img src="./docs/wireframe.png" alt="wireframe">
<img src="./docs/uml.png" alt="card">

#### Day 2: _Skeleton Setup_

- Create the skeleton of each structure
- Test on command line

#### Day 3: _Canvas Skeleton_

- Create the objects.

#### Day 4: _Apply Objects_

- Bind the objects to events.

#### Day 5: _Debug_


#### Day 6-7: _Improve Project_
- Improve the game with additional visuals.

## Checklist

### Live Project

- [x] Includes links to your Github and LinkedIn.

- [x] Landing page/modal with obvious, clear instructions.

- [x] Interactivity of some kind.

- [x] Well styled, clean frontend.

- [x] If it has music, the option to mute or stop it.

### Production README

- [x] Link to live version.

- [ ] Instructions on how to play/interact with the project.

- [x] List of technologies / libraries.

- [ ] Technical implementation details with (good-looking) code snippets.

- [x] To-dos / future features.

- [X] No .DS_Store files / debuggers / console.logs.

- [X] Organized file structure, with /src and /dist directories.

### Contributors

<table>
  <tr>
      <td id="mauricio" align="center">
         <a href="https://github.com/mjlomeli">
         <img src="https://avatars.githubusercontent.com/u/46548793?v=4" width="100px;" alt=""/><br />
         <sub><b>Mauricio Lomeli</b></sub></a><br />
         <label>Code</label>
      </td>
      <td id="charis" align="center">
         <a href="https://github.com/Eruanne2">
         <img src="https://avatars.githubusercontent.com/u/67379065?v=4" width="100px;" alt=""/><br />
         <sub><b>Charis Ginn</b></sub></a><br />
         <label>Mentor</label>
      </td>
      <td id="paulo" align="center">
         <a href="https://www.linkedin.com/in/paulo-bocanegra">
         <img src="https://secure.gravatar.com/avatar/c90a96bff8b9b6d8b373f26e17851899?secure=true&size=300" width="100px;" alt=""/><br />
         <sub><b>Paulo Bocanegra</b></sub></a><br />
         <label>Debugging</label>
      </td>
      <td id="mike" align="center">
         <a href="https://github.com/mwmadsen67">
         <img src="https://avatars.githubusercontent.com/u/45531900?v=4" width="100px;" alt=""/><br />
         <sub><b>Mike Madsen</b></sub></a><br />
         <label>Debugging</label>
      </td>
   </tr>
</table>
