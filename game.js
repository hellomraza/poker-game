import { RANKS, SCORE, SUITS } from "./constant.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";



/**
 * @name Game
 * @description this class will create a new game
 * @property {array} players - the players of the game
 * @method dealt - this function will deal 5 cards to each player and store the cards in the player object
 * @method scoreAllPlayers - this function will score each player based on the insights of their hands and store the score in the player object
 * @method computeWinner - this function will compute the winner of the game
 * @method analyze - this function will analyze the hands of the player and return the insights
 * @param {number} numberOfPlayer
 * @returns Game
 * @example
 * const game = new Game(5);
 * 
 */

class Game extends Deck {
  constructor(numberOfPlayer) {
    super();
    this.players = new Array(numberOfPlayer)
      .fill()
      .map((_, index) => new Player(index + 1, []));
  }

  /**
   * @name dealt
   * @description this function will deal 5 cards to each player and store the cards in the player object
   * @returns void
   */

  dealt() {
    this.players.forEach((player) => (player.hands = this.deck.splice(-5)));
    console.log("Cards dealt.");
  }

  /**
   * @name scoreAllPlayers
   * @description this function will score each player based on the insights of their hands and store the score in the player object
   * @returns void
   */

  scoreAllPlayers() {
    this.players.forEach((player) => {
      const insights = this.analyze(player.hands);
      player.insights = insights;
      const { rankDuplicates, first, straight, flush } = insights;

      if (straight && flush && first === 65) {
        player.point = SCORE.ROYALFLUSH;
      } else if (straight && flush) {
        player.point = SCORE.STRAIGHTFLUSH;
      } else if (rankDuplicates[4] === 1) {
        player.point = SCORE.FOUROFAKIND;
      } else if (rankDuplicates[3] === 1 && rankDuplicates[2] === 1) {
        player.point = SCORE.FULLHOUSE;
      } else if (flush) {
        player.point = SCORE.FLUSH;
      } else if (straight) {
        player.point = SCORE.STRAIGHT;
      } else if (rankDuplicates[3] === 1) {
        player.point = SCORE.THREEOFAKIND;
      } else if (rankDuplicates[2] === 2) {
        player.point = SCORE.TWOPAIR;
      } else if (rankDuplicates[2] === 1) {
        player.point = SCORE.ONEPAIR;
      } else {
        player.point = SCORE.NOTHING;
      }
    });
    console.log(
      "All players scored. Player which got the less points will win the game"
    );
    console.table(
      this.players.map((p) => ({
        names: p.name,
        cards: p.hands.toString(),
        rank: Object.keys(SCORE)[p.point - 1],
        point: p.point,
      }))
    );
  }

  /**
   * @description this function will compute the winner of the game by comparing the insights of each player and return the winner
   * @returns winner - the winner of the game
   */

  computeWinner() {
    let winner = this.players[0];
    for (let index = 1; index < this.players.length; index++) {
      const currentPlayer = this.players[index];
      if (winner.point > currentPlayer.point) {
        winner = currentPlayer;
      } else if (winner.point === currentPlayer.point) {
        if (winner.point <= 5) {
          if (winner.insights.suits[0] > currentPlayer.insights.suits[0]) {
            winner = currentPlayer;
          } else if (
            winner.insights.suits[0] === currentPlayer.insights.suits[0]
          ) {
            if (winner.insights.ranks[0] > currentPlayer.insights.ranks[0]) {
              winner = currentPlayer;
            }
          }
        } else {
          if (winner.insights.ranks[0] > currentPlayer.insights.ranks[0]) {
            winner = currentPlayer;
          } else if (
            winner.insights.ranks[0] === currentPlayer.insights.ranks[0]
          ) {
            if (winner.insights.suits[0] > currentPlayer.insights.suits[0]) {
              winner = currentPlayer;
            }
          }
        }
      }
    }
    console.info("Player", winner.name, "Won the game...");
    // const score = Object.keys(SCORE)[winner.point - 1];
    return winner;
  }

  /**
   * @param {*} c
   * @param {*} a
   * @description this function will count the number of duplicates in an array
   * @returns c - the count of the duplicates
   */

  #count(c, a) {
    c[a] = (c[a] || 0) + 1;
    return c;
  }

  /**
   * @param hands
   * @description this function will analyze the hands of the player and return the following:
   * @returns suits, ranks, rankDuplicates, first, straight, flush
   */

  analyze(hands) {
    const suits = hands
      .map((f) => String.fromCharCode(68 - SUITS.indexOf(f[0])))
      .sort();

    const ranks = hands
      .map((f) => String.fromCharCode(77 - RANKS.indexOf(f[1])))
      .sort();
    const rankCounts = ranks.reduce(this.#count, {});
    const rankDuplicates = Object.values(rankCounts).reduce(this.#count, {});
    const first = ranks[0].charCodeAt(0);
    const straight = ranks.every(
      (f, index) => f.charCodeAt(0) - first === index
    );
    const flush = suits[0] === suits[4];
    return { suits, ranks, rankDuplicates, first, straight, flush };
  }
}

export { Game };
