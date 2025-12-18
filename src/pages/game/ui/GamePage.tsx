import {useParams, useNavigate} from "react-router-dom";
import {PuzzleBoard} from "@/widgets/puzzleBoard";
import {Header} from "@/widgets/header";
import {useLevelById} from "@/entities/levelCard";

export const GamePage = () => {
    const {id, size} = useParams<{ id: string; size: string }>();
    const navigate = useNavigate();
    const {level, isLoading} = useLevelById(id);
    const gridSize = Number(size);

    if (isLoading) return <div className="page">Loading game data...</div>;
    if (!level) return <div className="page">Level not found :(</div>;

    const handleWin = (stats: {moves: number, time: number}) => {
        navigate("/result", { 
            state: { 
                ...stats, 
                levelName: level.title,
                gridSize 
            } 
        });
    };

    return (
        <>
            <Header 
                showBackButton
            />

            <PuzzleBoard
                imageUrl={level.imageUrl}
                gridSize={gridSize}
                onWin={handleWin}
            />
        </>
    );
};