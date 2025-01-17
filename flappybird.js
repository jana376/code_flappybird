
//board
let board; //let zur variabelndeklaration verwendet
let boardWidth = 360; //breite ist 360
let boardHeight = 640; //hoehe ist 640
let context;



//bird
let birdWidth = 34;
let birdHeight = 24;
//specify where to place the on a x and y position
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;


//birdobjektt
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}


//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics, variabel definieren
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on board

    //draw flappy bird
/*  context.fillStyle = "green";
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
*/
    //flappy bird image
birdImg = new Image();
birdImg.src = "./images/flappybird.png";
birdImg.onload = function(){
context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}


    topPipeImg = new Image ();
    topPipeImg.src = "./images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds

}

//main game loop -> redraw de canvas!
function update(){
requestAnimationFrame(update);
context.clearRect(0, 0, board.width, board.height); //0,0 -> top left corner

//bird
context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

//pipes
for(let i =0; 1< pipeArray.length; i++){
    let pipe = pipeArray[i];
    pipe.x += velocityX
    context.drawImage(pipe.Image, pipe.x, pipe.y, pipe.width, pipe.height);
}
}


function placePipes(){

    let topPipe = {

        img : topPipeImg,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {

        img : bottomPipeImg,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}


