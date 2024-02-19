export default function GameOverScreen({winner, restartingGame}) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>tebrikler siz kazandiniz {winner}!</p> }
            {!winner && <p>bu seferlik berabere!</p>}
            <button onClick={restartingGame}>tekrar oyna</button>
        </div>
    )
}