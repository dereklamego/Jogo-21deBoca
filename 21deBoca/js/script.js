var gameElement = document.querySelector('#game-container'); //pegando a div do jogo
var scoreElement = document.querySelector('#score'); //pegando o paragrafo onde ficara o score
var winnerElement = document.querySelector('#winner'); // pegando o paragrafo onde ficara o vencedor 
var playingElement = document.querySelector('#playing'); //esse aqui é o texto q mostra quem está jogando
var btnBoxElement = document.querySelector('#btns-container'); //pegando a div dos botões
var btnBoxPlaysElement = document.querySelector('#btn-plays'); // pegando a div dos botões de lance
var btnBoxRestartElement = document.querySelector('#btn-restart');// pegando a div do botão restart
var btnStartElement = document.querySelector('#btn-start'); //Pegando o botão de start
var rankElement = document.querySelector('#ranking') //pegando a div do ranking
var btn1Element = document.querySelector('.btn1');
var btn2Element = document.querySelector('.btn2');
var btn3Element = document.querySelector('.btn3');

var score=0;
var round=1;
var cpuWins=0;
var p1wins=0;
var p2wins=0;
var player;
var rival;

scoreElement.innerHTML = score;
scoreElement.style.fontSize = '13pt';

var btnRestartElement = document.querySelector('#btn-restart');
btnRestartElement.style.marginLeft = "13vw";
hideElements(btnRestartElement);
hideElements(btnBoxPlaysElement);
hideElements(scoreElement);
hideElements(playingElement);
rankElement.innerHTML = "Jogador 1: " + p1wins + " <br>Jogador 2: " + p2wins + "<br>CPU:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cpuWins;

function playGame(){
    showElements(btnBoxPlaysElement);
    showElements(scoreElement);
    showElements(playingElement);
    hideElements(btnStartElement);
}

// função para pegar o rival selecionado
function selectRival(){
    var selectElement = document.getElementById("players");
    rival = selectElement.options[selectElement.selectedIndex].text;
} window.onload = selectRival();

function playVersus(numBtn){
    if(verifyRival()){ 
        playerMove(numBtn)
        setTimeout(cpuMove, 600);   
    }else{
        playerMove(numBtn);
    }
    verifyGame();
}
    
function changeTextRound(){ 
    if(score<21){
        if(verifyRound()){
            if(verifyRival()){
                player = "Computador jogando..."
            }else{
                player = "Vez do jogador 2"
            }
        }else{
            if(verifyRival()){
                player = "Sua vez"
            }else{
                player = "Vez do jogador 1"
            }
        }
    }else{
        player = "Fim de jogo"
    } 
}

function cpuMove(){ //jogada do computador
    if(verifyRound()==0){ // computador joga em rounds pares
        var comMove = Math.floor(Math.random() * 3) + 1 ; //numero aleatorio q o com vai escolher pra somar ao score
        score += comMove;
        changeTextRound(); 
        round++
        verifyGame();
    }
}

//função para verificar se o score do jogo já chegou em 21, verificar o ganhador, e atualizar o score
function verifyGame(){
    if(score>=21){
        score = 21;
        round-=1;
        hideElements(btnBoxPlaysElement);

        if(verifyRound()){ // round impar é o jogador 1
            winnerElement.innerHTML="Parabéns Jogador 1, você ganhou!"; 
            p1wins+=1;
        }else{ //round par é o computador 
            if(verifyRival()){
                winnerElement.innerHTML = "O Computador ganhou!"
                cpuWins+=1;
            }else{
                winnerElement.innerHTML = "Parabéns jogador 2, você ganhou!"
                p2wins+=1;
            } 
        }
        player ="Fim de jogo";
        showElements(btnRestartElement);
    }
    attStatus();
}

function verifyRound(){
    if(round%2==1){
        return true;
    }else{
        return false;
    }
}

function verifyRival(){
    if(rival=="COMPUTADOR"){
        return true
    }else{
        return false
    }
}

 function restartGame(){
    score=0;
    round=1;
    hideElements(btnRestartElement);
    showElements(btnBoxPlaysElement);
    player="Faça sua jogada"
    winner.innerHTML = "";
    attStatus();
}

function attStatus(){
    playingElement.innerHTML =  player; 
    scoreElement.innerHTML = score;
    btn1Element.innerHTML = score+1;
    btn2Element.innerHTML = score+2;
    btn3Element.innerHTML = score+3;
    rankElement.innerHTML = "Jogador 1: " + p1wins + " <br>Jogador 2: " + p2wins + "<br>CPU:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + cpuWins;
}

function playerMove(numBtn){
    score+=numBtn;
    round++
}

function hideElements(element){
    element.style.display = 'none';
}

function showElements(element) {
   element.style.display = "block";
}

function lancar1(){
    changeTextRound(); 
    playVersus(1);
}

function lancar2(){
    changeTextRound();
    playVersus(2);
}

function lancar3(){
    changeTextRound();
    playVersus(3);
}
