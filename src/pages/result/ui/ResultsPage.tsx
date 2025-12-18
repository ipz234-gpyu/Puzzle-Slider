import {useLocation, useNavigate} from "react-router-dom";
import {Header} from "@/widgets/header";
import {Button} from "@/shared/ui/button";
import styles from "./styles.module.css";

interface LocationState {
    moves: number;
    time: number;
    levelName: string;
    gridSize: number;
}

export const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    if (!state) {
        return (
            <div className="page">
                <Header title="No Results" showBackButton />
                <div className={styles.container}>
                    <p>Нічого показувати. Спробуйте спочатку зіграти!</p>
                    <Button onClick={() => navigate("/")} style={{marginTop: "1rem"}}>
                        До головного меню
                    </Button>
                </div>
            </div>
        );
    }

    const {moves, time, levelName, gridSize} = state;

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="page">
            <Header title="Вітаємо з перемогою!" />
            
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.levelInfo}>
                        <strong>{levelName}</strong>
                        <div className={styles.badge}>{gridSize}x{gridSize}</div>
                    </div>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Час</span>
                            <span className={styles.statValue}>{formatTime(time)}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Ходи</span>
                            <span className={styles.statValue}>{moves}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            onClick={() => navigate(-1)}
                        >
                            Спробувати знову
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={() => navigate("/")}
                        >
                            До меню вибору рівнів
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};