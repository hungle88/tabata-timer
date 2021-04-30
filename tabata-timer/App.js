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
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import ShowRecord from "./record";

export default function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "START":
        return { ...state, status: "on" };
      case "STOP":
        return {
          ...state,
          status: "off",
          time: "READY!",
          currSet: 1,
          currTask: "",
        };
      case "DEC":
        return { ...state, time: state.time - 1 };
      case "SET_INC":
        return { ...state, currSet: state.currSet + 1 };
      case "RESET_TIME":
        return { ...state, time: state.workTime };
      case "RESET_SET":
        return { ...state, currSet: 1 };

      case "WORK_LABEL":
        return { ...state, currTask: "Work" };
      case "REST_LABEL":
        return { ...state, currTask: "Rest" };
      case "REST_TIME":
        return { ...state, time: state.restTime };
      case "WORK_TIME":
        return { ...state, time: state.workTime };
      case "INPUT_CHANGE":
        return { ...state, [action.name]: action.value };
      case "SAVE_RECORD":
        return { ...state, record: [...state.record, action.value] };
      case "SHOW_RECORD":
        return { ...state, viewRecord: true };
      case "HIDE_RECORD":
        return { ...state, viewRecord: false };
      default:
        return state;
    }
  };

  const [
    {
      time,
      status,
      currSet,
      currTask,
      maxSet,
      restTime,
      workTime,
      record,
      viewRecord,
    },
    dispatch,
  ] = React.useReducer(reducer, {
    time: "READY!",
    status: "off",
    currSet: 1,
    currTask: "",
    maxSet: 5,
    restTime: 10,
    workTime: 20,
    record: [],
    viewRecord: false,
  });
  let today = new Date();

  const start = () => {
    dispatch({ type: "START" });
    dispatch({ type: "WORK_LABEL" });
    dispatch({ type: "WORK_TIME" });
    console.log(record);
  };

  const stop = () => {
    dispatch({ type: "STOP" });
    saveRecord();
  };

  const onInputChange = (name, value) =>
    dispatch({ type: "INPUT_CHANGE", name: name, value: value });

  const saveRecord = (value) => {
    dispatch({
      type: "SAVE_RECORD",
      value: {
        id: record.length,
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        hour: today.getHours(),
        minute: (today.getMinutes()<10?'0':'') + today.getMinutes(),
      },
    });
  };

  const showRecord = () => {
    if (!viewRecord) {
      dispatch({ type: "SHOW_RECORD" });
    } else {
      dispatch({ type: "HIDE_RECORD" });
    }
    console.log(viewRecord);
  };
  let counting;
  React.useEffect(() => {
    if (status === "on") {
      counting = setInterval(() => {
        dispatch({ type: "DEC" });
      }, 1000);
    }
    return () => clearInterval(counting);
  }, [status]);

  let background = styles.container;
  if (currTask === "Rest") {
    background = styles.container_red;
  }
  if (time === 0) {
    if (currTask == "Work") {
      dispatch({ type: "REST_LABEL" });
      dispatch({ type: "REST_TIME" });
    } else if (currTask === "Rest") {
      dispatch({ type: "WORK_LABEL" });
      dispatch({ type: "WORK_TIME" });
      dispatch({ type: "SET_INC" });
    }
  }
  if (currSet === parseInt(maxSet) + 1) {
    dispatch({ type: "STOP" });
    saveRecord();
    Alert.alert("Time's up!");
  }

  return (
    <View style={background}>


<KeyboardAvoidingView style={{flex:1, alignItems:'center'}} behavior ='position'>


      {!viewRecord && (
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./assets/tabata-logo.png")}
            style={{ height: 100, width: 100 }}
          />
          <Text style={styles.paragraph}>Set: {currSet}</Text>
          <Text style={styles.paragraph}>{currTask}</Text>
          <Text style={styles.paragraph}>{time}</Text>
          <View style={styles.row}>
            <View style={{ alignItems: "center" }}>
              <Text>Sets</Text>

              <TextInput
                type="number"
                name="maxSet"
                style={styles.input}
                onChangeText={(e) => {
                  onInputChange("maxSet", e);
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Workout</Text>
              <TextInput
                name="workTime"
                style={styles.input}
                onChangeText={(e) => {
                  onInputChange("workTime", e);
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Rest</Text>
              <TextInput
                type="number"
                name="restTime"
                style={styles.input}
                onChangeText={(e) => {
                  onInputChange("restTime", e);
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.button}>
              <Button
                style={styles.button}
                onPress={start}
                title="start"
                color="blue"
              ></Button>
            </View>
            <View style={styles.button}>
              <Button onPress={stop} title="stop" color="red"></Button>
            </View>
          </View>

          <View style={{ width: 100, backgroundColor: "white" }}>
            <Button
              style={styles.button}
              onPress={showRecord}
              title="Previous Workout"
              color="grey"
            ></Button>
          </View>
        </View>
      )}

      {viewRecord && (
        <SafeAreaView style={styles.container}>
          <View style={{ width: 100, backgroundColor: "white" }}>
            <Button
              style={styles.button}
              onPress={showRecord}
              title="GO BACK"
              color="grey"
            ></Button>
          </View>
          <View style={{ alignItems: "center" }}>
            <FlatList
              data={record}
              renderItem={({ item }) => (
                <Text style={{ color: "white" }}>
                  {item.month}/{item.date}/{item.year}-{item.hour}:{item.minute}
                </Text>
              )}
              keyExtractor={(item) => item.id.toString()}
              extraData={record}
            />
          </View>
        </SafeAreaView>
      )}


</KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 50,
    backgroundColor: "green",
    padding: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  input: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    borderWidth: 1,
    width: 50,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flex: -1,
    margin: 10,
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

    paddingTop: 50,
    backgroundColor: "red",
    padding: 50,
  },
});
