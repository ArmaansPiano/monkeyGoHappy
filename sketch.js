var survivalTime;
var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var fruitGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600,600);
  survivalTime = 0;
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  ground = createSprite(400,389,900,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  monkey.scale = 0.2
  fruitGroup =new Group();
  obstacleGroup = new Group();
  score = 0;

  
}


function draw() {
background("lightblue");
if(ground.x < 0) {
ground.x = ground.width/2;
ground.shapeColor = "green"
}
if(keyDown("space")) {
  monkey.velocityY = -10;
}
monkey.velocityY = monkey.velocityY + 0.8;
monkey.collide(ground);
spawnFruits();
spawnObstacles();
  if(obstacleGroup.isTouching(monkey)) {
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
  }
  if(fruitGroup.isTouching(monkey)) {
    score = score + 1;
    fruitGroup.destroyEach();
  }
  textSize(25);
  text("Score:" + score,50,50);
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time:" + survivalTime,200,50)
drawSprites();
}
function spawnFruits() {
  if(frameCount % 80 === 0) {
  banana = createSprite(600,250,40,10);
  banana.y = Math.round(random(120,200));
  banana.velocityX = -5;
  banana.addImage(bananaImage);
  banana.lifetime = 300;
  banana.scale = 0.2;
  banana.depth = monkey.depth + 1;
  fruitGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 320 === 0) {
  obstacle = createSprite(800,380,10,40);
  obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.lifetime = 300;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
  obstacle.setCollider("circle",30,30,50);
  }
}





