import { StyleSheet } from "react-native";
import { myColors } from "./KeyboardColors";

export const Styles = StyleSheet.create({
  // Button
  btnBlue: {
    width: 62,
    height: 62,
    borderRadius: 24,
    backgroundColor: myColors.blue,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnDark: {
    width: 62,
    height: 62,
    borderRadius: 24,
    backgroundColor: myColors.btnDark,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnLight: {
    width: 62,
    height: 62,
    borderRadius: 24,
    backgroundColor: myColors.white,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnInvisable: {
    width: 62,
    height: 62,
    borderRadius: 24,
    // backgroundColor: myColors.btnGray,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnGray: {
    width: 62,
    height: 62,
    borderRadius: 24,
    backgroundColor: myColors.btnGray,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  smallTextLight: {
    fontSize: 32,
    color: myColors.white,
  },
  smallTextDark: {
    fontSize: 32,
    color: myColors.black,
  },
  // Keyboard
  row: {
    maxWidth: "100%",
    flexDirection: "row",
  },
  viewBottom: {
    position: "absolute",
    bottom: 0,
  },
  screenFirstNumber: {
    fontSize: 60,
    color: myColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
  screenSecondNumber: {
    fontSize: 60,
    color: myColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
});
