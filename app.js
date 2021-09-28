//Préparation des constantes et des variables nécessaires.
const boxes = Array.from(document.getElementsByClassName("box"));
const gameBoard = document.getElementById("gameboard");
const restartBtn = document.getElementById("restartBtn");
const text = document.getElementById("text");
let player_text = "X";
let computer_text;
if(player_text=="X")
{
    computer_text="O";
}
else
{
    computer_text="X";
}
//This matrice represent the gameboard.
let matrice = [0,0,0,0,0,0,0,0,0];
let alignmentMatrice = [];

//On dessine la grille du Tic Tac Toe.
const drawBoard = () => {
    boxes.forEach((box,index)=>{
        let styleString = '';
        let properties = `3px solid var(--purple);`;
        if(index<3)
        {
            styleString+= `border-bottom: `+properties;
        }
        if(index>5)
        {
            styleString+= `border-top: `+properties;
        }
        if(index===1 || index===4 || index===7)
        {
            styleString+= `border-left: `+properties;
            styleString+= `border-right: `+properties;
        }
        box.style = styleString;
        box.addEventListener('click',playerClick);
    })
}

//Cette fonction détecte si quelqu'un a gagné.
const SomebodyWon = () => {
    //La matrice si dessous représente les sommes de valeurs qui sont potentiellement associées à un alignement.
    //Dans le cas ou le joueur gagne on a 1+1+1=3, alors que dans le cas de l'ordinateur on a 4+4+4=12.
    alignmentMatrice = [(matrice[0]+matrice[1]+matrice[2]),(matrice[0]+matrice[4]+matrice[8]),(matrice[0]+matrice[3]+matrice[6]),(matrice[1]+matrice[4]+matrice[7]),(matrice[2]+matrice[5]+matrice[8]),(matrice[2]+matrice[4]+matrice[6]),(matrice[3]+matrice[4]+matrice[5]),(matrice[6]+matrice[7]+matrice[8])];
    key=0;
    while(key<9)
    {
        alignment=alignmentMatrice[key];
        if(alignment==12 || alignment==3)
        {
            return true;
        }
        key++
    }
    return false;
}

//Cette fonction vérifie si la grille est remlie.
const IsItOver = () => {
    let overValue = 1;
    matrice.forEach((value,key)=>{
        overValue*=value;
    })
    //Il suffit qu'un seul zéro correspondant à une case non cochée reste dans la matrice pour que le produit soit nul.
    if(overValue != 0)
    {
        return true;
    }
    return false
}


//Permet de faire cocher une case à l'ordinateur
const computerClick = () => {
    randIndex = null;
    //On coche dans une case libre grâce à une boucle while.
    while(randIndex === null)
    {
        randIndex = Math.floor(Math.random()*9);
        if(matrice[randIndex] != 0)
        {
            randIndex = null;
        }
    }
    box = boxes[randIndex];
    box.innerText = computer_text;
    box.removeEventListener('click',playerClick);
    matrice[randIndex] = 4;
    if(SomebodyWon())
    {
        boxes.forEach((box,index)=>{
            box.removeEventListener('click',playerClick);
        })
        text.innerText = computer_text+" win!";
    }
}

const playerClick = (e) => {
    e.target.innerText = player_text;
    e.target.removeEventListener('click',playerClick);
    matrice[e.target.id] = 1;
    if(SomebodyWon())
    {
        boxes.forEach((box,index)=>{
            box.removeEventListener('click',playerClick);
        })
        text.innerText = player_text+" win!";
    }
    else if(IsItOver())
    {
        text.innerText = "nobody won...";
    }
    else
    {
        computerClick();
        if(IsItOver())//En pratique ce cas de figure n'arrivera jamais car il y a neuf coups maximum et c'est le joueur qui commence. Cependant on le laisse en cas de modification du code.
        {
            text.innerText = "nobody won...";
        }
    }
}

//This function restart the game.
const restart = () => {
    boxes.forEach((box,index)=>{
        box.innerText = '';
        box.addEventListener('click',playerClick);
        matrice[index] = 0;
        text.innerText = "Let's play";
    })
}

restartBtn.addEventListener('click',restart);

drawBoard();