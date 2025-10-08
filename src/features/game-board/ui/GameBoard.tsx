import { Tile } from "@/entities/tile";
import "../styles/GameBoard.css";

export const GameBoard = () => {
    // Поки що просто генеруємо 15 плиток із числами
    const tiles = Array.from({ length: 15 }, (_, i) => i + 1);

    return (
        <div className="game-board">
            {tiles.map((n) => (
                <Tile key={n} number={n} />
            ))}
            <div className="tile empty" />
        </div>
    );
};
