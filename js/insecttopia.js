alert ("Game is won by killing all the enemies")

let bg_img;

let attach_beam_img;3
let attack_beam_sound;

let bg_music;
let bg_music_active = false;

let queen;
let queen_x;
let queen_y;
let attack_beams = [];
let collideSound;
let enemies = [];
let enemy_1_img;
let canvas;
let lifespan =3;
let score =0;
let lifespanLimit=0;
let game_is_won=false;
let game_over=false;

function preload(){
    queen = loadImage('img/queen.png');
    attach_beam_img = loadImage('img/attack-beam-2.gif');
    enemy_1_img = loadImage("img/enemy_1.png");
    attack_beam_sound = loadSound('audio/attack_beam.mp3');
    collideSound = loadSound('audio/collide.wav');
    bg_img = loadImage('img/leaves-background.jpg');
    bg_music = loadSound('audio/bg_music.mp3');
}

function setup(){
   canvas=createCanvas(windowWidth*0.5, windowHeight);
   canvas.position (windowWidth*0.2,0)

    queen.resize(150,0);
    enemy_1_img.resize(100, 0);
    attach_beam_img.resize(50,0);
    background(0);
    queen_x = ((width*0.5)-(queen.width*0.5));  
    queen_y = (height-queen.height)-50;
    let enemy_size=enemy_1_img.width;

    for (let i=0; i <15; i++) {
     enemies[i]=(new Create_enemy(enemy_size));
    }
}

function draw(){
    image(bg_img, 0, 0, width, height);
    

    if(keyIsDown(LEFT_ARROW) && queen_x >= 2){
        queen_x -= 4;
        check_bg_audio();
    }
    if(keyIsDown(RIGHT_ARROW) && (queen_x+queen.width) < width){
        queen_x += 4;
        check_bg_audio();

    } 
     


    for (let i=enemies.length-1; i>=0; i--) {
        enemies[i].show();

        if (!game_over) {
            enemies[i].update();

        }

        if (enemies[i].edges() ){
            enemies[i].x=random(0, (width-enemy_1_img.width));
            enemies[i].y=(random (-400,-800));
        };

 if (enemies[i].territoryCrossing(queen_y)&&lifespan>lifespanLimit) {
 lifespan--;
 break;
  }

       

    

        for (let j=attack_beams.length-1; j>=0; j--) {
            if (enemies[i].attacked(attack_beams[j])) {
            enemies.splice(i, 1); 
            attack_beams.splice(j, 1); 
            collideSound.play();
            score++;
     if (enemies.length==0) {
    game_is_won=true;
  }

            break;
            }
        }

    }


    
    for (let j = attack_beams.length - 1; j >= 0; j--) {
        attack_beams[j].show ();
        attack_beams[j].update();
    }

    if (lifespan==lifespanLimit){
        game_over=true;
    }

    
    
if(game_over)  {
    textAlign (CENTER)
      textSize (100);
      fill ("white");
      text ("GAME OVER" ,width*0.5,height*0.5)
}


if (game_is_won)  {
    textAlign (CENTER)
      textSize (100);
      fill ("white");
      text ("YOU WON" ,width*0.5,height*0.5)
}

    fill ("white");
    textSize (30);;
    text ('Score:'+ score,width*0.09,40);
    text ('Life:'+ lifespan,width*0.9,40);



    image(queen, queen_x, queen_y);
}

function check_bg_audio(){
    if(!bg_music_active){
        bg_music.play();
    }
    bg_music_active = true;
}

 function keyPressed(){
    if(keyCode === 32 &&!game_over){
    attack_beams.push(new Attack_beam(queen_x, queen_y));
    attack_beam_sound.play();
    }
 }

 