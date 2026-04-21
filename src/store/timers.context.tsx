import { createContext, ReactNode, useContext, useReducer } from "react";
import { TimersAction, TimersContextValue, TimersState } from "../models";

const TimersContext = createContext<TimersContextValue | null>(null);

function timersReducer(state: TimersState, action: TimersAction): TimersState {
  if (action.type === "START_TIMERS") {
    return { ...state, isRunning: true };
  }

  if (action.type === "STOP_TIMERS") {
    return { ...state, isRunning: false };
  }

  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  return state;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

const initialState = {
  isRunning: true,
  timers: [],
};

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    isRunning: timersState.isRunning,
    timers: timersState.timers,

    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);

  if (!timersCtx) {
    throw new Error(
      "useTimersContext must be used within a TimersContextProvider",
    );
  }

  return timersCtx;
}
