import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { QUESTIONS } from "../data/dummy-data";

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxtUpper}>Resertifisering</Text>
        <Text style={styles.headerTxt}> For Vektere</Text>
      </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Button pressed")}
        >
          <Text style={styles.btnText}>Min Opplæring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Button pressed")}
        >
          <Text style={styles.btnText}>Finn opplæring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => getExamQuestion(props)}
        >
          <Text style={styles.btnText}>Prøveeksamen resertifisering</Text>
        </TouchableOpacity>
    </View>
  );
};

// DENNE MÅ SES PÅ. IKKE EFFEKTIV NÅR DET ER EN POOL PÅ 800 SPØRSMÅL
const getExamQuestion = props => {
  let questionArray = QUESTIONS.slice();

  // Gets 80 random question from the database NOT FIXED------------------
  // RANDOMIZE THE ARRAY
  let currentIndex = questionArray.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = questionArray[currentIndex];
    questionArray[currentIndex] = questionArray[randomIndex];
    questionArray[randomIndex] = temporaryValue;
  }
  questionArray.splice(5, 95); // Only send 10 random questions to examScreen
  props.navigation.navigate("Practice", { examQuestions: questionArray });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff4f7",
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 150
  },
  headerTxtUpper: {
    color: "#59566B",
    fontSize: 50,
    fontWeight: "bold"
  },
  headerTxt: {
    color: "#59566B",
    fontSize: 30,
    fontWeight: "normal"
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    backgroundColor: "#6694B7",
    width: "80%",
    padding: 10,
    margin: 10,
    borderRadius: 25
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default HomeScreen;
