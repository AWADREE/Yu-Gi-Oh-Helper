import { TimerType } from "../HalfScreen/HalfScreenType";

export type Props = {
  thisTimer: TimerType;
  timerIsPlaying: TimerType;
  timerDuration: number;
  setTimerRemainingTIme: (remainingTime: number) => void;
  startTimer: (player: TimerType) => void;
  setTurn: (player: TimerType) => void;
  restartBothTimers: () => void;
  randomNumber: number;
  setRandomNumber: () => void;
};
