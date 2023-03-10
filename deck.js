import { RANKS, SUITS } from "./constant.js";



/**
 * @name Deck
 * @example
 * const deck = new Deck();
 * @description this class will create a new deck
 * @property {array} deck - the deck of the game
 * @method suffle - this function will suffle the deck
 * @private #swap - this function will swap the card in the deck
 * 
 */
export class Deck {
  constructor() {
    this.deck = [];

    for (let suit of SUITS) {
      for (let rank of RANKS) {
        this.deck.push(suit + rank);
      }
    }

    console.log("Desck created of 52 cards.");
  }

  /**
   * @name suffle
   * @description this function will suffle the deck
   * @returns void
   */

  suffle() {
    for (let i = 0; i < 100; i++) {
      let r1 = Math.floor(Math.random() * 52);
      let r2 = Math.floor(Math.random() * 52);
      this.#swap(r1, r2);
    }
    console.log("Deck suffled.");
  }

  /**
   * @name #swap
   * @description this function will swap the card in the deck
   * @param {number} a
   * @param {number} b
   * @returns void
   * @private function
   */

  #swap(a, b) {
    [this.deck[a], this.deck[b]] = [this.deck[b], this.deck[a]];
  }
}
