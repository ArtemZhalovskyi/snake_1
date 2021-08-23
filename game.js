const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

let box = 30;

let score = 0;

//рандомное появление "еды"
let food = {
  x: Math.floor((Math.random() * 15 + 3)) * box,
  y: Math.floor((Math.random() * 16 + 3)) * box,
};
//стартовое появление змеи
let snake = [];
snake[0] = {
  x: 9*box,
  y: 9*box,
};
//Отследивание нажатий клавиш
document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if(event.keyCode === 37 && dir !== 'right')
    dir = 'left';
    else if (event.keyCode === 38 && dir !== 'down')
    dir = 'up';
    else if (event.keyCode === 39 && dir !== 'left')
    dir = 'right';
    else if (event.keyCode === 40 && dir !== 'up')
    dir = 'down';
}
// Если змея есть свой хвост
// function eat(head, arr) {
//   for(let i = 0; i < arr.length; i++){
//     if(head.x === arr[i].x && head.x === arr[i].y)
//       clearInterval(game)
//   }
// }

//Положение\перемещение змеции
function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "silver" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box); //параметры головы змеи
  }
//Счетчик очей
  ctx.fillStyle = 'silver';
  ctx.font = '40px Arial';
  ctx.fillText (score, box * 1, box* 2);

//Сопоставление "еды" и "змеи"
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 15 + 3)) * box,
      y: Math.floor((Math.random() * 16 + 3)) * box,
    };
  }else {
    snake.pop();
  }

//Ограничения на выход за рамки
  if(snakeX < box || snakeX > box * 18
  || snakeY < 3* box || snakeY > box * 18)
  clearInterval(game);
//передвижения змейки
  if(dir === 'left') snakeX -= box;
  if(dir === 'right') snakeX += box;
  if(dir === 'up') snakeY -= box;
  if(dir === 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // eat(newHead, snake)
//передача let newHead в начало
  snake.unshift(newHead);
}

let game = setInterval(drawGame, 95);
