import {useNavigate} from "react-router-dom";
import {useResultsHistory} from "@/features/resultsHistory";
import {ResultCard} from "@/entities/resultCard";
import {Button} from "@/shared/ui/button";
import styles from "./styles.module.css";

interface ResultsOverviewProps {
    levelId?: string;
}

export const ResultsOverview = ({levelId}: ResultsOverviewProps) => {
    const navigate = useNavigate();
    const {results, getLevelResults, hasResults} = useResultsHistory();

    const displayResults = levelId ? getLevelResults(levelId) : results;

    if (!hasResults) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyText}>
                    Поки що немає пройдених рівнів.
                    <br />
                    Спробуйте спочатку зіграти!
                </p>
                <Button onClick={() => navigate("/")}>
                    До головного меню
                </Button>
            </div>
        );
    }


    if (displayResults.length === 0 && levelId) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyText}>
                    Немає результатів для цього рівня
                </p>
                <Button onClick={() => navigate("/results")}>
                    Всі результати
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {levelId ? "Результати рівня" : "Всі результати"}
                </h2>
                <span className={styles.count}>
                    {displayResults.length} {displayResults.length === 1 ? "результат" : "результатів"}
                </span>
            </div>

            <div className={styles.list}>
                {displayResults.map((result, index) => (
                    <ResultCard
                        key={`${result.levelId}-${result.gridSize}-${index}`}
                        imageUrl={result.imageUrl}
                        title={result.levelName}
                        gridSize={result.gridSize}
                        time={result.time}
                        moves={result.moves}
                        actions={
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    navigate(`/game/${result.levelId}`, {
                                        state: {size: result.gridSize},
                                    })
                                }
                            >
                                Грати знову
                            </Button>
                        }
                    />
                ))}
            </div>
        </div>
    );
};