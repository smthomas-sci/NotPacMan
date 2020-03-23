
function Ghost(color){
    // Attributes
    this.color = color;
    this.x = width / 2;
    this.y = height / 2;
    this.direction = "RIGHT";
    this.dim = 40;

    // Methods
    this.move = function(){
        this.x += int(random(2)) < 1 ? -1 : 1;
        this.y += int(random(2)) < 1 ? -1 : 1;
    };

    this.display = function(){
        // body

        let dim = this.dim;
        let tri_dim = dim / 2;
        let tri_x = tri_dim / 3;

        noStroke();

        // Body
        fill(this.color);
        ellipse(this.x, this.y, dim, dim);
        rect(this.x-(dim/2), this.y, dim, dim*0.75);
        fill(0);
        triangle(this.x-tri_dim, this.y+(dim*0.75),
            this.x-tri_x, this.y+(dim*0.75),
            this.x+tri_x-tri_dim, this.y+(dim*0.75)-(dim*0.1));

        triangle(this.x-tri_x, this.y+(dim*0.75),
            this.x+tri_x, this.y+(dim*0.75),
            this.x, this.y+(dim*0.75)-(dim*0.1));

        triangle(this.x+tri_x, this.y+(dim*0.75),
            this.x+tri_dim, this.y+(dim*0.75),
            this.x+tri_x*2, this.y+(dim*0.75)-(dim*0.1));

        // Eyes
        fill(255);
        let eye_dim = 0.3;
        ellipse(this.x-dim/4, this.y, dim*eye_dim, dim*eye_dim);
        ellipse(this.x+dim/4, this.y, dim*eye_dim, dim*eye_dim);

        // Pupils
        fill(0);
        ellipse(this.x-dim/4, this.y, dim*eye_dim/2, dim*eye_dim/2);
        ellipse(this.x+dim/4, this.y, dim*eye_dim/2, dim*eye_dim/2);

    };

    this.run = function(){
        this.move();
        this.display();
    };

}

function PacMan(){
    // Attributes
    this.color = "#FBDB06";
    this.x = random(width);
    this.y = random(height);
    this.direction = "RIGHT";
    this.xDir = 0; // initial x movement
    this.yDir = 0; // initial y movement
    this.dim = 40; // Size of character (radius)

    // Methods
    this.move = function(){

        if (keyIsPressed) {
            if (key=="ArrowUp"){
                this.xDir = 0;
                this.yDir = -1;
                this.direction = "UP";
            }
            if (key=="ArrowDown"){
                this.xDir = 0;
                this.yDir = 1;
                this.direction = "DOWN";
            }
            if (key=="ArrowRight"){
                this.xDir = 1;
                this.yDir = 0;
                this.direction = "RIGHT";
            }
            if (key=="ArrowLeft"){
                this.xDir = -1;
                this.yDir = 0;
                this.direction = "LEFT";
            }
        }

        // Move according to direction
        this.x += this.xDir;
        this.y += this.yDir;

        this.x = constrain(this.x, 0+this.dim/2 + 5, width-(this.dim / 2)-5);
        this.y = constrain(this.y, 0+this.dim/2 + 5, height-(this.dim / 2)-55);
    };

    this.display = function(){
        // body

        let dim = this.dim;
        let tri_dim = dim / 2;

        noStroke();

        // Body
        fill(this.color);
        if (this.direction == "UP"){
            arc(this.x, this.y, dim, dim, (TWO_PI*0.75)+PI/8, (TWO_PI*0.75)-PI/8);
        } else if (this.direction == "DOWN"){
            arc(this.x, this.y, dim, dim, (PI/2)+PI/8, (PI/2)-PI/8);
        } else if (this.direction == "LEFT"){
            arc(this.x, this.y, dim, dim, PI+PI/8, PI-PI/8);
        } else if (this.direction == "RIGHT"){
            arc(this.x, this.y, dim, dim, PI/8, TWO_PI-PI/8);
        }

    };

    this.run = function(){
        this.move();
        this.display();
    };

}

function Board(){

    // Attributes
    this.cx = width / 2;
    this.cy = (height-50) / 2;
    this.cage_dim = 66;


    this.run = function(){
        this.boundaries();
        this.tracks();
    };

    this.tracks = function(){
        stroke(255);
        // LEFT RIGHT VERTICAL
        line(35, 30, 35, height-55-20);
        line(width-35, 30, width-35, height-55-20);
        // BOTTOM BOTTOM
        line(35, height-55-20, width-35, height-55-20);
        // BOTTOM TOP
        line(35, height-210-20, width-35, height-210-20);
        // TOP BOTTOM
        line(35, 180, width-35, 180);
        // TOP TOP
        line(35, 30, width-35, 30);

        // TOP LEFT
        line(170, 30, 170, 180);
        // TOP RIGHT
        line(230, 30, 230, 180);

        // BOTTOM LEFT
        line(170, height-55-20, 170, height-55-30-145);
        // BOTTOM RIGHT
        line(230, height-55-20, 230, height-55-30-145);

        // MIDDLE LEFT
        line(100, 180, 100, height-55-30-145);
        // MIDDLE RIGHT
        line(300, 180, 300, height-55-30-145);
    };

    this.boundaries = function(){

        // SETTINGS
        background(0);
        strokeWeight(3);
        stroke(0, 0, 255);

        // BOUNDARIES
        line(3, 5, width-5, 3);
        line(3, height-55, width-3, height-55);
        line(3, 5, 3, height-55);
        line(width-3, 5, width-3, height-55);

        // CENTRE BOX
        // Bottom
        line(this.cx-this.cage_dim, this.cy+this.cage_dim, this.cx+this.cage_dim, this.cy+this.cage_dim);
        // Top
        line(this.cx-this.cage_dim, this.cy-this.cage_dim, this.cx-25, this.cy-this.cage_dim);
        line(this.cx+this.cage_dim, this.cy-this.cage_dim, this.cx+25, this.cy-this.cage_dim);
        // Sides
        line(this.cx-this.cage_dim, this.cy-this.cage_dim, this.cx-this.cage_dim, this.cy+this.cage_dim);
        line(this.cx+this.cage_dim, this.cy-this.cage_dim, this.cx+this.cage_dim, this.cy+this.cage_dim);

        noFill();
        // TOP RIGHT BOX
        rect(width/2+60, 55, 75, 100);
        // TOP LEFT BOX
        rect(width/2-60, 55, -75, 100);
        // BOTTOM RIGHT BOX
        rect(width/2+60, height-55-150, 75, 100);
        // BOTTOM LEFT BOX
        rect(width/2-60, height-55-150, -75, 100);

        // DIVIDERS
        line(width/2, 60, width/2, 150);
        line(width/2, height-55-150, width/2, height-55-50);
        line(width-(width/6), (height/2)-75, width-(width/6), (height/2)+25);
        line(width/6, (height/2)-75, width/6, (height/2)+25);

        // END
        stroke(0);
        strokeWeight(1);

    };



}