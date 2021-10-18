//Préparation des constantes et des variables nécessaires.
const boxes = Array.from(document.getElementsByClassName("box"));
const gameBoard = document.getElementById("gameboard");
const restartBtn = document.getElementById("restartBtn");
const text = document.getElementsByClassName("text")[0];
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
//Cette matrice représente la grille de jeu.
let matrice = [0,0,0,0,0,0,0,0,0];
let alignmentMatrice = [];
let difficulty = document.querySelector('.difficulty');
const normal = difficulty.firstElementChild;
const hard = difficulty.lastElementChild;

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
        if(index==1 || index==4 || index==7)
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

//Cette fonction vérifie si la grille est remplie.
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

//Cette fonction permet de faire un check des opportunités de l'ordinateur de faire un alignement complet.
const checkComputerOportunity = () => {
    let Index = null;
    if(matrice[0]+matrice[1]+matrice[2]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[0]+matrice[4]+matrice[8]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 4*Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[0]+matrice[3]+matrice[6]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[1]+matrice[4]+matrice[7]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3)+1;
        }
        return Index;
    }
    if(matrice[2]+matrice[5]+matrice[8]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3)+2;
        }
        return Index;
    }
    if(matrice[2]+matrice[4]+matrice[6]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 2*Math.floor(Math.random()*3)+2;
        }
        return Index;
    }
    if(matrice[3]+matrice[4]+matrice[5]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3)+3;
        }
        return Index;
    }
    if(matrice[6]+matrice[7]+matrice[8]==8)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3)+6;
        }
        return Index;
    }
    return Index;
}

//Cette fonction permet de faire un check des opportunités du joueur de faire un alignement complet.
const checkPlayerOportunity = () => {
    let Index = null;
    if(matrice[0]+matrice[1]+matrice[2]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[0]+matrice[4]+matrice[8]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 4*Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[0]+matrice[3]+matrice[6]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3);
        }
        return Index;
    }
    if(matrice[1]+matrice[4]+matrice[7]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3)+1;
        }
        return Index;
    }
    if(matrice[2]+matrice[5]+matrice[8]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 3*Math.floor(Math.random()*3)+2;
        }
        return Index;
    }
    if(matrice[2]+matrice[4]+matrice[6]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = 2*Math.floor(Math.random()*3)+2;
        }
        return Index;
    }
    if(matrice[3]+matrice[4]+matrice[5]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3)+3;
        }
        return Index;
    }
    if(matrice[6]+matrice[7]+matrice[8]==2)
    {
        while(Index===null || matrice[Index]!=0)
        {
            Index = Math.floor(Math.random()*3)+6;
        }
        return Index;
    }
    return Index;
}

const normalMod = () => {
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
    return randIndex;
}

const hardMod = () => {
    let sum = 0;
    let Index = null;
    //Pour le premier coup de l'ordinateur on fait un coup spécial qui le met dans une position optimal.
    matrice.forEach((value,key)=>{
        sum+=value;
    })
    if(sum==1)
    {
        Index = 4;
        if(matrice[4]==1)
        {
            while(Index===null || Index==4)
            {
                Index = 2*Math.floor(Math.random()*5);
            }
        }
        return Index;
    }
    //Après le premier coup on check les opportunités de faire un alignement complet pour l'ordinateur.
    Index = checkComputerOportunity();
    if(Index===null)
    {
        //Si aucune opportunité d'alignement n'a été favorable à l'ordinateur, on cherche à bloquer le joueur avec un check de ses opportunités à lui.
        Index = checkPlayerOportunity();
        if(Index===null)
        {
            //Si aucune opportunité n'a été trouvé dans les deux cas, on choisit au hasard.
            Index = normalMod();
            return Index;
        }
        return Index;
    }
    return Index;
}

const transitionToggle = () => {
    text.classList.toggle("animated");
}

//Cette fonction permet d'activer et de désactiver l'animation du texte principal.
const animateToggle = () => {
    if(text.innerText == "Let's play")
    {
        text.removeEventListener('transitionend',transitionToggle);
        text.classList.remove("animated");
        return;
    }
    text.addEventListener('transitionend',transitionToggle);
}

//Permet de faire cocher une case à l'ordinateur
const computerClick = () => {
    //On vérifie quelle stratégie l'ordinateur applique en fonction de la difficulté choisie par le joueur.
    Index = normalMod();
    if(hard.innerText == "[ Hard mod ]")
    {
        Index = hardMod();
    }
    box = boxes[Index];
    box.innerText = computer_text;
    box.removeEventListener('click',playerClick);
    matrice[Index] = 4;
    if(SomebodyWon())
    {
        boxes.forEach((box,index)=>{
            box.removeEventListener('click',playerClick);
        })
        text.innerText = computer_text+" win!";
        animateToggle();
        text.classList.add("animated");
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
        animateToggle();
        text.classList.add("animated");
    }
    else if(IsItOver())
    {
        text.innerText = "nobody won...";
        animateToggle();
        text.classList.add("animated");
    }
    else
    {
        computerClick();
    }
}

//Cette fonction redémarre le jeu.
const restart = () => {
    boxes.forEach((box,index)=>{
        box.innerText = '';
        box.addEventListener('click',playerClick);
        matrice[index] = 0;
    })
    text.innerText = "Let's play";
    animateToggle();
}

restartBtn.addEventListener('click',restart);

//Cette fonction nous permet de changer de mode de difficulté.
const modClick = (e) => {
    if(e.target===normal)
    {
        if(normal.innerText=="Normal mod")
        {
            restart();
        }
        hard.innerText = "Hard mod";
        normal.innerText = "[ Normal mod ]";
        normal.removeEventListener('click',modClick);
        hard.addEventListener('click',modClick);
        return;
    }
    if(hard.innerText=="Hard mod")
    {
        restart();
    }
    normal.innerText = "Normal mod"
    hard.innerText = "[ Hard mod ]";
    hard.removeEventListener('click',modClick);
    normal.addEventListener('click',modClick);
    return;
}

normal.addEventListener('click',modClick);
hard.addEventListener('click',modClick);

drawBoard();