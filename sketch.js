

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var SurvivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
//creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  //creatig ground
    ground = createSprite(400,350,900,20);
ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x);
  ground.shapeColor = 'lightgreen';
  
  
  //creating groups
  obstaclesGroup = new Group();
FoodGroup = new Group();
 
      
  
  
  SurvivalTime = 0;
  
}


function draw() {
   background("white");
   
     
      ground.velocityX = -(4 + 3* SurvivalTime/100)
  
     
      //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
     
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    //stop monkey from falling down
  monkey.collide(ground);
     
    if(obstaclesGroup.isTouching(monkey)){ 
      
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0); 
     FoodGroup.setVelocityXEach(0); 
      obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
      
    } 
  stroke("black");
  
  textSize(20);
  
  fill("black");
  
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50); 
  

  
  
     spawnFood();
  
  spawnObstacles();
  
  drawSprites();
}


function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
 FoodGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 250 === 0){
   var obstacles = createSprite(300,335,10,40);
    obstacles.addImage(obstacleImage);
   obstacles.velocityX = -5;
   
 
   
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.1;
    obstacles.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacles);
 }
}



