var audio = document.getElementById('audio')

window.onload = function() {
  document.getElementById("button").onclick = function() {
        startGame();
    };
  
    function startGame() {
        interval = setInterval(update, 1000 /60);
        audio.play()   
    }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let frames = 0;
let walls = []
let fwalls = []
let ramps = []
let position = 0;
let type = 0


class Player {
  constructor() {
    this.width = 120
    this.height = 80
    this.y = 300
    this.x = 100
    if(type ===0){
      this.img = new Image()
      this.img.src = "./images/player1.png"
      type = 1
    }else{
      this.img = new Image()
      this.y = 240
      this.img.src = "./images/player2.png"
    }
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    if(frames%2){
      this.y-=5; 
    ctx.drawImage(this.img,  0, 0, 49, 54, this.x, this.y, this.width, this.height)
    }else{
      this.y+=5;
      ctx.drawImage(this.img, 0, 0,49, 54,this.x, this.y, this.width, this.height)
    }
  } 
  moveUp(){
    if(this.y > 230){
      this.y -= 15;
    } 
  }
  moveDown(){
    if(this.y <310 ){
      this.y +=15;
    }
  }
  moveRight(){
    if(this.x < 910){
      this.x +=15;
    }
  }
  moveLeft(){
    if(this.x > 10){
      this.x -=15;
    }
  }
  crash(obstacle) {
    if(obstacle.y === 304){
      return (
        this.x + this.width >= obstacle.x &&
        this.x + this.width <= obstacle.x + obstacle.width &&
        this.y  > 270
      )
    } else if(obstacle.y ===230){
      return (
        this.x + this.width >= obstacle.x &&
        this.x + this.width <= obstacle.x + obstacle.width &&
        this.y  < 270 && this.y > 220
      )
    } else if (obstacle.y === 280){
      return (
        this.x + this.width >= obstacle.x &&
        this.x + this.width <= obstacle.x + obstacle.width &&
        this.y > 209
      )
    }
  }
  jumper(ram) {
    return (
      this.x + this.width >= ram.x &&
      this.x + this.width <= ram.x + ram.width &&
      this.y > 250 && this.y  < 290
    )
  }
  fall(){
    if(this.y<223){
      this.y +=1
    }
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
      if(frames <400){
        this.x-=3;
        if (this.x < -canvas.width){
          this.x = 0;
        } else{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        }
      }else if(frames>=400 && frames<600){
        console.log(-6)
        this.x-=7;
        if (this.x < -canvas.width){
          this.x = 0;
        } else{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
        }
      }else{
          this.x-=20;
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
    constructor() {
      this.x = canvas.width
      position = Math.floor(Math.random()*2)
      if(position === 0){
          this.y = 230
      }else{
          this.y = 304
      }
      this.width =40 
      this.height = 90
      this.img = new Image()
      this.img.src = './images/wall.png'
    }
    draw() {
      
      if(frames<400){
        this.x-=3
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      } else if(frames>=400 && frames<600){
        this.x-= 5
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      } else if(frames>=600 && frames <840){
        this.x-= 6
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      }else if(frames>=1600){
        this.x-= 20
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      }
    }
  }

  function genWall() {
    if (frames %  100 === 0) {
      const wall = new Wall()
      walls.push(wall)
    }
  }
  
  function drawWalls() {
    walls.forEach(wall => wall.draw())
  }
  
  function checkColitions() {
    walls.forEach((wall) => {
      if (player1.crash(wall)) {
        clearInterval(interval)
        ctx.font = '50px "Indie Flower", cursive'
        ctx.fillStyle = 'white'
        ctx.fillText(' Player 1 lose', 150, 100)
        audio.pause();
      }
      if (player2.crash(wall)) {
        clearInterval(interval)
        ctx.font = '50px "Indie Flower", cursive'
        ctx.fillStyle = 'white'
        ctx.fillText(' Player 2 lose', 600, 100)
        audio.pause();
      }
    })
    fwalls.forEach((flo) => {
      if (player1.crash(flo)) {
        clearInterval(interval)
        ctx.font = '50px "Indie Flower", cursive'
        ctx.fillStyle = 'white'
        ctx.fillText(' Player 1 lose', 150, 100)
        audio.pause();
      }
      if (player2.crash(flo)) {
        clearInterval(interval)
        ctx.font = '50px "Indie Flower", cursive'
        ctx.fillStyle = 'white'
        ctx.fillText(' Player 2 lose', 600, 100)
        audio.pause();
      }
    })
  }
 
  class floorWall {
    constructor() {
      this.x = canvas.width
      this.y = 280
      this.width =40 
      this.height = 90
      this.img = new Image()
      this.img.src = './images/wall-floor.png'
    }
    draw() {
      
        this.x-= 20
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      
    }
  }

  function genFloorWall() {
    if (frames %  105 === 0) {
      const floor = new floorWall()
      fwalls.push(floor)
    }
  }

  function drawFloorWalls() {
    if(frames>=920 && frames <1520){
    fwalls.forEach(flo => flo.draw())
  }}

 class Ramp {
  constructor() {
    this.x = canvas.width
    this.y = 304
    this.width =60
    this.height = 45
    this.img = new Image()
    this.img.src = './images/ramp.png'
  }
  draw() {
    if(frames>=900 && frames <1500){
      this.x-=20
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    } 
  }
}

function genRamp() {
  if (frames %  100 === 0) {
    const ramp = new Ramp()
    ramps.push(ramp)
  }
}

function drawRamps() {
  ramps.forEach(ramp => ramp.draw())
}

function checkJump() {
  ramps.forEach((ra) => {
    if (player1.jumper(ra)) {
       player1.y -=180
    }
    if (player2.jumper(ra)) {
       player2.y -=180
    }
  })
}

  let back = new Board()
  let player1 = new Player()
  let player2 = new Player()


  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  function update() {
    frames++;
    console.log(frames)
    clearCanvas();
    back.draw();
    player1.draw()
    player2.draw()
    genRamp()
    drawRamps()
    genWall()
    drawWalls()
    checkJump()
    genFloorWall()
    drawFloorWalls()
    checkColitions()
    player1.fall()
    player2.fall()
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
         case 87:
          player2.moveUp()
          break;
          case 83:
            player2.moveDown()
            break;
          case 68:
            player2.moveRight()
            break;
          case 65:
            player2.moveLeft()
            break; 
      }
    }
  }