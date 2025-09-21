document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;
  let squares = [];
  let score = 0

  //CREATE BOARD
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();

  //GENERATE A NEW NUMBER
  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      //CHECK FOR GAME OVER
    } else {
      generate();
    }
  }

  // MOVE RIGHT
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((number) => number != 0)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)
        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }


  //MOVE LEFT
  function moveLeft(){
    for(let i = 0; i < 16; i++){
      if(i % 4 === 0){
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((number) => number != 0)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)
        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }

  //MOVE UP
  function moveUp(){
    for(let i = 0; i < 4; i++){
      let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredcolumn = column.filter((number) => number != 0)
        let missing = 4 - filteredcolumn.length
        let zeros = Array(missing).fill(0)
        let newcolumn = filteredcolumn.concat(zeros)
        squares[i].innerHTML = newcolumn[0]
        squares[i + width].innerHTML = newcolumn[1]
        squares[i + width * 2].innerHTML = newcolumn[2]
        squares[i + width * 3].innerHTML = newcolumn[3]
    }
  }

  //COMBINE ROW
  function combineRow(){
    for(let i = 0; i < 15; i++){
      if(squares[i].innerHTML === squares[i+1].innerHTML){
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    // checkForWin
  }
  //COMBINE COLUMN
  function combineColumn(){
    for(let i = 0; i < 12; i++){
      if(squares[i].innerHTML === squares[i+width].innerHTML){
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    // checkForWin
  }
  

  //ASSIGN FUNCTIONS TO KEYS
  function control(e){
    if(e.key === "ArrowLeft"){
      keyLeft()
    }else if(e.key === "ArrowRight"){
      keyRight()
    }else if(e.key === "ArrowUp"){
      console.log("upppppppp")
      keyUp()
    }else if(e.key === "ArrowDown"){
      keyDown()
    }
  }

  document.addEventListener("keydown",control)

  function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }


  function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()
  }
  function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  //  function keyDown(){
  //   moveDown()
  //   combineColumn()
  //   moveDown()
  //   generate()
    
  //  }
});
