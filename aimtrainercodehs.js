println("Welcome to the CodeHs Aimtrainer! This is a program designed to train your aim for FPS games!" );
println("-----------------------------------------------------------------------------");
println("Click as many targets as you can! Your accuracy will be displayed at the end!" );
println("_____________________________________________");
var b = 0;
var c = 0;
var cursor1 = new Circle(5);
var circle1;
var circle2;
var circle3;
//time and score text
var scoreText = new Text("", "20pt Arial"); 
var timerText = new Text("You have       time left", "20pt Arial");
timerText.setPosition(60,70);
//variables that chnge
var score = 0;
var NUM = 0;
var clicks = 0;
var time = 60;
//red circle
var circle = new Circle(30);
//the blue circle
var circle2 = new Circle(circle.getRadius()-circle.getRadius()/10*4);
//the third circle, (yellow)
var circle3 = new Circle(circle2.getRadius() - circle2.getRadius()/10*4);
//the black outline 
var outline = new Circle(circle.getRadius() + 4);
//the actua time
var timeText = new Text("", "17pt Arial");
timeText.setPosition(timerText.getX() + 115, timerText.getY());
//the background
//the rectangle
var rectMain = new Rectangle(300, 20);
var bg = new Rectangle(getWidth(), getHeight());
//color and text
var color = "#C15BDA";
var mainText = new Text("Welcome to the CodeHs Aimtrainer!", "12pt Arissdal");
var colorRect = "#E7D2EC";

function start(){
    var ready = readBoolean("Are you ready to start? ");
    if(ready){
        drawTargets();
        setTimer(createTimer60, 1000);
    }
    if(!ready){
        drawAimTrainerLogo();
    }
}



function drawTargets(e){
    //adding the background
    bg.setPosition(0,0);
    bg.setColor(color);
    add(bg);
    
    //adding the frontend looking rectangle lol
    rectMain.setPosition(60, 5)
    rectMain.setColor(colorRect);
    add(rectMain);
    
    
    
    //random points for the circle to go
    var randomX = Randomizer.nextInt(20, getWidth()-20);
    var randomY = Randomizer.nextInt(20, getHeight()-20);
    
    outline.setPosition(randomX, randomY);
    add(outline);
    //adding the red circle
    circle.setPosition(randomX, randomY);
    circle.setColor(Color.red);
    add(circle);
    //adding the blue circle
    circle2.setPosition(circle.getX(), circle.getY());
    circle2.setColor(Color.blue);
    add(circle2);
    //adding the yellow circle
    circle3.setPosition(circle2.getX(), circle2.getY());
    circle3.setColor(Color.yellow);
    add(circle3);
    
    //adding the text
    mainText.setPosition(getWidth()/100*20, 20);
    mainText.setColor("black");
    add(mainText);
    
    
    scoreText.setPosition(60,50);
    add(scoreText);
    
    add(timerText);
    add(timeText);
    
    
    
    mouseClickMethod(checkForClick);
    mouseMoveMethod(drawCursor);
    
}

function checkForClick(e){
    //checking if the mouse is in between two designated points                                         //y param starts here
    if(outline.getX()-outline.getRadius() < e.getX() && outline.getX()+outline.getRadius() > e.getX() && outline.getY()-outline.getRadius() < e.getY() && outline.getY()+outline.getRadius() > e.getY() && c == 0){
        score++;
        clicks++
        scoreText.setText("Your score is " + score);
        circle.setColor(Color.green);
        circle2.setColor(Color.green);
        circle3.setColor(Color.green);
        drawTargets();
        
    }else{
        if(c == 0){
            clicks++;
        }
    }
}

function drawAimTrainerLogo(){
    bg.setPosition(0,0);
    bg.setColor(color);
    add(bg);
    var aimText = new Text("Re-run and say " + "yes "  + "when ready", "20pt Arial");
    aimText.setPosition(15, getHeight()/2*0.8);
    add(aimText);
}



function drawCursor(e){
    cursor1.setColor(Color.green);
    cursor1.setPosition(e.getX(), e.getY());
    add(cursor1);
}

function createTimer60(){
    b++;
    //game ends
    //if the time is already at 50 seconds passed, there is 10 seconds to go, so 51
    if(b == 60){
        console.log("game is over");
        b = 0;
        time = 0;
        remove(timeText);
        runEndGame();
        stopTimer(createTimer60);
    }
    timeText.setText("0:" + time);
    time--;
    add(timeText);
    if(b >= 51 && b <= 61){
        timeText.setPosition(timerText.getX() + 75 , timerText.getY() + 30)
        if(c == 0){
        timeText.setText(time + " seconds")
        add(timeText);
        }
        if(c == 1){
            timeText.setColor(Color.red);
        }
    }

}

function runEndGame(){
    c++;
    clearCanvas();
    writeEndText();
    console.log(clicks + " Number of clicks");
    console.log(score + " Number of targets hit");
    
}

function clearCanvas(){
    remove(outline);
    remove(circle1);
    remove(circle2);
    remove(circle3);
    remove(circle);
    remove(scoreText);
    remove(timerText);
    remove(timeText);
    remove(rectMain);
    remove(mainText);
    remove(timeText);
    
    
}


function writeEndText(){
    var picture = new WebImage('upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg');
    picture.setPosition(110, 170);
    var coverUp = new Rectangle(200, 200);
    coverUp.setColor(color);
    coverUp.setPosition(50,50);
    var outlineRect = new Rectangle(320,320);
    outlineRect.setPosition(60,60);
    var endScreen = new Rectangle(300, 300);
    endScreen.setPosition(70, 70);
    endScreen.setColor(Color.red);
    var accuracyText = new Text("", "15pt Arial");
    accuracyText.setPosition(outlineRect.getX() + 50, outlineRect.getY() + 70);
    var accuracy = score/clicks * 100;
    var roundedAccuracy = Math.round(accuracy);
    accuracyText.setText("Your accuracy was " + roundedAccuracy + "%");
    var testing = new Rectangle(320, 40);
    testing.setPosition(outlineRect.getX(), outlineRect.getY());
    var textTitle = new Text("Stats of your game", "20pt Arial");
    textTitle.setPosition(108, 84);
    textTitle.setColor(Color.white);
    var gameStatText = new Text("", "15pt Arial");
    gameStatText.setPosition(outlineRect.getX() + 50, outlineRect.getY() + 90);
    gameStatText.setText("Click to score ratio: " + clicks + "/" + score);
    add(coverUp);
    add(outlineRect);
    add(endScreen);
    add(accuracyText);
    add(testing);
    add(textTitle);
    add(gameStatText);
    add(picture);
    
}
