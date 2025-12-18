import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import type { TimerState, Timer } from '@/shared/ui/timer';

export const useTimer = (initialTime: number = 0) => {
    const [state, setState] = useState<TimerState>({
        time: initialTime,
        isRunning: false,
        isPaused: false,
    });

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimerInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => clearTimerInterval();
    }, [clearTimerInterval]);

    const start = useCallback(() => {
        if (intervalRef.current) return;

        setState(prev => ({
            ...prev,
            isRunning: true,
            isPaused: false,
        }));

        intervalRef.current = setInterval(() => {
            setState(prev => ({
                ...prev,
                time: prev.time + 1,
            }));
        }, 1000);
    }, []);

    const pause = useCallback(() => {
        clearTimerInterval();
        setState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: true,
        }));
    }, [clearTimerInterval]);

    const stop = useCallback(() => {
        clearTimerInterval();
        setState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: true,
        }));
    }, [clearTimerInterval]);

    const reset = useCallback(() => {
        clearTimerInterval();
        setState({
            time: initialTime,
            isRunning: false,
            isPaused: false,
        });
    }, [initialTime, clearTimerInterval]);

    const timer: Timer = useMemo(() => ({
        hours: Math.floor(state.time / 3600),
        minutes: Math.floor((state.time % 3600) / 60),
        seconds: state.time % 60,
        totalSeconds: state.time,
        isRunning: state.isRunning,
        isPaused: state.isPaused,
    }), [state]);

    return {
        timer,
        start,
        pause,
        stop,
        reset,
    };
};