export class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}
var Suits;
(function(Suits2) {
  Suits2["CLUBS"] = "Clubs";
  Suits2["HEARTS"] = "Hearts";
  Suits2["SPADES"] = "Spades";
  Suits2["DIAMONDS"] = "Diamonds";
  Suits2["JOKER"] = "Joker";
})(Suits || (Suits = {}));
var CardTypes;
(function(CardTypes2) {
  CardTypes2[CardTypes2["ACE"] = 1] = "ACE";
  CardTypes2[CardTypes2["TWO"] = 2] = "TWO";
  CardTypes2[CardTypes2["THREE"] = 3] = "THREE";
  CardTypes2[CardTypes2["FOUR"] = 4] = "FOUR";
  CardTypes2[CardTypes2["FIVE"] = 5] = "FIVE";
  CardTypes2[CardTypes2["SIX"] = 6] = "SIX";
  CardTypes2[CardTypes2["SEVEN"] = 7] = "SEVEN";
  CardTypes2[CardTypes2["EIGHT"] = 8] = "EIGHT";
  CardTypes2[CardTypes2["NINE"] = 9] = "NINE";
  CardTypes2[CardTypes2["TEN"] = 10] = "TEN";
  CardTypes2[CardTypes2["JACK"] = 11] = "JACK";
  CardTypes2[CardTypes2["QUEEN"] = 12] = "QUEEN";
  CardTypes2[CardTypes2["KING"] = 13] = "KING";
  CardTypes2[CardTypes2["JOKER"] = 0] = "JOKER";
})(CardTypes || (CardTypes = {}));
export class Deck {
  constructor(jokers) {
    this.deck = [];
    for (let i = 1; i < 14; i++) {
      this.deck.push(new Card(Suits.HEARTS, i));
      this.deck.push(new Card(Suits.DIAMONDS, i));
      this.deck.push(new Card(Suits.SPADES, i));
      this.deck.push(new Card(Suits.CLUBS, i));
    }
    if (jokers) {
      this.deck.push(new Card(Suits.JOKER, 0));
      this.deck.push(new Card(Suits.JOKER, 0));
    }
  }
  shuffle() {
    var randDeck = [];
    while (this.deck.length > 0) {
      var randPick = Math.floor(Math.random() * this.deck.length);
      randDeck.push(this.deck[randPick]);
      this.deck.splice(randPick, 1);
    }
    this.deck = randDeck;
  }
}
export class Hand {
  getTop() {
    let top = this.hand[0];
    this.hand.shift();
    return top;
  }
  add(adds) {
    this.hand = this.hand.concat(adds);
  }
}
