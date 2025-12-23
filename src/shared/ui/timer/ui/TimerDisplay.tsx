import React from 'react';
import styles from './styles.module.css';
import type {Timer} from '../index.ts';

interface TimerDisplayProps {
    timer: Timer;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({timer}) => {
    const formatTime = (value: number): string => {
        return value.toString().padStart(2, '0');
    };

    const timeClassName = `${styles.time} ${timer.isPaused ? styles.paused : ''}`;

    return (
        <div className={styles.timer}>
            <span className={timeClassName}>
                Time: {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
            </span>
        </div>
    );
};
