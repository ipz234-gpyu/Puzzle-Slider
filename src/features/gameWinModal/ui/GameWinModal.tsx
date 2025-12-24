import {useNavigate} from "react-router-dom";
import styles from "./styles.module.css";

import {Modal} from "@/shared/ui/modal/ui/Modal";
import {Button} from "@/shared/ui/button";
import {Flex} from "@/shared/ui/flex";
import {formatTime} from "@/shared/lib/model";
import {useGameSettings} from "@/entities/gameSettings";

interface GameWinModalProps {
    isOpen: boolean;
    onClose: () => void;
    moves: number;
    time: number;
    levelName: string;
    gridSize: number;
    onRestart: () => void;
    onNextLevel?: () => void;
}

export const GameWinModal = ({
                                 isOpen,
                                 onClose,
                                 moves,
                                 time,
                                 gridSize,
                                 onRestart,
                                 onNextLevel
                             }: GameWinModalProps) => {
    const navigate = useNavigate();
    const {settings} = useGameSettings();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="You Won!"
        >
            <Flex direction="column" gap={10}>
                <div className={styles.playerName}>
                    <strong>{settings.playerName}</strong>, that's a great job!
                </div>

                <Flex justify="center" gap={30}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>⏱️ </span>
                        <span className={styles.statValue}>{formatTime(time)}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>👣</span>
                        <span className={styles.statValue}>{moves}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>🧩</span>
                        <span className={styles.statValue}>{gridSize}x{gridSize}</span>
                    </div>
                </Flex>

                <Flex direction="column" gap={10}>
                    {onNextLevel && (
                        <Button variant="primary" size="md" onClick={onNextLevel} fullWidth>
                            Next round
                        </Button>
                    )}
                    <Flex gap={10}>
                        <Button variant="outline" size="md" onClick={onRestart} fullWidth>
                            Try again
                        </Button>
                        <Button variant="outline" size="md" onClick={() => navigate('/results')} fullWidth>
                            View Results
                        </Button>
                        <Button variant="outline" size="md" onClick={() => navigate('/')} fullWidth>
                            Menu
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
};