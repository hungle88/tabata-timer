import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  Dimensions,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  ProgressViewIOSComponent
} from "react-native";
import Constants from "expo-constants";

export default function ShowRecord(props) {

  return (
    <View style={styles.container}>
     <Text>{props.year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: Constants.statusBarHeight,
    backgroundColor: "green",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  input: {
    margin: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    borderWidth: 2,
    width: 50,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  button: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 60,
    height: 40,
  },
  container_red: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "red",
    padding: 8,
  },
});
