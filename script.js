import CardGameWar from './card-game-war.js';

// DOM Selectors
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const text = document.querySelector('.text');
const playerDeckElement = document.querySelector('.player-deck');
const computerDeckElement = document.querySelector('.computer-deck');

const game = new CardGameWar({
  computerCardSlot,
  playerCardSlot,
  text,
  playerDeckElement,
  computerDeckElement
})

game.startGame()