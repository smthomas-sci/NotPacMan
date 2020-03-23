
let ghosts = [];
let colors = ["red", "blue", "orange", "pink"];
let pacman;
let board;

let STATE = "MENU";

// Global Coords
let cx;
let cy;

function setup(){
    createCanvas(400, 600);
    background(0);
    // Create ghosts
    for (let i=0; i < colors.length; i++){
        ghosts[i] = new Ghost(colors[i]);
    }
    pacman = new PacMan();

    board = new Board();

    // Get coords
    cx = width / 2;
    cy = height / 2;
}

function draw(){

    if (STATE == "MENU"){
        runMenu();
    }

    else {
        background(0);
        // for (let i=0; i < ghosts.length; i++){
        //     ghosts[i].run();
        // }

        board.run();


        pacman.run();
        // Add exit button
        exitButton();
        scoreBoard();
    }

}

function runMenu(){
    background(0);
    // draw button
    fill(204);
    rect(cx-100, cy-100, 200, 200);
    // Add label
    fill(255);
    strokeWeight(1);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("", cx, cy);
    // Check for button-press
    let condition = (mouseX < cx+100) && (mouseX > cx-100)
                 && (mouseY > cy-100) && (mouseY < cy+100);

    if (condition) {
        if (mouseIsPressed){
            STATE = "GAME";
        }
    }
}

function exitButton(){
    fill(204);
    let posX = width-100;
    let posY = height-50;
    // draw button
    rect(posX, posY, 100, 50);

    // add text
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Exit", posX+50, posY+25);

    // Check for button-press
    let condition = (mouseX < posX+100) && (mouseX > posX)
        && (mouseY > posY) && (mouseY < posY+50);

    if (condition) {
        if (mouseIsPressed){
            STATE = "MENU";
        }
    }
}

function scoreBoard(){
    fill(204);
    let posX = 0;
    let posY = height-50;
    // draw button
    rect(posX, posY, width-100, 50);

    // add text
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("SCORE BOARD", posX+150, posY+25);

}