/*
*********************************************
*** Keep track of scores and active player
*********************************************
*/

let scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


/*
*********************************************
*** function to roll the dice when clicking the button
*********************************************
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    let dice = Math.floor(Math.random() * 6) + 1;

    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if(dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});


/*
*********************************************
*** function that accumulates the score for the current player, unless they have rolled a 1
*********************************************
*/

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScore;

    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 10){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
    } else {
        nextPlayer();
    }
});


/*
*********************************************
*** switches the player over and toggles which player is active 
*********************************************
*/

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
}