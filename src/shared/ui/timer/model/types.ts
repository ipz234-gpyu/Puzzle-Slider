export interface TimerState {
    time: number;
    isRunning: boolean;
    isPaused: boolean;
}

export interface Timer {
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isRunning: boolean;
    isPaused: boolean;
}