import React, { FC, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { Props } from "./LifePointsBarType";
import { colors } from "../../config/colors";
import MyKeyboard from "../Keyboard/Keyboard";
const LifePointsBar: FC<Props> = ({ lifePoints, setPlayerLifePoints }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: colors.backgroundFadedWhite,
        width: "75%",
        height: 45,
        marginBottom: 10,
        borderRadius: 5,
      }}
    >
      <Animated.View
        style={{
          width: `${(lifePoints / 8000) * 100}%`,
          //   width: "100%",
          maxWidth: "100%",
          backgroundColor: "red",
          height: "100%",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <View
        style={{
          position: "absolute",
          top: "16%",
          left: "37.8%",
          backgroundColor: colors.backgroundFadedBlack,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "800",
            letterSpacing: 3,
          }}
        >
          {lifePoints}
        </Text>
      </View>

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
                width: windowHeight,
                height: windowWidth,
                backgroundColor: "white",
                // borderRadius: 20,
                alignItems: "center",
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
              <MyKeyboard
                oldLifePoints={lifePoints}
                setPlayerLifePoints={setPlayerLifePoints}
                setModalVisible={setModalVisible}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

export default LifePointsBar;
