const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
const cellElements = document.querySelectorAll('[data-cell]')
board = document.getElementById('board')
winningMessageElement = document.getElementById('winningMessage')
winningMessageTextElement = document.querySelector('[data-winning-message-text]')
restartButton = document.getElementById('restartButton')
const incoporationText = document.getElementById('incoporation')

let circleTurn;


startGame()
restartButton.addEventListener('click', startGame)

function startGame (params) {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
        
    })
setBoardHoverClass()
winningMessageElement.classList.remove('show')
}
    


function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    if(checkWin(currentClass)){
    endGame(false)

    } else if (isDraw()) {
        endGame(true)
    } else{
        swapTurn()
        setBoardHoverClass()
    }

}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
        incoporationText.innerText = 'All Right Reserved@ RayHub 2022'
        
    } 
    else {
        winningMessageTextElement.innerText = `${
        circleTurn ? "O's" : "X's" } wins!`
        incoporationText.innerText = 'All Right Reserved@ RayHub 2022'
        }
        winningMessageElement.classList.add('show')
        incoporationText.classList.add('show')

    
    
}


function isDraw (params) {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })

    
}

function placeMark (cell, currentClass){
    cell.classList.add(currentClass)
}


function swapTurn(){
    circleTurn = !circleTurn
}


function setBoardHoverClass () {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

    
}

function checkWin(currentClass) {
    return winningCombinations.some(combinations=>{
        return combinations.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}