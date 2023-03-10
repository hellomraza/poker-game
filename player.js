

/**
 * Player class
 * @param name
 * @param hands
 * @returns Player
 * @example
 * const player = new Player("John", ["H1", "H2", "H3", "H4", "H5"]);
 * @description this class will create a new player
 * @property {string} name - the name of the player
 * @property {array} hands - the hands of the player
 * @property {object} insights - the insights of the player
 * @property {number} point - the point of the player
 * 
 */

export class Player {
  constructor(name, hands) {
    this.hands = hands;
    this.name = name;
    this.insights = null;
    this.point = null;
    console.log("Player " + name + " created.");
  }
}