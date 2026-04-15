import { createContext, ReactNode, useContext } from "react";
import Timer from "../components/Timer";

type Timer = {
    name: string
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimersContextValue = TimersState & {
    addTimer: (timer: Timer) => void,
    startTimer: () => void,
    stopTimer: () => void,
}

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timersCtx = useContext(TimersContext);

    if(!timersCtx) {
        throw new Error('useTimersContext must be used within a TimersContextProvider');
    }

    return timersCtx;
}

type TimersContextProviderProps = {
    children: ReactNode
}

const ctx: TimersContextValue = {
    isRunning: false,
    timers: [],
    addTimer(timerData) {
        // ...
    },
    startTimer() {
        // ...
    },
    stopTimer() {
        // ...
    }
}

export default function TimersContextProvider({children}: TimersContextProviderProps) {
    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}