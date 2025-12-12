import { GameBoard } from "@/widgets/PuzzleBoard";
import myImage from '@/img/3.png';

export const GamePage = () => {
    return (
        <div>
            <h1>Ігровий екран</h1>
            <GameBoard imageUrl={myImage} />
        </div>
    );
};
