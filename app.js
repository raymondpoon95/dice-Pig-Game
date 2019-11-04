/*
*********************************************
*** Keep track of scores and active player
*********************************************
*/

let scores, roundScore, activePlayer, gamePlaying;

initalise();

/*
*********************************************
*** function to roll the dice when clicking the button
*********************************************
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // generate random number from 1 to 6
        let dice = Math.floor(Math.random() * 6) + 1;

    // displays the result
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

    // if a 1 is rolled, switch players otherwise keep count 
        if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});


/*
*********************************************
*** function that accumulates the score for the current player, unless they have rolled a 1
*********************************************
*/

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 10){ // change this back to 100
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


/*
*********************************************
*** switches the player over and toggles which player is active 
*********************************************
*/

function nextPlayer(){
    // if the activeplayer is 0 switch to 1 and vice versa
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}


/*
*********************************************
*** function to start a new game   
*********************************************
*/

document.querySelector('.btn-new').addEventListener('click', initalise);


/*
*********************************************
*** function to initialise, grabs global variables   
*********************************************
*/

function initalise(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}