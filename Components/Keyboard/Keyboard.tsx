import React, { FC, useEffect } from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "./KeyboardStyles";
import { myColors } from "./KeyboardColors";
import { Props } from "./KeyboardType";

const Keyboard: FC<Props> = ({
  oldLifePoints,
  setPlayerLifePoints,
  setModalVisible,
}) => {
  const [firstNumber, setFirstNumber] = React.useState(
    oldLifePoints.toString()
  );
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [
                  Styles.screenFirstNumber,
                  { fontSize: 60, color: myColors.result },
                ]
          }
        >
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 60 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        const num1 = Math.ceil(parseInt(secondNumber) + parseInt(firstNumber));
        setResult(num1 < 0 ? 0 : num1);
        setPlayerLifePoints(num1 < 0 ? 0 : num1);
        break;
      case "-":
        clear();
        const num2 = Math.ceil(parseInt(secondNumber) - parseInt(firstNumber));
        setResult(num2 < 0 ? 0 : num2);
        setPlayerLifePoints(num2 < 0 ? 0 : num2);
        break;
      case "*":
        clear();
        const num3 = Math.ceil(parseInt(secondNumber) * parseInt(firstNumber));
        setResult(num3 < 0 ? 0 : num3);
        setPlayerLifePoints(num3 < 0 ? 0 : num3);
        break;
      case "/":
        clear();
        const num4 = Math.ceil(parseInt(secondNumber) / parseInt(firstNumber));
        setResult(num4 < 0 ? 0 : num4);
        setPlayerLifePoints(num4 < 0 ? 0 : num4);
        break;
      default:
        clear();
        setResult(oldLifePoints);
        break;
    }
    setModalVisible(false);
  };
  useEffect(() => {
    console.log(operation);
  }, [operation]);

  //if operation is empty then diplay firs number otherwise dont display it
  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 100,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={Styles.screenSecondNumber}>{secondNumber}</Text>
          <Text style={{ color: "purple", fontSize: 60, fontWeight: "500" }}>
            {operation}
          </Text>
          {firstNumberDisplay()}
        </View>
      </View>
      <View>
        <View style={Styles.row}>
          <Button
            title="7"
            onPress={operation === "" ? () => {} : () => handleNumberPress("7")}
          />
          <Button
            title="8"
            onPress={operation === "" ? () => {} : () => handleNumberPress("8")}
          />
          <Button
            title="9"
            onPress={operation === "" ? () => {} : () => handleNumberPress("9")}
          />
          <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
          <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
          {/* <Button title="C" isGray onPress={clear} /> */}
          {/* <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        /> */}
          {/* <Button title="％" isGray onPress={() => handleOperationPress("％")} /> */}
        </View>
        <View style={Styles.row}>
          <Button
            title="4"
            onPress={operation === "" ? () => {} : () => handleNumberPress("4")}
          />
          <Button
            title="5"
            onPress={operation === "" ? () => {} : () => handleNumberPress("5")}
          />
          <Button
            title="6"
            onPress={operation === "" ? () => {} : () => handleNumberPress("6")}
          />
          <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
          <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
        </View>
        <View style={Styles.row}>
          <Button
            title="1"
            onPress={operation === "" ? () => {} : () => handleNumberPress("1")}
          />
          <Button
            title="2"
            onPress={operation === "" ? () => {} : () => handleNumberPress("2")}
          />
          <Button
            title="3"
            onPress={operation === "" ? () => {} : () => handleNumberPress("3")}
          />
        </View>
        <View style={Styles.row}>
          {/* <Button title="." onPress={() => handleNumberPress(".")} /> */}
          {/* <Button title="" onPress={() => {}} /> */}
          <View style={Styles.btnInvisable} />
          <Button
            title="0"
            onPress={
              operation === ""
                ? () => {}
                : operation === "/"
                ? () => handleNumberPress("1")
                : () => handleNumberPress("0")
            }
          />
          <Button
            title="⌫"
            onPress={
              operation === ""
                ? () => {}
                : () => setFirstNumber(firstNumber.slice(0, -1))
            }
          />
          <View style={Styles.btnInvisable} />
          <Button title="=" isBlue onPress={() => getResult()} />
        </View>
      </View>
    </View>
  );
};

export default Keyboard;
