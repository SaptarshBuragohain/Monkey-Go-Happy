var bananaImage,obstacleImage,backImage,player_running;
var obstacleGroup,bananaGroup;
var monkey,scene,bananaSprite,obstacleSprite;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var obstacleCount = 0;

function preload() 
{
  backImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup()
{
  createCanvas(400, 400);
  
  scene = createSprite(0,0,400,400);
  scene.addImage(backImage);
  scene.scale = 1.0;
  scene.velocityX = -2;

  monkey=createSprite(125,345,20,20);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.07;
  
  ground = createSprite(200,380,800,20);
  ground.velocityX = -2;  
    
  invisibleGround = createSprite(0,380,800,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX = -2;
  
  bananaGroup = new Group();
  Banana();
  
  obstacleGroup = new Group();
  Obstacles();
 
    
  //banana=createSprite(200,250,20,20);
  //banana.addImage("myBanana", bananaImage);
  //banana.scale = 0.05;

  //obstacle=createSprite(200,350,20,20);
  //obstacle.addImage("myObstacle", obstacleImage);
  //obstacle.scale = 0.13;
  

}

function draw() 
{
  background(180);
  drawSprites();
  
  if (scene.x < 50){
    scene.x = scene.width/2;
  }
  if (ground.x < 80){
    ground.x = ground.width/2;
  }
  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  if (bananaSprite.x < 100){
    bananaSprite.x = bananaSprite.width/1;
    bananaSprite.lifetime = 350;
  }
  
  if (obstacleSprite.x < 100){
    obstacleSprite.x = obstacleSprite.width/1;
    obstacleSprite.lifetime = 350;
  }
  var survivalTime = Math.round(World.frameCount/4);
  fill(0,0,0);
  text("Survival Time : " + survivalTime,200,100);
   
  if(keyDown("space") && monkey.y >= 0)
  {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
  
  

  
  fill(0,0,0);
  text("Score : "+score,170,30);
  text("Obstacle Hit = "+ obstacleCount,170,50);
  

  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score=score+2;
    Banana();
  }
  
  if(obstacleCount === 5)
  {
    gameState = END;
    textSize(25);
    fill(255,0,0);
    text("GAME OVER ",120,200);
    reset(survivalTime);
    
  }
  
  if (gameState === END) {
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityYEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.destroy();
    survivalTime=survivalTime+Math.round(World.frameRate/60);
  }
  
  switch(score)
  {
    case 10: monkey.scale=0.12;
    break;
    case 20: monkey.scale=0.14;
    break;
    case 30: monkey.scale=0.16;
    break;
    case 40: monkey.scale=0.18;
    break;
        
    default:break;
  }
  
  if(obstacleGroup.isTouching(monkey)) 
  {
    obstacleGroup.destroyEach();
    obstacleCount=obstacleCount+1;
    monkey.scale=0.07;
    Obstacles();
  }
  
  if(obstacleCount>=300) 
  {
    gameState=END;
  }
  
  if (gameState === END) 
  {
    text("GAMEOVER!!!",200,200);
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityYEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    monkey.destroy();
  }

}

function Banana()
{
  bananaSprite = createSprite(395,250,20,20);
  bananaSprite.addImage(bananaImage);
  bananaSprite.y = Math.round(random(180,270));
  bananaSprite.scale = 0.05;
  bananaSprite.velocityX = -4;
  bananaGroup.add(bananaSprite);
}

function Obstacles()
{
  obstacleSprite=createSprite(395,350,10,40);
  obstacleSprite.addImage(obstacleImage);
  obstacleSprite.scale = 0.1;
  obstacleSprite.velocityX = -4;
  obstacleGroup.add(obstacleSprite);
}


