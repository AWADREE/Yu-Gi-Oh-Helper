import React, { FC, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../config/colors";
import LifePointsBar from "../LifePointsBar/LifePointsBar";
import Timer from "../Timer/Timer";
import { Props, TimerType } from "./HalfScreenType";

const HalfScreen: FC<Props> = ({
  timerIsPlaying,
  moveCheck,
  thisTimer,
  turn,
  turnChange,
  setTimerRemainingTIme,
  timerDuration,
  lifePoints,
  setPlayerLifePoints,
  startTimer,
  setTurn,
  restartBothTimers,
  randomNumber,
  setRandomNumber,
}) => {
  const imagesArray = [
    require("../../assets/images/1.png"),
    require("../../assets/images/2.png"),

    require("../../assets/images/3.png"),

    require("../../assets/images/4.png"),

    require("../../assets/images/5.png"),
    require("../../assets/images/6.png"),
  ];

  const randomIntFromInterval = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [backgroundImage, setBackgroundImage] = useState(
    imagesArray[randomIntFromInterval(0, 5)]
  );

  const [coinFlipResult, setCoinFlipResult] = useState("");
  const [diceRollResult, setDiceRollResult] = useState("");
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      imageStyle={{ width: "100%", height: "100%" }}
      style={[
        styles.container,
        thisTimer === TimerType.Timer2
          ? { transform: [{ rotate: "180deg" }] }
          : {},
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.upperButtonsContainer}>
          <View style={styles.lpAndTimerContainer}>
            <LifePointsBar
              lifePoints={lifePoints}
              setPlayerLifePoints={setPlayerLifePoints}
            />

            <Timer
              thisTimer={thisTimer}
              timerDuration={timerDuration}
              timerIsPlaying={timerIsPlaying}
              setTimerRemainingTIme={setTimerRemainingTIme}
              startTimer={startTimer}
              setTurn={setTurn}
              restartBothTimers={restartBothTimers}
              randomNumber={randomNumber}
              setRandomNumber={setRandomNumber}
            />
          </View>

          <View style={styles.midButtonContainer}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.flipCoinButtonStyle}
                onPress={() => {
                  //flip coin
                  const coinResult = Math.floor(
                    Math.random() * (2 - 1 + 1) + 1
                  );
                  setCoinFlipResult(coinResult === 1 ? "Heads" : "Tails");
                }}
              >
                <Text style={styles.flipCoinTextTextStyle}>
                  {coinFlipResult === "" ? "Flip Coin" : coinFlipResult}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rollDiceButtonStyle}
                onPress={() => {
                  //Roll Dice
                  const diceReslut = Math.floor(
                    Math.random() * (6 - 1 + 1) + 1
                  );
                  setDiceRollResult(diceReslut.toString());
                }}
              >
                <Text style={styles.rollDiceTextTextStyle}>
                  {diceRollResult === "" ? "Roll Dice" : diceRollResult}
                </Text>
              </TouchableOpacity>
            </View>

            {(thisTimer === TimerType.Timer2 && turn === TimerType.Timer2) ||
            (thisTimer === TimerType.Timer1 && turn === TimerType.Timer1) ? (
              <TouchableOpacity
                style={styles.endButtonStyle}
                onPress={() => {
                  turnChange();
                }}
              >
                <Text style={styles.endButtonTextStyle}>EP</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </View>

        {(thisTimer === TimerType.Timer1 &&
          timerIsPlaying === TimerType.Timer1) ||
        (thisTimer === TimerType.Timer2 &&
          timerIsPlaying === TimerType.Timer2) ? (
          <TouchableOpacity
            style={styles.checkButtonStyle}
            onPress={() => moveCheck()}
          >
            <Text style={styles.checkButtonTextStyle}>Check</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
};

export default HalfScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  upperButtonsContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lpAndTimerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  midButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  endButtonStyle: {
    backgroundColor: colors.primeryColor,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
  },
  flipCoinButtonStyle: {
    backgroundColor: colors.primeryColor,
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    margin: 5,
  },
  rollDiceButtonStyle: {
    backgroundColor: colors.primeryColor,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    margin: 5,
  },
  endButtonTextStyle: {
    color: colors.secondaryColor,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  flipCoinTextTextStyle: {
    color: colors.secondaryColor,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  rollDiceTextTextStyle: {
    color: colors.secondaryColor,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
  },

  checkButtonStyle: {
    width: "90%",
    height: "40%",
    borderRadius: 50,
    backgroundColor: "red",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  checkButtonTextStyle: { fontSize: 50, fontWeight: "500", color: "white" },
});
