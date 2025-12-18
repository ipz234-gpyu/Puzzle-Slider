import {useParams} from "react-router-dom";
import {PuzzleBoard} from "@/widgets/puzzleBoard";
import {Header} from "@/widgets/header";
import {useLevelById} from "@/entities/levelCard";

export const GamePage = () => {
    const {id, size} = useParams<{ id: string; size: string }>();
    const {level, isLoading} = useLevelById(id);
    const gridSize = Number(size);

    if (isLoading) return <div className="page">Loading game data...</div>;
    if (!level) return <div className="page">Level not found :(</div>;

    return (
        <>
            <Header 
                showBackButton
            />

            <PuzzleBoard
                imageUrl={level.imageUrl}
                gridSize={gridSize}
            />
        </>
    );
};