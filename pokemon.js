level=1;
speedup = 0;
var score = 0;
header();
function loadImages(){
    pokemonImage = new Image();
    enemyImage = new Image();
    goalImage = new Image();
    
    
    pokemonImage.src = 'images/pika.png';
    
    enemyImage1 =[ 'images/onix.png',
     'images/bulbasaur.png',
     'images/charmeleon.png',
    'images/gengar.png'];
    
    back = [
        
    ]
    goalImage.src= 'images/ball.png';
    
    
}

enemies =[
        {
        x:150,
        y:100,
        w:100,
        h:100,
        speed:3,
        color:"orange"
        },
        {
        x:350,
        y:300,
        w:100,
        h:100,
        speed:4,
        color:"blue",
        },
        {
        x:550,
        y:200,
        w:100,
        h:100,
        speed:5,
        color:"green",
        }
        
    ];

function drawScore() {
    pen.font = "16px Arial";
    pen.fillStyle = "black";
    pen.fillText("Score: ", 0, 20);
}

function header()
{
        hsc = localStorage.getItem("highestScore");
    if (score>hsc)
        {
            localStorage.highestScore=score;
        }

  document.getElementById("scores").innerHTML="Your Score is :"+score+"   Level "+level+"   High Score  "+ hsc;   
    
}
function init(){
   speedup = 0;
    canvas = document.getElementById('mycanvas');
    header();
    pen =canvas.getContext('2d');
    drawScore();
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    GAME_OVER = false;
    
    //pen.fillRect(0,0,WIDTH,HEIGHT/20);
    //pen.fillStyle("white");
    //pen.fillText("Health",10,10,WIDTH/20,HEIGHT/20);
    
    pen.fillStyle = "#fcf";
    
    pokemon = {
        x: 0,
        y:HEIGHT/2,
        w:100,
        h:100,
        speed:10,
        moving:false,
    };
    
    goal = {
        x:WIDTH-100,
        y:HEIGHT/2,
        w:100,
        h:100,
    };    
    
    
    
    
    document.addEventListener('keydown',function(e){
        if(e.keyCode==39){
            pokemon.x += pokemon.speed;
            score+=1;
header();
        }
        if(e.keyCode==37){
            pokemon.x -= pokemon.speed;
        }
        if(e.keyCode==38){
            pokemon.y -= pokemon.speed;
        }
        if(e.keyCode==40){
                pokemon.y += pokemon.speed;
        }
        console.log(e);
    });
    
    document.addEventListener('mousedown',function(e){
        //pokemon.x += pokemon.speed;
        pokemon.moving = true;
    });
    document.addEventListener('mouseup',function(e){
        //pokemon.x += pokemon.speed;
        pokemon.moving = false;
    });
    
}
function isColliding(box1,box2){
    
    x_axis = Math.abs(box1.x  - box2.x)<=box1.w;
    
    y_axis = Math.abs(box1.y  - box2.y)<=box1.w;
    
    return x_axis && y_axis;    
}

function draw(){
    //Erase the old screen
    pen.clearRect(0,0,WIDTH,HEIGHT);
    
    //Draw the pokemon
    pen.drawImage(pokemonImage,pokemon.x,pokemon.y,pokemon.w,pokemon.h);
    pen.drawImage(goalImage,goal.x,goal.y,goal.w,goal.h);
   
   for(var i=0;i<enemies.length;i++){
       console.log("drawing"+i);
       console.log(enemies.length);
        pen.fillStyle = enemies[i].color;
       b=i%4;
       ei = new Image();
       ei.src=enemyImage1[i];
        pen.drawImage(ei,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h); 
   }
    
}

function append()
{console.log("inside append");
    enemies.push({
        x:enemies[enemies.length-1].x+200,
      y:enemies[enemies.length-1].y,
      w: enemies[enemies.length-1].w,
      h:enemies[enemies.length-1].h,
      speed:enemies[enemies.length-1].speed,
      color:"blue",
    });
}
function update(){
    
    for(var i=0;i< enemies.length;i++){
    
        
    enemies[i].y += enemies[i].speed + speedup;
    
    if(enemies[i].y>=(HEIGHT-enemies[i].h)||enemies[i].y<=0){
        enemies[i].speed *= -1;
        }
    }
    if(pokemon.moving==true){
        pokemon.x += pokemon.speed;
    }
    if( isColliding(pokemon,goal)){
        alert("You Won");
        level+=1;
        speedup += 1;
        score += 100;
       append();
        startGame();
    }
    enemies.forEach(function(enemy){
        if(isColliding(enemy,pokemon)){
          
            alert("Game Over"+" Score: "+score);
              
            GAME_OVER = true;
        reset();
            level=1;
            score=0;
          window.location.reload();  
    }});
}

function reset()
{
    speedup=0;
    init();
}
function render(){
    draw();
    update();
   
   console.log("In Render");
    if(GAME_OVER==false){
        window.requestAnimationFrame(render);
    }
    else{
        reset();
    speedup=0;
        startGame();
        
    }
}

loadImages();
function startGame(){
header();
    init();
    render();
}
startGame();
