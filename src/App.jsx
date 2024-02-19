
import { useState } from "react"
import GameBoard from "./components/GamerBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOverScreen from "./components/GameOverScreen"

const gameBoardArrays = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...gameBoardArrays.map((array) => [...array])];

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row , col} = square;
      gameBoard[row][col] = player;
  }

  let winner;
  let draw = gameTurns.length === 9 && !winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = firstSymbol;
    }
  }

  
function restartGame(){
    setGameTurns([]);
}

  const activePlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowI, colI) {

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowI, col: colI }, player: currentPlayer },
        ...prevTurns,
      ];
 
      return updateTurns;
    })
  }

  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">


          <Player player="neşe" symbol="X" isActive={activePlayer === "X"}></Player>
          <Player player="özge" symbol="O" isActive={activePlayer === "O"}></Player>


        </ol>
        {(draw || winner) && <GameOverScreen winner={winner} restartingGame={restartGame}></GameOverScreen>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard}></GameBoard>


      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )


}

export default App
