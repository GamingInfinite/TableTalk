<script lang="ts">
  // BEFORE THIS IS USED, REMOVE TESTING codePointAt
//  |
//  |
//  V

class Card{
	constructor(suit="null", value=-1){
		this.suit = suit;
		this.value = value;
	}
}
	
class Player{
	constructor(ID){
		this.ID = ID;
		this.hand = [];
		this.playSpot = new Card();
		this.died = 0;
	}
	
	getTop(){
		return this.hand.pop(0);
	}
	
	playTop(){
		if (this.playSpot.suit == "null"){
			this.playSpot = this.getTop();
			console.log(this.ID," played ",this.playSpot);
		} else {
			console.log(this.ID," kept thier current card, ",this.playSpot);
		}
	}
	
	addToBottom(cards){
		if (cards instanceof Card){
			this.hand.push(cards);
		}else{
			this.hand = cards.concat(this.hand);
		}
		console.log(this.ID, " got ", cards);
	}
}

class Table{
	constructor(player_IDs){
		this.players = [];
		for (var i = 0; i < player_IDs.length; i++) {
			this.players.push(new Player(player_IDs[i]));
		}
		this.pot = [];
		this.highest = {"ID": null,
						"value": 0};
		this.ties = [];
	}
	
	deal(){
		//Full Deck Code
		const deck = [];
		for (let i = 1; i <= 13; i++) {
			deck.push(new Card("Hearts", i));
			deck.push(new Card("Diamonds", i));
			deck.push(new Card("Spades", i));
			deck.push(new Card("Clubs", i));
		}
		
		//Shuffle
		
		let currentIndex = 52,
			randomIndex;

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[deck[currentIndex], deck[randomIndex]] = [
			  deck[randomIndex],
			  deck[currentIndex],
			];
		}
		
		//Deal to Players
		var p = 0;
		while(deck.length > 0){
			this.players[p].addToBottom(deck.pop(0));
			p++;
			if (p >= this.players.length){
				p = 0;
			}
		}	
	}
	
	placeCard(){
		// only play card if you have one (duh)
		for(var i=0;i<this.players.length;i++){
			if (this.players[i].hand.length != 0){
				this.players[i].playTop();
				this.players[i].died++;
			}
		}
	}
	
	record(){
		// reset highest and ties
		this.highest = {"ID": null,
						"value": 0};
		this.ties = [];
		
		for(var i=0;i<this.players.length;i++){
			// standard find highest algorithim, but if a tie occurs (and the playspot
			// isn't null) then both parties are added to the tie list
			if (this.players[i].playSpot.value > this.highest["value"]){
				this.highest["value"] = this.players[i].playSpot.value;
				this.highest["ID"] = this.players[i].ID;
			} else if (this.players[i].playSpot.suit != "null" && (this.players[i].playSpot.value == this.highest["value"])){
				this.ties.push(this.players[i].ID);
				// prevent leader from benig added to ties multiple times
				if(!this.ties.includes(this.highest["ID"])){
					this.ties.push(this.highest["ID"]);					
				}
			}
		}
		if (this.hasTie()){
			console.log("There is a tie between: ", this.ties);
		} else {
			console.log(this.highest, " won");
		}
	}
	
	pushPot(){
		for(var i=0;i<this.players.length;i++){
			// check if player has a card in the playspot
			if (this.players[i].playSpot.suit != "null"){
				// player keeps their card on the table if there is an active tie
				// and they have no more cards
				if (!this.hasTie() || this.players[i].hand.length != 0){
					this.pot.push(this.players[i].playSpot);
					this.players[i].playSpot = new Card();
				} else {
					console.log(this.players[i].ID, " kept their card!");
				}
			}
		}
		console.log("The Pot Contains: ", this.pot);
	}
	
	hasTie(){
		return this.ties.length != 0;
	}
	
	reward(ID){
		for(var i=0;i<this.players.length;i++){
			// check if player is the one being rewarded
			if (this.players[i].ID == ID){
				this.players[i].addToBottom(this.pot);
				this.pot = [];
				break;
			}
		}
		console.log(ID, " was given the pot");
	}
	
	war(){
		// fancy stuff to make text red
		console.log( this.ties,"\x1b[31m", " are in a war!","\x1b[0m");
		
		// add buffer to pot
		var temp;
		for(var i=0;i<this.players.length;i++){
			// only select players who are actually tied
			if (this.ties.includes(this.players[i].ID)){
				// players normaly play 3 cards, but if they have less
				// than that then phantom cards are added and the whole 
				// thing crashes :(
				if (this.players[i].hand.length <= 3){
					temp = [];
					for(var j=0;j<this.players[i].hand.length-1;j++){
						temp.push(this.players[i].getTop());
					}
					this.pot = this.pot.concat(temp);
					console.log(this.players[i].ID, "sacrificed ", temp);
				} else {
					temp = [];
					for(var j=0;j<3;j++){
						temp.push(this.players[i].getTop());
					}
					this.pot = this.pot.concat(temp);
					console.log(this.players[i].ID, "sacrificed ", temp);
				}
			}
		}
		
		// Only ties players try again
		for(var i=0;i<this.players.length;i++){
			if (this.ties.includes(this.players[i].ID)){
				this.players[i].playTop();
			}
		} 
		this.tie = [];
		console.log("\x1b[31m", "END WAR!","\x1b[0m");
	}
	
	displayTotals(){
		var result = "";
		for(var i=0;i<this.players.length;i++){
			result += this.players[i].ID;
			result += ": "+(this.players[i].hand.length).toString();
			result += " cards\n";
		}
		return result;
	}
}

//'main' function
var NUM_PLAYERS = 4;

var board = new Table(["p1", "p2", "p3", "p4", "p5", "p6"]);
board.deal();
console.log(board.displayTotals());

function checkWin(table){
	var empty = 0;
	for(var i = 0; i<table.players.length; i++){
		if (table.players[i].hand.length == 0){
			empty ++;
		}
	}
	return empty < table.players.length-1;
}

var round = 0;
console.log("START");
while (checkWin(board)){
	console.log("Round: ", ++round);
	board.placeCard();
	board.record();
	board.pushPot();
	while (board.hasTie()){
		board.war();
		board.record();
		board.pushPot();
	}
	board.reward(board.highest["ID"]);
	console.log(board.displayTotals());
}
console.log(board.highest["ID"], " won after ", round, " rounds.");
for(var i=0;i<board.players.length;i++){
	console.log(board.players[i].ID, " survived until round ", board.players[i].died);
}
console.log("END");
</script>

<style>
</style>
