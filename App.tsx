import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import { colors } from "./config/colors";

export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.backgroundColor },
});
