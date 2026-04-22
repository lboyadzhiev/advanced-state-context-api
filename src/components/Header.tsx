import Button from "./UI/Button.tsx";
import { useTimersContext } from "../store/timers.context.tsx";

export default function Header() {
  const timersCtx = useTimersContext();

  const { isRunning } = timersCtx;

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timersCtx.isRunning ? timersCtx.stopTimer : timersCtx.startTimer
        }
      >
        {isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
