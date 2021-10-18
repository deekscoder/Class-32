const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;

var blower
var mute_button

var background_song
var eating_sound
var sad_sound
var cut_sound
var air_sound

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  eating_sound = loadSound("eating_sound.mp3")
  background_song = loadSound("sound1.mp3")
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound("rope_cut.mp3")
  air_sound = loadSound("air.wav")

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  background_song.play()
  background_song.setVolume(0.5)
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  blower = createImg('balloon.png')
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airBlow);

  mute_button = createImg('mute.png')
  mute_button.position(420,20);
  mute_button.size(50,50);
  mute_button.mouseClicked(mute);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(420,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     background_song.stop()
     sad_sound.play()
   }

   drawSprites();
}

function drop()
{
  cut_sound.play()

  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air_sound.play()
}

function mute(){
  if(background_song.isPlaying()){
    background_song.stop()
  }
  else{
    background_song.play()
  }
}
