//inicializacion de variables
let uncoveredCards = 0;
let cardOne = null;
let cardTwo = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let turn = 0;
let timeLeft = false;
let timer = 20;
let timeInitial = timer;
let regressiveTime = null;

//apuntanto a documento html

let showMovements = document.getElementById('movement');
let showturn = document.getElementById('turns')
let showtime = document.getElementById('timeleft')
//generacion de numeros

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});

//funciones 
function countTimer(){
    regressiveTime = setInterval(()=>{
        timer--;
        showtime.innerHTML = `tiempo ${timer} segundos`
        if(timer == 0 ){
            clearInterval(regressiveTime);
            blockCard();
        }
    },1000)
}

function blockCard(){
    for (let i = 0; i <= 15; i++){
        let blockedCard = document.getElementById(i);
        blockedCard.innerHTML = `<img src="images-heaven/${numbers[i]}.png" alt="">` ;
        blockedCard.disabled = true;
    }
}
//funcion principal
function uncover(id){

    if(timeLeft == false){
        countTimer();
        timeLeft = true;
    }


    uncoveredCards++;

    if(uncoveredCards == 1){
        //mostrar primera imagen 
        cardOne = document.getElementById(id);
        firstResult = numbers[id];
        cardOne.innerHTML = `<img src="images-heaven/${firstResult}.png" alt="">`;

        //deshabilitar el primer boton 
        cardOne.disabled = true;
    }else if(uncoveredCards == 2){
        //mostrar segunda imagen 
        cardTwo = document.getElementById(id);
        secondResult = numbers[id];
        cardTwo.innerHTML = `<img src="images-heaven/${secondResult}.png" alt="">`;

        //deshabilitar segundo boton
        cardTwo.disabled = true;

        //incrementar movimientos
        movements++;
        showMovements.innerHTML = `movimientos:${movements}`;


        if(firstResult == secondResult){
            //encerar el contador 
            uncoveredCards = 0;

            //aumentar aciertos
            turn++;
            showturn.innerHTML = `Aciertos ${turn}`;

            if(turn == 8){
                clearInterval(regressiveTime);
                showturn.innerHTML = `Aciertos ${turn} 😎😎😎`;
                showtime.innerHTML = `🎉🎉 Solo te demoraste ${timeInitial - timer} segundos joto de mie***`
                showMovements.innerHTML = `movimientos:${movements}👍👍👌`;
            }
        }else{
            //mostrar momentaneamente valores
            setTimeout(()=>{
                cardOne.innerHTML = '';
                cardTwo.innerHTML = '';
                cardOne.disabled = false;
                cardTwo.disabled = false;
                uncoveredCards = 0;
            },500)
        }
    }
}