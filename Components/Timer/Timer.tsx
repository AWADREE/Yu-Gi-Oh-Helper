import React, { FC, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import moment from "moment";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { colors } from "../../config/colors";
import { TimerType } from "../HalfScreen/HalfScreenType";
import { Props } from "./TimerType";

const Timer: FC<Props> = ({
  thisTimer,
  timerIsPlaying,
  timerDuration,
  setTimerRemainingTIme,
  startTimer,
  setTurn,
  restartBothTimers,
  randomNumber,
  setRandomNumber,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(
    thisTimer === TimerType.Timer1 ? true : false
  );
  const [newMatchMenuVisible, setNewMatchMenuVisible] = useState(false);
  const [coinFlipResult, setCoinFlipResult] = useState("");
  const [diceRollResult, setDiceRollResult] = useState("");

  const startNewMatchWithPlayer = (player: TimerType) => {
    setNewMatchMenuVisible(false);
    setCoinFlipResult("");
    setDiceRollResult("");
    restartBothTimers();
    setRandomNumber(); //to make the timer start from the full duration
    startTimer(player);
    setTurn(player);
    setModalVisible(false);

    //fix left the states to parent
    //coin,
    //dice
  };

  return (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        backgroundColor: colors.backgroundSemiFadedBlack,
        borderRadius: 100,
        // padding: 2,
      }}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <CountdownCircleTimer
        size={85}
        isPlaying={
          (thisTimer === TimerType.Timer1 &&
            timerIsPlaying === TimerType.Timer1) ||
          (thisTimer === TimerType.Timer2 &&
            timerIsPlaying === TimerType.Timer2)
            ? true
            : false
        }
        duration={timerDuration}
        colors={[
          "#088bf7",
          "#02b4d3",
          "#02b398",
          "#01d585",
          "#00d640",
          "#6ad600",
          "#ced000",
          "#e79400",
          "#da4200",
          "#ea0400",
        ]}
        colorsTime={[480, 427, 374, 321, 268, 215, 162, 109, 56, 0]}
        trailColor={colors.backgroundVeryFadedWhite}
        isSmoothColorTransition={true}
        updateInterval={1}
        onUpdate={(remainingTime) => {
          setTimerRemainingTIme(remainingTime);
        }}
        key={timerDuration + thisTimer + randomNumber}
        strokeWidth={7}
      >
        {({ remainingTime, color }) => (
          <Text style={{ fontSize: 23, fontWeight: "500", color: color }}>
            {moment.utc(remainingTime * 1000).format("mm:ss")}
          </Text>
        )}
      </CountdownCircleTimer>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.backgroundVeryFadedBlack,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <View
              style={{
                width: windowHeight * 0.7,
                height: windowWidth * 0.9,
                backgroundColor: "white",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", top: "8%", left: "8%" }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Image
                  source={require("../../assets/images/back.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.primeryColor,
                  borderRadius: 20,
                  padding: 10,
                  width: "60%",
                  height: 100,
                }}
                onPress={() => {
                  // restartBothTimers();
                  // setRandomNumber(Math.floor(Math.random() * 10)); //to make the timer start from the full duration
                  // startTimer(TimerType.Timer1);
                  // setTurn(TimerType.Timer1);
                  // setModalVisible(false);
                  setNewMatchMenuVisible(true);
                }}
                disabled={newMatchMenuVisible}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "500",
                    color: colors.secondaryColor,
                  }}
                >
                  {timerIsPlaying === TimerType.None
                    ? "Start Match"
                    : "Restart Match"}
                </Text>
              </TouchableOpacity>

              {newMatchMenuVisible ? (
                <View
                  style={{
                    width: "100%",
                    height: "65%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      transform: [{ rotate: "90deg" }],
                      height: "65%",
                      width: "50%",
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 10,
                        width: 200,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        startNewMatchWithPlayer(TimerType.Timer2);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "500",
                          color: colors.secondaryColor,
                        }}
                      >
                        Go First
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 10,
                        width: 200,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        startNewMatchWithPlayer(TimerType.Timer1);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "500",
                          color: colors.secondaryColor,
                        }}
                      >
                        Go Second
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
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

                  <View
                    style={{
                      transform: [{ rotate: "-90deg" }],
                      height: "65%",
                      alignItems: "center",
                      width: "50%",
                      padding: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 10,
                        width: 200,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        startNewMatchWithPlayer(TimerType.Timer1);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "500",
                          color: colors.secondaryColor,
                        }}
                      >
                        Go First
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 10,
                        width: 200,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        startNewMatchWithPlayer(TimerType.Timer2);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "500",
                          color: colors.secondaryColor,
                        }}
                      >
                        Go Second
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}
              {/* TODO put both coin flip and roll dice buttons here */}
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default Timer;

const styles = StyleSheet.create({
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
});
