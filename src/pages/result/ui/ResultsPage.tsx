import {useParams} from "react-router-dom";
import {Header} from "@/widgets/header";
import {ResultsOverview} from "@/widgets/resultsOverview";
import {useLoadResultsData} from "@/features/resultsHistory";
import {useGameSettings} from "@/entities/gameSettings";
import styles from "./styles.module.css";

export const ResultsPage = () => {
    const {levelId} = useParams<{levelId?: string}>();
    const {settings} = useGameSettings();
    const {isLoading, isReady} = useLoadResultsData();

    const title = levelId
        ? `Результати рівня`
        : `Результати, ${settings.playerName}`;

    return (
        <div className="page">
            <Header title={title} showBackButton />

            <div className={styles.container}>
                {isLoading && !isReady ? (
                    <div className={styles.loading}>Завантаження результатів...</div>
                ) : (
                    <ResultsOverview levelId={levelId} />
                )}
            </div>
        </div>
    );
};