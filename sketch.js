
var gameState = "play"
var score;
var health;
var ground,groundImg;
var player,playerImg;
var bolt,boltImg;
var ultron,ultronImg,ultronGroup;
var bolt2,boltImg2,boltGroup;
var life1,life2,life3,lifeImg;
var gameover,gameoverImg;


function preload(){
  groundImg = loadImage("ground.jpg");
  playerImg = loadImage("player.png");
  boltImg = loadImage("bolt.png");
  ultronImg = loadImage("ultron.png");
  gunshot = loadSound("gunshot.wav");
  boltImg2 = loadImage("bolt2.png");
  lifeImg = loadImage("life.png");
  shout = loadSound("shout.wav");
  gameoverImg = loadImage("over.jpg");

}

function setup() {
 createCanvas(800,400);
  
  player = createSprite(100,300);
  player.addImage(playerImg);
  player.scale = 0.3;
  
  ground = createSprite(400,200);
  ground.addImage(groundImg);
  ground.scale = 3.4;
  ground.velocityX = -5;
  ground.depth = player.depth - 1;
  
  life1 = createSprite(30,20);
  life1.addImage(lifeImg);
  life1.scale=0.1;
  
  
  life2 = createSprite(70,20);
  life2.addImage(lifeImg);
  life2.scale=0.1;

  
  life3 = createSprite(110,20);
  life3.addImage(lifeImg);
  life3.scale=0.1;
  
  gameover = createSprite(400,200);
  gameover.addImage(gameoverImg);
  gameover.scale = 2;
  gameover.visible = false;
  
  boltGroup = new Group();
  ultronGroup = new Group();
  
  score = 0;
  health = 3;
  
}

function draw() {
  background("white");
  
 if(gameState === 'play'){
   
 
  
  
  
     
  
  if (keyWentDown("space")){
    bolt = createSprite(200,290,10,10);
    bolt.addImage(boltImg);
    bolt.scale = 0.1;
    bolt.velocityX = 12;
    bolt.y = player.y; 
    bolt.lifetime = 800;
    gunshot.play();
    
      
      }
   if (ultronGroup.isTouching(bolt)){
     ultronGroup.destroyEach();
     bolt.destroy();
   }
  
  
  if(keyDown("up")){
    player.y = player.y-10;
  }
  
  if(keyDown("down")){
    player.y = player.y+10;
  }
  
  
    if(ground.x<150){
     ground.x = 390
     }
  
  if(ultronGroup.isTouching(player) && health === 3){
    health = health-1;
    ultronGroup.destroyEach();
    life3.destroy();
    shout.play();
    
    
  }
 
   
  spawnUltron();
  spawnBolts();
   
  if(ultronGroup.isTouching(player) && health === 2){
    health = health-1;
    ultronGroup.destroyEach();
    life2.destroy();
    shout.play();
    
    
  }
  if(ultronGroup.isTouching(player) && health === 1){
    health = health-1;
    ultronGroup.destroyEach();
    life1.destroy();
    shout.play();
    gameState = "end";

    
    
  }
  
  
  if(boltGroup.isTouching(player) && health === 3){
    health = health-1;
    boltGroup.destroyEach();
    life3.destroy();
    shout.play();
    
    
  }
 
  if(boltGroup.isTouching(player) && health === 2){
    health = health-1;
    boltGroup.destroyEach();
    life2.destroy();
    shout.play();
    
    
  }
  if(boltGroup.isTouching(player) && health === 1){
    health = health-1;
    boltGroup.destroyEach();
    life1.destroy();
    shout.play();
    gameState = "end";
    
  }
 }
  else if(gameState === "end"){
    player.destroy();
    ultronGroup.destroyEach();
    boltGroup.destroyEach();
    ground.destroy();
    gameover.visible = true;
    
    
    
          }
 
 
  
   
  
 drawSprites();
  
}

function spawnUltron(){
  if(frameCount % 100 === 0){
     ultron = createSprite(850,200);
    ultron.y = Math.round(random(100,650));
    ultron.addImage(ultronImg);
    ultron.velocityX = -2;
    ultron.liftime = 800;
    ultronGroup.add(ultron);
    ultron.scale=0.15;
    
  
  }
}
function spawnBolts(){
       bolt2 = createSprite(850,190);
  if(frameCount % 100 === 0){
    bolt2.y = ultron.y;
    bolt2.addImage(boltImg2);
    bolt2.velocityX = -12;
    bolt2.lifetime = 800;
    boltGroup.add(bolt2);
    bolt2.scale = 0.2;
  }
}