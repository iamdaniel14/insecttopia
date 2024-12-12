class Create_enemy {
    constructor(size){
        this.x = random(0, (width-enemy_1_img.width));
        this.y = random (-200,-800);
        this.speed = random(0.5, 1);
        this.size=size;
    }

    show (){
    image(enemy_1_img, this.x, this.y);
    }

    
    update(){
    this.y += this.speed;

     }
attacked(beam){
if (beam.y<this.y&&beam.x>this.x&& beam.x<this.x+this.size){
return true;
}
 }

edges (){
if (this.y>height+this.size&&this.y>=0 ) {
console.log ('reached the edges');
return true;
    }
 }


territoryCrossing (queenY) {
if (this.y>queenY &&this.y<queenY+1) {
console.log ("crossed by the territory");
 return true;
}
 }

}