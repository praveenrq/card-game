// src/components/CardModel.js
class CardModel {
  constructor() {
    this.name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 4)
      .toUpperCase();
  }
}

export default CardModel;
