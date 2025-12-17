import React from 'react';
import {TimerDisplay} from '@/shared/ui/timer';
import type {Timer} from "@/shared/ui/timer"
import styles from './styles.module.css';
import {Flex} from "@/shared/ui/flex";

interface GameStatsProps {
    moveCount: number;
    timer: Timer;
}

export const GameStats: React.FC<GameStatsProps> = ({moveCount, timer}) => {
    return (
        <Flex justify="around" align="center">
            <div className={styles.statItem}>
                <span>Move count:</span>
                <span className={styles.value}>{moveCount}</span>
            </div>
            <div className={styles.statItem}>
                <TimerDisplay timer={timer}/>
            </div>
        </Flex>
    );
};