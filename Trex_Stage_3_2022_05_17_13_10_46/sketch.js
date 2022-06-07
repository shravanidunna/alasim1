var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage, friends,friendsG;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("aladin sprite 1.jpg","aladin sprite 2.jpg","aladin sprite 3.jpg","aladin sprite 4.jpg","aladin sprite 5.jpg");
  trex_collided = loadAnimation("aladin sprite 1.jpg");
  friend1=loadImage("yasmin sprite 1.jpg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("Picture1.png");
  
  obstacle1 = loadImage("Zafar sprite 1.png");
  
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("game-over1.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  background1 = loadImage("bg1.jpg");
}

function setup() {
  createCanvas(800, 400);
  sea=createSprite(900,200);
  sea.addImage("background1",background1);
  sea.velocityX=-2  
  sea.scale=2
  
  trex = createSprite(50,320,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 1;
  
  ground = createSprite(900,350,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(400,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible=false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  friendsG=createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,20);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  if(sea.x<0){
    
    sea.x=sea.width/2
    }
    
  if(gameState === PLAY){
    
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    sea.velocityX=-2 
    
    //scoring
    score = score + Math.round(frameCount/60);
    
    
   
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;

    
      
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(ground.x) 

    trex.collide(invisibleGround);
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    createFriends();

    if (friendsG.isTouching(trex)) {
      friendsG.destroyEach();
    score=score+30;
    }
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;

    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      sea.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
      
    if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
 
  
  
  
  drawSprites();
textSize(30);
textAlign(CENTER, TOP);
textFont("Impact");
fill("yellow");
stroke("red");
strokeWeight(5);
text("Score: "+ score, 700,20);
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(900,325,10,40);
   obstacle.velocityX = -6;
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle1);
              break;
      case 4: obstacle.addImage(obstacle1);
              break;
      case 5: obstacle.addImage(obstacle1);
              break;
      case 6: obstacle.addImage(obstacle1);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
     cloud = createSprite(750,100,40,10);
    cloud.y = Math.round(random(10,150));
    cloud.addImage(cloudImage);
    cloud.scale = 0.25;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
  
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
function createFriends() {
  if (World.frameCount % 320 == 0) {
  var friends = createSprite(50,40, 10, 10);
  friends.addImage(friend1);
  friends.scale=0.03;
  friends.velocityX = 3;
  friends.lifetime = 150;
  friendsG.add(friends);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}

