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

    addToBottom(cards: Array<Card>){
      for(let card in cards){
        this.cards.push(card);
      }8
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
    players: Map<string, Hand>;
    deck: Deck;
    table: Map<string, Card>;
    num_players: number;
    pot: Deck;

    constructor(players: Array<string>) {
      this.pot = new Deck();

      this.deck = new Deck();
      this.deck.fullDeck();

      this.table = new Map<string, Card>;
      this.players = new Map<string, Hand>;
      this.num_players = players.length;

      for (let i = 0; i < players.length; i++) {
        this.players.set(players[i], new Hand(players[i], false));
        this.table.set(players[i], new Card());
      }
    }

    deal(): void{
      const ids = Object.keys(this.players);
      let p = 0;
      while(this.deck.cards.length > 0){
        this.players[ids[p]].addCards(1, false, this.deck.getTop());
        p++;
        if (p >= this.num_players){
          p = 0;
        }
      }
    }
    
    playRound(): void{
      for(let player in this.players){
        this.table[player] = this.players[player].getTop();
      }

      let war = false;
      let biggest = {
        "player": "none",
        "value": 0
      };
      for(let player in this.table){
        if(this.table[player].value > biggest.value){
          biggest.value = this.table[player].value;
          biggest.player = player;
        } else if(this.table[player].value == biggest.value){
          war = true;
        }
      }

      if(!war){
        let tableCards = Object.entries(this.table);
        let temp = [];
        for(var i=0; i<tableCards.length; i++){
          temp.push(tableCards[i][1]);
        }
        this.players[biggest.player].addToBottom(temp);
      }
      // add code for 'wars'

      console.log(biggest.player)
    }
  }
</script>

<style>
</style>
