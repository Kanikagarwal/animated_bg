const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x:undefined,
    y:undefined
}

var maxRadius = 40;
var minRadius = 2;

window.addEventListener("mousemove",function (event) {
    mouse.x=event.x;
    mouse.y=event.y;
    console.log(mouse);
    
})
let isTouching = false;

window.addEventListener("touchmove", function(event) {
    event.preventDefault();
    isTouching = true;
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});

function smoothTouchUpdate() {
    if (isTouching) {
        mouse.x += (mouse.x - mouse.x) * 0.1;
        mouse.y += (mouse.y - mouse.y) * 0.1;
    }
    requestAnimationFrame(smoothTouchUpdate);
}
smoothTouchUpdate();

function Circle(x,y,dx,dy,radius,color1,color2){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        let gradient = c.createLinearGradient(this.x,this.y-this.radius,this.x,this.y+this.radius)
        gradient.addColorStop(0,color1)
        gradient.addColorStop(1,color2)
        c.stroke();
        c.fillStyle = gradient;
        c.fill();
    }
    this.update = function(){
        if(this.y+this.radius>innerWidth || this.y-this.radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius<0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.x-this.y>-50){
            this.radius+=1;
            if(this.radius<maxRadius){
                this.radius+=1;
            }
        }
        else if(this.radius>minRadius){
            this.radius-=1;
        }
        this.draw();
    }
}

var circleArray = [];

for(var i=1;i<100;i++){
    var radius=30;
    var x = Math.random()*(innerWidth-radius*2)+radius;
    var y=Math.random()*(innerHeight-radius*2)+radius;
    var dx = (Math.random()-0.5)*8;
    var dy=(Math.random()-0.5)*8;
    var s1 = "#00c9ff";
    var s2 = "#92fe9d";
    var s3 = "#ff6a00";
    var s4 = "#ee0979";
    if(i%2==0){
        circleArray.push(new Circle(x,y,dx,dy,30,s1,s2));

    }
    else{
        circleArray.push(new Circle(x,y,dx,dy,30,s3,s4));
    }
}

console.log(circleArray);


// var radius = 30;
function animate() {
    requestAnimationFrame(animate);
c.clearRect(0,0,innerWidth,innerHeight);
for(var i=0;i<circleArray.length;i++){
    circleArray[i].update();
}
}
animate();
