//Dom Elements
const playbtn = document.getElementById("play");
const firstPage = document.querySelector(".first-page");
const SecPage = document.querySelector(".secPage");
const canvas = document.getElementById("gameCanvas");
const yourScore = document.querySelector(".secScore");
const finalscore = document.getElementById("finalscore");
const HomeBtn = document.getElementById("Home-btn");
const Playagain = document.getElementById("PlayAgain");
const highestscore = document.getElementById("highestscore");
const Lastscore = document.getElementById("lastscore");
const ctx = canvas.getContext("2d");

//Game Variable
    const Cellsize = 20;
    const gameSpeed = 150;
    const BoardWidth = 400;
    const BoardHeight = 400;
   let Score = 0;

     let snake = [
        {x: 12, y: 10},
        {x: 11, y: 10},
        {x: 10, y: 10},
    ];

   
//Play button
playbtn.addEventListener("click", Gamerun);


HomeBtn.addEventListener("click",()=>{
    SecPage.style.display = "none";
    load();
    Reset();
});

Playagain.addEventListener("click",()=>{
    SecPage.style.display = "none";
    Opennexttab("#gameCanvas");
    Gamerun();
});

//KEY MOVEMENT
let direction = 'RIGHT';

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN')    direction = 'UP';
    if (e.key === 'ArrowDown' && direction !== 'UP')  direction = 'DOWN';
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT')  direction = 'LEFT';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});


function Opennexttab(Page){
    firstPage.classList.add("hidden");
    canvas.classList.add("hidden");
    document.querySelector(Page).classList.remove("hidden");    
}

function drawboard(){
    ctx.fillStyle = '#0f0f0f'; // set color FIRST
    ctx.fillRect(0,0,BoardWidth,BoardHeight);   // then draw
}


function drawSnake(){
    snake.forEach((part, index) => {

    // index 0 = head → brighter color
    // index 1,2,3... = body → slightly darker
    if (index === 0) {
        ctx.fillStyle = '#00ff55';        // bright green head
    } else {
        ctx.fillStyle = 'rgba(0,200,68,0.8)';  // darker body
    }

    ctx.fillRect(
        part.x * Cellsize + 1,   // x position on canvas
        part.y * Cellsize + 1,   // y position on canvas
        Cellsize - 2,            // width  (20-2 = 18px, small gap)
        Cellsize - 2             // height (20-2 = 18px, small gap)
    );
    
});
}

function drawfood(){
    let food = {
    x: Math.floor(Math.random() * (BoardWidth / Cellsize)),
    y: Math.floor(Math.random() * (BoardHeight / Cellsize))
 };
    return food
}

function movesnake(){
    const head = { ...snake[0] }; // copy of current head

    // Update head position based on direction
    if (direction === 'UP' ) head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    snake.unshift(head); // add new head to the front of the snake
    snake.pop(); // remove the last part of the snake to maintain length
}

function collision() {
    head = snake[0];

    if (head.x < 0 || head.x >= BoardWidth / Cellsize ||
        head.y < 0 || head.y >= BoardHeight / Cellsize) {
            clearInterval(GameInterval);
            savescore();
            gameover();
        };

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(GameInterval);
            savescore();
            gameover();
            return true 
        };
    }
}

food = drawfood();
console.log(food)
function Placefood(){
    if(snake[0].x == food.x && snake[0].y == food.y){
        Score += 10;
        snake.push({ ...snake[snake.length - 1] });
        food = drawfood();
    };
    const x =food.x * Cellsize;
    const y =food.y * Cellsize;
    // Red circle
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
        x + Cellsize / 2,   // center of cell (x + 10)
        y + Cellsize / 2,   // center of cell (y + 10)
        Cellsize / 2 - 2,   // radius = 8px
        0,
        Math.PI * 2          // full circle
    );
    ctx.fill();
}

function Gameloop(){
    movesnake();
    collision();
    drawGame();
}

function drawGame(){
    drawboard();
    drawSnake();
    Placefood();

}
let GameInterval;
function Gamerun(){
    Opennexttab("#gameCanvas");
    Reset();
    drawGame();
    GameInterval = setInterval(Gameloop,gameSpeed);
}

function load(){
    Opennexttab('.first-page');
    highestscore.innerHTML = localStorage.getItem("Highscore");
    Lastscore.innerHTML = localStorage.getItem("lastscore");
}

function savescore(){
    const Finalscore = localStorage.getItem("Highscore");
    localStorage.setItem("lastscore",Score);
    if (Finalscore < Score) localStorage.setItem("Highscore",Score);
}

function gameover(){
    canvas.classList.add("hidden");
    SecPage.style.display = "flex";
    yourScore.innerHTML = Score;
    finalscore.innerHTML = localStorage.getItem("Highscore");
    
    //Resets Everything
}

function Reset(){
    Score = 0;
    snake = [
        {x: 12, y: 10},
        {x: 11, y: 10},
        {x: 10, y: 10},
    ];
    direction = "RIGHT";
    food = drawfood();

}

load()

