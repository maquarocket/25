import Player from "./Player.js";

/**
 * Class to represent all state information of a single game of 25.
 */
class Game extends Object {
    #players = [];
    #deck;
    #folded = [];
    #bets = [];
    #runpool = [];
    #switchMoney = [];
    #bowlPlayer = 0;
    #mainTable;
    #burnTable;
    #playTurn;

    #movesUI;
    fn_call;
    #playerSwitch = [null, null];
    fn_selected;
    fn_switch;

    /**
     * Initialises a game of 25.
     * @param {Number} players - Number of players for the game. Must be between 1 and 14 inclusive.
     */
    constructor(players, deck, prevBowl) {
        super();

        if (players < 0 || players > 14) throw RangeError("Number of players out of range!");

        this.#players = Array.from(document.querySelector('.play-area').querySelectorAll('.player'));
        this.#deck = deck;
        this.#mainTable = document.querySelector('.play-area').querySelector('.main');
        this.#burnTable = document.querySelector('.play-area').querySelector('.burn');

        let temp = [];
        for (let i = 0; i < this.get_playerCount(); i++) {
            this.#folded.push(false);
            this.#bets.push(0);
            this.#runpool.push(0);
            this.#switchMoney.push(0);
            let player = this.#players[i];
            player = new Player(Array.from(player.querySelector('.hand').querySelectorAll('my-card')), player.querySelector('.backup').querySelector('my-card'), parseInt(player.querySelector('.player-money').innerText.slice(1)), player);
            temp.push(player);
        }
        this.#players = temp;
        this.#playTurn = 0;

        this.#bowlPlayer = (prevBowl + 1) % players;
        let bowl = document.createElement('div');
        bowl.classList.add('bowl');
        this.#players[this.#bowlPlayer].ui.querySelector('.temp').appendChild(bowl);

        this.#movesUI = document.querySelector('.moves-area');
        this.fn_call = (e) => {this.play(e)};
        this.#movesUI.querySelector('.call').addEventListener('click', this.fn_call);
        this.#movesUI.querySelector('.raise').addEventListener('click', this.fn_call);
        this.fn_selected = (e) => {
            let elem = e.target;
            while (elem.nodeName != "MY-CARD") {
                elem = elem.parentNode;
            }
            if (elem.classList.contains('selected')) {
                elem.classList.remove('selected');
                let source = elem.parentNode;
                if (source.classList.contains('hand')) {
                    this.#playerSwitch[0] = null;
                }
                else if (source.classList.contains('backup')) {
                    this.#playerSwitch[1] = null;
                }
                else throw new Error("something went wrong!");
            }
            else {
                elem.classList.add('selected');
                let source = elem.parentNode;
                if (source.classList.contains('hand')) {
                    if (this.#playerSwitch[0]) this.#playerSwitch[0].classList.remove('selected');
                    this.#playerSwitch[0] = elem;
                }
                else if (source.classList.contains('backup')) {
                    if (this.#playerSwitch[1]) this.#playerSwitch[1].classList.remove('selected');
                    this.#playerSwitch[1] = elem;
                }
                else throw new Error("something went wrong!");
            }
            if (this.#playerSwitch[0] && this.#playerSwitch[1]) this.#movesUI.querySelector('.switch').classList.add('ready');
            else this.#movesUI.querySelector('.switch').classList.remove('ready');
            this.aux_set_switch_cost();
        };
        this.init_deal();
        this.fn_switch = (e) => {
            if (this.#playerSwitch[0] && this.#playerSwitch[1]) {
                for (let p of this.#players) {
                    if (p.get_backup() === this.#playerSwitch[1]) {
                        this.#players[0].switch(this.#playerSwitch[0], p);
                        break;
                    }
                }
                if (this.#playerSwitch[1].is_flipped()) this.#playerSwitch[1].flip();
                for (let c of this.#playerSwitch) c.classList.remove('selected');
                e.target.removeEventListener('click', this.fn_switch);
                e.target.setAttribute('disabled', '');
                e.target.classList.add('done');
                e.target.classList.remove('ready');
                for (let p of this.#players) {
                    let cards = p.ui.querySelectorAll('my-card');
                    for (let c of cards) c.removeEventListener('click', this.fn_selected);
                }
                if (e.target.innerText.length > 6) {
                    let cost = parseInt(e.target.innerText.slice(9, -1));
                    this.#players[0].take_money(cost);
                    document.getElementById('main-money').innerText = "$" + (parseInt(document.getElementById('main-money').innerText.slice(1)) + cost).toString();
                    this.#switchMoney[0] += cost;
                }
            }
        };
        this.#movesUI.querySelector('.switch').addEventListener('click', this.fn_switch);
    }

    /**
     * Gets the number of all players in the game.
     * @returns - Number of total players in the current game.
     */
    get_playerCount() {
        return this.#players.length;
    }

    get_bowlPlayer() {
        return this.#bowlPlayer;
    }

    /**
     * Deals cards to all players to begin a game.
     */
    init_deal() {
        this.#deck.shuffle();
        for (let p of this.#players) {
            for (let i = 0; i < 2; i++) {
                let card = this.#deck.draw();
                p.add_card(card);
            }
            let backup = this.#deck.draw();
            backup.shadowRoot.getElementById('card').classList.add('half');
            p.set_backup(backup);
            backup.addEventListener('click', this.fn_selected);
        }
        let playerHand = this.#players[0].ui.querySelector('.hand').querySelectorAll('my-card');
        for (let c of playerHand) {
            c.addEventListener('click', this.fn_selected);
        }
    }

    play(e) {
        let raise = e.target.innerText == "Raise";
        if (raise) {
            let amount = parseInt(document.getElementById('raise-value').value);
            for (let i = 0; i < this.#players.length; i++) {
                let p = this.#players[i];
                p.take_money(amount);
                let bowl = p.ui.querySelector('.bowl');
                if (bowl) {
                    this.#burnTable.querySelector('#burn-money').innerText = "$" + (parseInt(this.#burnTable.querySelector('#burn-money').innerText.slice(1)) + amount).toString();
                    this.#runpool[i] += amount;
                }
                else {
                    this.#mainTable.querySelector('#main-money').innerText = "$" + (parseInt(this.#mainTable.querySelector('#main-money').innerText.slice(1)) + amount).toString();
                    this.#bets[i] += amount;
                }
            }
        }
        if (this.#playTurn == 0) {
            this.#burnTable.querySelector('.card-area').appendChild(this.#deck.draw());
            for (let i = 0; i < 3; i++) this.#mainTable.querySelector('.card-area').appendChild(this.#deck.draw());
        }
        else if (this.#playTurn == 1 || this.#playTurn == 2) {
            this.#burnTable.querySelector('.card-area').appendChild(this.#deck.draw());
            this.#mainTable.querySelector('.card-area').appendChild(this.#deck.draw());
        }
        else if (this.#playTurn == 3) {
            let main = Array.from(this.#mainTable.querySelectorAll('my-card'));
            let side = Array.from(this.#burnTable.querySelectorAll('my-card'));
            let scores1 = [];
            let scores2 = [];
            // Open all non-folded cards.
            for (let i = 0; i < this.#players.length; i++) {
                scores1.push(null);
                scores2.push(null);
                let p = this.#players[i];
                if (!this.#folded[i]) {
                    for (let c of p.get_cards()) {
                        if (c.is_flipped()) {
                            c.flip();
                        }
                    }
                    // if (p.get_backup().is_flipped()) p.get_backup().flip();
                    let score = p.evaluate(main);
                    scores1[i] = score;
                    p.ui.querySelector('.first').innerText = score.print();
                    score = p.evaluate(side);
                    scores2[i] = score;
                    p.ui.querySelector('.second').innerText = score.print();
                    
                }
            }
            let winScore;
            for (let i = 0; i < scores1.length; i++) {
                if (!this.#folded[i]) {
                    if (winScore) {
                        if (scores1[i].gt(winScore)) winScore = scores1[i];
                    }
                    else winScore = scores1[i];
                }
            }
            let winners = [];
            for (let i = 0; i < scores1.length; i++) if (!this.#folded[i] && scores1[i].eq(winScore)) winners.push(i);
            let payout = parseInt(document.getElementById('main-money').innerText.slice(1)) / winners.length;
            document.getElementById('main-money').innerText = "$0";
            for (let w of winners) {
                this.#players[w].ui.querySelector('.first').classList.add('win-text');
                this.#players[w].ui.querySelector('.first').innerText = "WINNER: " + this.#players[w].ui.querySelector('.first').innerText;
                this.#players[w].ui.querySelector('.second').innerText = "";
                this.#players[w].add_money(payout);
            }
            let runScore;
            for (let i = 0; i < scores2.length; i++) {
                if (!this.#folded[i] && !winners.includes(i)) {
                    if (runScore) {
                        if (scores2[i].gt(runScore)) runScore = scores2[i];
                    }
                    else runScore = scores2[i];
                }
            }
            let runners = [];
            for (let i = 0; i < scores2.length; i++) if (!this.#folded[i] && scores2[i].eq(runScore)) runners.push(i);
            payout = parseInt(document.getElementById('burn-money').innerText.slice(1)) / runners.length;
            document.getElementById('burn-money').innerText = "$0";
            for (let r of runners) {
                this.#players[r].ui.querySelector('.second').classList.add('run-text');
                this.#players[r].ui.querySelector('.second').innerText = "RUNNER: " + this.#players[r].ui.querySelector('.second').innerText;
                this.#players[r].add_money(payout);
            }
            for (let i = 0; i < this.#bets.length; i++) this.#bets[i] = 0;
            for (let i = 0; i < this.#runpool.length; i++) this.#runpool[i] = 0;
            for (let i = 0; i < this.#switchMoney.length; i++) this.#switchMoney[i] = 0;
            this.game_end();
            return;
        }
        this.#playTurn += 1;
        this.aux_set_switch_cost();
    }

    /**
     * Mini clean-up tasks to carry out the moment a game ends.
     */
    game_end() {
        this.#movesUI.querySelector('.call').removeEventListener('click', this.fn_call);
        this.#movesUI.querySelector('.raise').removeEventListener('click', this.fn_call);
        this.#movesUI.querySelector('.switch').removeEventListener('click', this.fn_switch);
        for (let p of this.#players) {
            let cards = p.ui.querySelectorAll('my-card');
            for (let c of cards) c.removeEventListener('click', this.fn_selected);
        }
        // Redistribute remaining money. Happens on game restart without finishing a game.
        for (let i = 0; i < this.#players.length; i++) {
            this.#players[i].add_money(this.#bets[i]);
            this.#players[i].add_money(this.#runpool[i]);
            this.#players[i].add_money(this.#switchMoney[i]);
        }
        document.getElementById('main-money').innerText = "$0";
        document.getElementById('burn-money').innerText = "$0";

    }

    /**
     * Carries out clean-up tasks before the Game object is discarded.
     * MUST BE MANUALLY CALLED BEFORE STARTING A NEW GAME.
     */
    clean_up() {
        this.game_end();
        this.#movesUI.querySelector('.switch').removeAttribute('disabled');
        this.#movesUI.querySelector('.switch').classList.remove('done', 'ready');
        this.#movesUI.querySelector('.switch').innerText = "Switch";
        for (let p of this.#players) {
            p.ui.querySelector('.first').innerText = "";
            p.ui.querySelector('.first').classList.remove('win-text');
            p.ui.querySelector('.second').innerText = "";
            p.ui.querySelector('.second').classList.remove('run-text');
        }
        // Retrieve cards.
        for (let p of this.#players) {
            let cards = p.ui.querySelectorAll('my-card');
            for (let c of cards) {
                c.classList.remove('selected');
                c.remove();
                if (c.is_flipped()) c.flip();
                c.display_half(false);
                this.#deck.push(c);
            }
        }
        let tables = document.querySelectorAll('.community-hand');
        for (let t of tables) {
            let cards = t.querySelectorAll('my-card');
            for (let c of cards) {
                c.remove();
                this.#deck.push(c);
            }
        }
        this.#players[this.#bowlPlayer].ui.querySelector('.bowl').remove();
    }

    aux_set_switch_cost() {
        if (this.#playerSwitch[0] && this.#playerSwitch[1] && this.#playerSwitch[1] === this.#players[0].get_backup()) {
            this.#movesUI.querySelector('.switch').innerText = "Switch ($" + (10 * 2 ** this.#playTurn).toString() + ")";
        }
        else if (this.#movesUI.querySelector('.switch').innerText != "Switch") this.#movesUI.querySelector('.switch').innerText = "Switch";
    }
}


export default Game;
