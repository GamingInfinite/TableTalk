<script lang="ts">
  //lol
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

    getTop(): Card {
      var top = this.cards[0];
      this.cards.shift();
      return top;
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

    addBottom(adds: Array<Card>): void {
      this.cards = this.cards.concat(adds);
    }
  }

  class War {
    players: Hand[];
    deck: Deck;

    constructor(players: Array<string>) {
      this.deck = new Deck();
      this.deck.fullDeck();
      this.players = [];
      for (let i = 0; i < players.length; i++) {
        this.players.push(new Hand(players[i], false));
      }
    }

    deal(): void{
      var p = 0;
      while(this.deck.cards.length > 0){
        this.players[p].addCards(1, false, this.deck.getTop());
        p++;
        if (p >= this.players.length){
          p = 0;
        }
      }
    }
  }
</script>

<style>
</style>
