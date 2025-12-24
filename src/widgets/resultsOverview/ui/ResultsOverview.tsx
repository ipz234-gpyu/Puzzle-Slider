import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { Button } from "@/shared/ui/button";
import { Flex } from "@/shared/ui/flex";
import { LevelCard } from "@/entities/levelCard/ui/LevelCard.tsx";
import { useResultsHistory } from "@/features/resultsHistory";
import { formatTime } from "@/shared/lib/model";

interface ResultsOverviewProps {
    levelId?: string;
}

export const ResultsOverview = ({ levelId }: ResultsOverviewProps) => {
    const navigate = useNavigate();
    const { results, getLevelResults, hasResults } = useResultsHistory();

    const displayResults = levelId ? getLevelResults(levelId) : results;

    if (!hasResults) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyText}>
                    You haven’t completed any levels yet.
                    <br />
                    Try playing first!
                </p>
                <Button onClick={() => navigate("/")}>
                    Go to main menu
                </Button>
            </div>
        );
    }

    if (displayResults.length === 0 && levelId) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyText}>
                    No results for this level yet.
                </p>
                <Button onClick={() => navigate("/results")}>
                    View all results
                </Button>
            </div>
        );
    }

    return (
        <>
            <Flex className={styles.container} justify="between" align="center">
                <h2 className={styles.title}>
                    {levelId ? "Level statistics" : "All statistics"}
                </h2>
                <span className={styles.count}>
                    {displayResults.length}{" "}
                    {displayResults.length === 1 ? "result" : "results"}
                </span>
            </Flex>

            <Flex justify="center" wrap="wrap" gap={10}>
                {displayResults.map((result, index) => (
                    <LevelCard
                        key={`${result.levelId}-${result.gridSize}-${index}`}
                        level={{
                            id: Number(result.levelId),
                            title: result.levelName,
                            imageUrl: result.imageUrl,
                        }}
                        actions={
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                gap="var(--space-1)"
                                fullWidth
                            >
                                <Flex justify="around" align="center" fullWidth>
                                    <span className={styles.statLabel}>Grid size</span>
                                    <div className={styles.statValue}>
                                        <div className={styles.badge}>
                                            {result.gridSize}×{result.gridSize}
                                        </div>
                                    </div>
                                </Flex>

                                <Flex justify="around" align="center" fullWidth>
                                    <span className={styles.statLabel}>Moves</span>
                                    <span className={styles.statValue}>
                                        {result.moves}
                                    </span>
                                </Flex>

                                <Flex justify="around" align="center" fullWidth>
                                    <span className={styles.statLabel}>Time</span>
                                    <span className={styles.statValue}>
                                        {formatTime(result.time)}
                                    </span>
                                </Flex>
                            </Flex>
                        }
                    />
                ))}
            </Flex>
        </>
    );
};