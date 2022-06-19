<script lang="ts">
  
  var SUITS = {
    SPADES: "Spades",
    HEARTS: "Hearts",
    CLUBS: "Clubs",
    DIAMONDS: "Diamonds",
    JOKER: "Joker",
  };

  class Card {
    suit: string;
    value: number;

    constructor(suit: string = "Null", value: number = -1) {
      this.suit = suit;
      this.value = value;
    }
  }

  class Deck {
    cards: Card[];

    constructor(size: number = 0, joker: boolean = false) {
      this.cards = [];
      this.addCards(size, joker);
    }

    addCards(
      amount: number = 1,
      joker: boolean = false,
      card: Card = new Card()
    ) {
      if (card.suit == "Null") {
        if (joker) {
          var suits = 5;
        } else {
          var suits = 4;
        }
        for (var i = 0; i < amount; i++) {
          this.cards.push(
            new Card(
              Object.values(SUITS)[Math.floor(Math.random() * suits)],
              Math.floor(Math.random() * 13)
            )
          );
        }
      } else {
        for (var i = 0; i < amount; i++) {
          this.cards.push(card);
        }
      }
    }

    // Knuth Shuffle
    shuffle(): void {
      let currentIndex = this.cards.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[currentIndex], this.cards[randomIndex]] = [
          this.cards[randomIndex],
          this.cards[currentIndex],
        ];
      }
    }

    fullDeck(jokers: boolean = false): void {
      this.cards = [];
      for (let i = 1; i <= 13; i++) {
        this.cards.push(new Card(SUITS.HEARTS, i));
        this.cards.push(new Card(SUITS.DIAMONDS, i));
        this.cards.push(new Card(SUITS.SPADES, i));
        this.cards.push(new Card(SUITS.CLUBS, i));
      }
      if (jokers) {
        this.cards.push(new Card(SUITS.JOKER, 0));
        this.cards.push(new Card(SUITS.JOKER, 0));
      }
    }
  }

  class Hand extends Deck {
    visible: boolean;
    player: string;

    constructor(
      player: string,
      visible: boolean,
      size: number = 0,
      joker: boolean = false
    ) {
      super(size, joker);
      this.visible = visible;
      this.player = player;
    }

    getTop(): Card {
      var top = this.cards[0];
      this.cards.shift();
      return top;
    }

    addBottom(adds: Array<Card>): void {
      this.cards = this.cards.concat(adds);
    }
  }

  class War {
    players: Hand[];

    constructor(players: Array<string>) {
      this.players = [];
      for (let i = 0; i < players.length; i++) {
        this.players.push(new Hand(players[i], false));
      }
    }
  }
</script>

<style>
</style>
