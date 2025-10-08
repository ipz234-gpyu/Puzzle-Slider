import { GameBoard } from "@/features/game-board";

export const GamePage = () => {
    return (
        <div className="page game-page">
            <h1>Ігровий екран</h1>
            <GameBoard />
        </div>
    );
};
