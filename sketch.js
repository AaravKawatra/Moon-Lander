let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;
var obstacle ; 
var obs ;
var lz ;
var llz
var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  obstacle = loadImage("obstacle.png") ;
  lz = loadImage("lz.png") ;

  thrust.playing= true;
  thrust.looping= false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addAnimation("lander",lander_img);
lander.addAnimation("crash",crash)
  lander.scale = 0.1;
  lander.addAnimation("land",land)
  lander.debug=true ;
  lander.setCollider("circle",0,0,300);
  
  obs = createSprite(300,500,50,100) ;
  obs.addImage(obstacle);
  obs.scale= 0.5 ;
  obs.debug=true ;
  obs.setCollider ("circle",0,100,100);

  llz = createSprite(550,500,50,150) ;
  llz.addImage(lz);
  llz.scale= 0.5 ;
  llz.setCollider ("rectangle",0,100,300,80);
  llz.debug= true;
  
  
  

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);

  ground = createSprite(500,690,1000,20);

  rectMode(CENTER);
  textSize(15);

}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Horizontal Velocity: " +round(vx,2),800,50);
  text("Fuel: "+fuel,800,25);
  text("Vertical Velocity: "+round(vy),800,75);
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;
  lander.position.x +=vx;

  if (lander.collide(obs)==true){
    console.log("collides");
    lander.changeAnimation("crash");
  }
  if (lander.collide(llz)==true){
    
    lander.changeAnimation("land");
    gameOver();
  }


  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    left_thrust();
  }
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx += 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx -= 0.2;
  fuel-=1;
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://media.istockphoto.com/id/1158068335/vector/world-ufo-day.jpg?s=612x612&w=0&k=20&c=1uGeZ5neNPeV_fHoXZmKsHjAXD_gAQ9YOEtW_wZ0Olc=",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
