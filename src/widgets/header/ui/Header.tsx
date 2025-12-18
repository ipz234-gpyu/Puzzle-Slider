import type {ReactNode} from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.css";

interface HeaderProps {
    title?: string;
    description?: string;
    showBackButton?: boolean;
    backPath?: string;
    extra?: ReactNode;
}

export const Header = ({
    title = "Puzzle Slider",
    description,
    showBackButton = false,
    backPath = "/",
    extra
}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.topRow}>
                {showBackButton && (
                    <Link to={backPath} className={styles.backLink}>
                        <span className={styles.backIcon}>←</span>
                        <span className={styles.backText}>Back</span>
                    </Link>
                )}
                
                <h1 className={styles.title}>{title}</h1>
                
                {extra && <div className={styles.extra}>{extra}</div>}
            </div>
            
            {description && (
                <p className={styles.description}>{description}</p>
            )}
        </header>
    );
};
