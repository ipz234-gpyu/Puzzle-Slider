import type {ReactNode} from "react";
import styles from "./styles.module.css";

interface ResultCardProps {
    imageUrl: string;
    title: string;
    gridSize: number;
    time: number;
    moves: number;
    actions?: ReactNode;
}

export const ResultCard = ({
                               imageUrl,
                               title,
                               gridSize,
                               time,
                               moves,
                               actions
                           }: ResultCardProps) => {
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className={styles.card}>
            <img
                src={imageUrl}
                alt={title}
                className={styles.image}
                draggable={false}
            />

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.badge}>{gridSize}×{gridSize}</div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Час</span>
                        <span className={styles.statValue}>{formatTime(time)}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Ходи</span>
                        <span className={styles.statValue}>{moves}</span>
                    </div>
                </div>

                {actions && <div className={styles.actions}>{actions}</div>}
            </div>
        </div>
    );
};