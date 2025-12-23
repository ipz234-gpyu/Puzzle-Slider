import {useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import {useGameProgress} from "../hooks/useGameProgress";

import {Button} from "@/shared/ui/button";
import {Flex} from "@/shared/ui/flex";

interface LevelProgressActionsProps {
    levelId: number;
}

export const LevelProgressActions = ({levelId}: LevelProgressActionsProps) => {
    const {getLevelStatus, isLoading} = useGameProgress();
    const navigate = useNavigate();

    if (isLoading) return <div className={styles.loading}>Loading...</div>;

    const {currentSize, isSandbox} = getLevelStatus(levelId);

    const buttonText = isSandbox
        ? "Sandbox Mode"
        : `Level ${currentSize}x${currentSize}`;

    const handlePlay = () => {
            navigate(`/game/${levelId}`);
    };

    return (
        <Flex direction="column" align="center" justify="center" gap="var(--space-3)" wrap="wrap" fullWidth>
            <Button
                onClick={handlePlay}
                variant="secondary"
                size="md"
            >
                {buttonText}
            </Button>
        </Flex>
    );
};