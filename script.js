window.onload = function() {
    document.getElementById("button").onclick = function() {
      startGame();
    };
  
    function startGame() {
        interval = setInterval(update, 1000 /60);   
    }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let walls = []

class Player {
  constructor() {
    this.width = 350
    this.height = 40
    this.y = 340
    this.x = 100
    this.img = new Image()
    this.img.src = "./images/player1.png"
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    if(frames%2){
      this.y-=3;
      
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }else{
      this.y+=3;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
} 
moveUp(){
  if(this.y > 280){
    this.y -= 10;
  } 
}
moveDown(){
  if(this.y <340 ){
    this.y +=10;
  }
}
moveRight(){
  if(this.x < 910){
    this.x +=10;
  }
}
moveLeft(){
  if(this.x > 20){
    this.x -=10;
  }
}
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38:
      player1.moveUp()
      break;
    case 40:
      player1.moveDown()
      break;
    case 39:
      player1.moveRight()
      break;
    case 37:
      player1.moveLeft()
      break;
  }
}



class Board{
    constructor() {
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height +80;
      this.img = new Image();
      this.img.src = "./images/background.png";
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      if(frames <300){
        this.x-=1;
        if (this.x < -canvas.width){
          this.x = 0;
        } else{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        }
      }else if(frames>=300 && frames<600){
        console.log(-6)
        this.x-=6;
        if (this.x < -canvas.width){
          this.x = 0;
        } else{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        }
      }else{
          console.log(-25)
          this.x-=25;
        if (this.x < -canvas.width){
          this.x = 0;
        } else{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        }
      }
    }
  }

  class Wall {
    constructor(y) {
      this.x = canvas.width
      this.y = 315
      this.width =40 
      this.height = 80
      this.img = new Image()
      this.img.src = './images/wall.png'
    }
    draw() {
      if(frames<300){
        this.x-=2
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      } else if(frames>=300 && frames<600){
        this.x-= 6
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      } else{
        this.x-= 25
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      }
    }
  }

  function genWall() {
    if (frames %  50 === 0) {
      const wall = new Wall()
      walls.push(wall)
    }
  }
  
  function drawWalls() {
    walls.forEach(wall => wall.draw())
  }


  let back = new Board()
  let player1 = new Player()


  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    frames++;
    clearCanvas();
    back.draw();
    player1.draw()
    genWall()
    drawWalls()
  }