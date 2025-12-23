import {useParams} from "react-router-dom";
import {useLevelById} from "@/entities/levelCard";
import {Header} from "@/widgets/header";
import {GameSession} from "@/widgets/gameSession";

export const GamePage = () => {
    const {id} = useParams<{ id: string }>();
    const {level, isLoading} = useLevelById(id);

    if (isLoading) return <div className="page">Loading game data...</div>;
    if (!level) return <div className="page">Level not found :(</div>;

    return (
        <>
            <Header showBackButton/>
            <GameSession level={level}/>
        </>
    );
};