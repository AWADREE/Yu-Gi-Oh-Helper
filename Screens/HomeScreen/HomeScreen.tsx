import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import HalfScreen from "../../Components/HalfScreen/HalfScreen";
import { TimerType } from "../../Components/HalfScreen/HalfScreenType";
import { colors } from "../../config/colors";

const HomeScreen = () => {
  const [timerPlaying, setTimerPlaying] = useState<TimerType>(TimerType.None);
  const [turn, setTurn] = useState<TimerType>(TimerType.Timer1);

  const [timer1RemainingTIme, setTimer1RemainingTIme] = useState<number>(480);
  const [timer2RemainingTIme, setTimer2RemainingTIme] = useState<number>(480);

  const [timer1Duration, setTimer1Duration] = useState<number>(480);
  const [timer2Duration, setTimer2Duration] = useState<number>(480);

  const [player1LifePoints, setPlayer1LifePoints] = useState<number>(8000);
  const [player2LifePoints, setPlayer2LifePoints] = useState<number>(8000);

  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);

  const setRandomNumber = () => {
    setRandomNumber1(Math.floor(Math.random() * 10));
    setRandomNumber2(Math.floor(Math.random() * 10));
  };

  const moveCheck = () => {
    if (timerPlaying === TimerType.Timer1) {
      setTimerPlaying(TimerType.Timer2);
    } else {
      setTimerPlaying(TimerType.Timer1);
    }
  };

  const pauseBothTimers = () => {
    setTimerPlaying(TimerType.None);
  };

  const startTimer = (player: TimerType) => {
    setTimerPlaying(player);
  };

  const restartBothTimers = () => {
    pauseBothTimers();
    setTimer1Duration(480);
    setTimer2Duration(480);
  };

  const turnChange = () => {
    if (turn === TimerType.Timer1) {
      pauseBothTimers();
      setTurn(TimerType.Timer2);
      setTimer1Duration(timer1RemainingTIme + 30);
      setTimer2Duration(timer2RemainingTIme + 30);
      setTimerPlaying(TimerType.Timer2);
    } else {
      pauseBothTimers();
      setTurn(TimerType.Timer1);
      setTimer1Duration(timer1RemainingTIme + 30);
      setTimer2Duration(timer2RemainingTIme + 30);
      setTimerPlaying(TimerType.Timer1);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <LinearGradient
        // Background Linear Gradient
        colors={[
          colors.backgroundFadedWhite,
          colors.backgroundFadedWhite,
          colors.backgroundVeryFadedWhite,
          colors.transparent,
        ]}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 60,
          zIndex: 10,
        }}
      />
      <HalfScreen
        timerIsPlaying={timerPlaying}
        moveCheck={moveCheck}
        thisTimer={TimerType.Timer2}
        turn={turn}
        turnChange={turnChange}
        setTimerRemainingTIme={setTimer2RemainingTIme}
        timerDuration={timer2Duration}
        lifePoints={player2LifePoints}
        setPlayerLifePoints={setPlayer2LifePoints}
        startTimer={startTimer}
        setTurn={setTurn}
        restartBothTimers={restartBothTimers}
        randomNumber={randomNumber2}
        setRandomNumber={setRandomNumber}
      />
      <HalfScreen
        timerIsPlaying={timerPlaying}
        moveCheck={moveCheck}
        thisTimer={TimerType.Timer1}
        turn={turn}
        turnChange={turnChange}
        setTimerRemainingTIme={setTimer1RemainingTIme}
        timerDuration={timer1Duration}
        lifePoints={player1LifePoints}
        setPlayerLifePoints={setPlayer1LifePoints}
        startTimer={startTimer}
        setTurn={setTurn}
        restartBothTimers={restartBothTimers}
        randomNumber={randomNumber1}
        setRandomNumber={setRandomNumber}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
