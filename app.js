/*
*********************************************
*** Keep track of scores and active player
*********************************************
*/

let scores, roundScore, activePlayer, gamePlaying, previousDiceRoll_1, previousDiceRoll_2;
initalise();

/*
*********************************************
*** function to roll the dice when clicking the button
*********************************************
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        
        // generate random number from 1 to 6
        let dice_1 = Math.floor(Math.random() * 6) + 1;
        let dice_2 = Math.floor(Math.random() * 6) + 1;

    // displays the results for both dices
        const dice_1_DOM = document.getElementById('dice-1');
        const dice_2_DOM = document.getElementById('dice-2');
        dice_1_DOM.style.display = 'block';
        dice_2_DOM.style.display = 'block';
        dice_1_DOM.src = 'dice-' + dice_1 + '.png';
        dice_2_DOM.src = 'dice-' + dice_2 + '.png';

    // if two consecutive sixes are rolled, score gets set to zero and switch players 
        if((previousDiceRoll_1 === 6 && dice_1 === 6) || (previousDiceRoll_2 === 6 && dice_2 === 6)){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if(dice_1 !== 1 && dice_2 !== 1){ // if a 1 is rolled, switch players 
            roundScore += (dice_1 + dice_2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        previousDiceRoll_1 = dice_1; // variable to keep note of previous dice roll
        previousDiceRoll_2 = dice_2;
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

        let input = document.querySelector('.goal-score').value; // grab the input
        let winningScore;

        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if(scores[activePlayer] >= winningScore){ 
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

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

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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