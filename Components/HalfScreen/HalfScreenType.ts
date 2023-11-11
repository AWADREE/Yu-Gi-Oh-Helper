export enum TimerType {
  Timer1 = "Timer1",
  Timer2 = "Timer2",
  None = "None",
}
export type Props = {
  timerIsPlaying: TimerType;
  moveCheck: () => void;
  thisTimer: TimerType;
  turn: TimerType;
  turnChange: () => void;
  setTimerRemainingTIme: (remainingTimer: number) => void;
  timerDuration: number;
  lifePoints: number;
  setPlayerLifePoints: (newLifePoints: number) => void;
  startTimer: (player: TimerType) => void;
  setTurn: (player: TimerType) => void;
  restartBothTimers: () => void;
  randomNumber: number;
  setRandomNumber: () => void;
};
