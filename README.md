[![mjlomeli - cards](https://img.shields.io/static/v1?label=mjlomeli&message=cards&color=blue&logo=github)](https://github.com/mjlomeli/cards)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - cards](https://img.shields.io/github/issues/mjlomeli/cards)](https://github.com/mjlomeli/cards/issues)
<div align="left">

[![VIEW SITE - DOWN](https://img.shields.io/static/v1?label=VIEW+SITE&message=DOWN&color=D56049&style=for-the-badge&logo=digitalocean)](https://)

</div>

# Cards

## License

Released under [MIT](/LICENSE) by [@Mauricio](https://github.com/mjlomeli).

**Email** : [Mauricio](mailto:mauricio.jr.lomeli@gmail.com)

## Purpose

This is a recreation of the Solitaire card game entirely out of Javascript and HTML5. Its primary purpose is as a proof
of concept.

### In Cards, users will be able to:

* Drag and drop_test
* Card selection
* Reset game
* Visualize score
* More TBA after completion of above

### In addition, this project will include:

* A comprehensive README
* Instructional guide
* API referencing image and card data

### Technologies, Libraries, APIs

* Looking into sound libraries
* Looking into animation renderers (sfx)

## Structure

Have split the objects into 5 modules:

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
    - Datastructure is hash optimized.
4. Game
    - Player takes turns to solve the game.
    - Is all the logic for making the rules of the game.
5. Utilities
    - Cartesian product
    - Immutable matrix multiplication.
    - Checks system for compatible environments (e.g. Web or NodeJs).
    - Debugging tools.
    - Proxy tools.
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

- [x] List of technologies / libraries / APIs used.

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
         <a href="#">
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
