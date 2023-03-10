import { SCORE } from './constant.js';
import { Game } from './game.js';


const numOfPlayers = 5;


/**
 * @description this function will create a new game
 * @param {number} numOfPlayers
 * @returns game - the new game
 * @example
 * const game = new Game(5);
 */
const game = new Game(numOfPlayers);


/**
 * there are four stages to play the game
 * 1. suffle the deck
 * 2. deal the cards
 * 3. score all the players
 * 4. compute the winner
 * @example
 * game.suffle();
 * game.dealt();
 * game.scoreAllPlayers();
 * console.log(game.computeWinner());
 */

game.suffle();
game.dealt();
game.scoreAllPlayers();
game.computeWinner()
