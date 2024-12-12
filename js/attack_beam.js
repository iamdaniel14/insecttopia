
class Attack_beam {
    constructor(x, y){
        this.x = x + ((queen.width*0.5) - (attach_beam_img.width*0.5));
        this.y = y;
        this.speed = random(2,8);
    }


    show (){
   image(attach_beam_img, this.x, this.y);
    }

    update (){
    this.y -= this.speed;

    }

 }

