import type {ReactNode} from "react";
import type {LevelConfig} from "../model/levelData";
import styles from "./styles.module.css";

interface LevelCardProps {
    level: LevelConfig;
    actions?: ReactNode;
}

export const LevelCard = ({level, actions}: LevelCardProps) => {
    return (
        <div className={styles.card}>
                <img
                    src={level.imageUrl}
                    alt={level.title}
                    className={styles.image}
                    draggable={false}
                />

            <div className={styles.content}>
                {actions}
            </div>
        </div>
    );
};