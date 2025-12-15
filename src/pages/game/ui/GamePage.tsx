import { PuzzleBoard } from "@/widgets/puzzleBoard";
import myImage from '@/img/3.png';

export const GamePage = () => {
    return (
        <div>
            <h1>Ігровий екран</h1>
            <PuzzleBoard imageUrl={myImage} />
        </div>
    );
};
