import Ball from "./ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Player(document.getElementById
    ("player-Paddle"))
const computerPaddle = new Player(document.getElementById
    ("computer-Paddle"))

    const playerScoreElem = document.getElementById("player-Score")
    const computerScoreElem = document.getElementById("computer-Score")

let lastTime

function update(time) {
    if (lastTime != null) {       
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

    document.documentElement.style.setProperty("--hue", hue + delta * .01)

    if(isLose()) handleLose()
       console.log("lose")
    }

 }    
    lastTime = time
    window.requestAnimationFrame(update)



function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0 
    }

    function handleLose() {
        const rect = ball.rect()
        if(rect.right >= window.innerWidth) {
            playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
        } else {
            computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
        }

        ball.reset()
        computerPaddle.reset()
    }


document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)