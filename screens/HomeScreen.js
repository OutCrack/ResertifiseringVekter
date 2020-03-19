import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { QUESTIONS } from "../data/dummy-data";

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resertifisering for Vektere</Text>
      <Button title="Prøve eksamen" onPress={() => getExamQuestion(props)} />
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
  while (0 !== (currentIndex)) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = questionArray[currentIndex];
    questionArray[currentIndex] = questionArray[randomIndex];
    questionArray[randomIndex] = temporaryValue;
  }
  questionArray.splice(10,70); // Only send 10 random questions to examScreen
  props.navigation.navigate("Practice", { examQuestions: questionArray });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  header: {
    color: "#59566B",
    fontSize: 36,
    fontWeight: "500"
  },
  menu: {}
});

export default HomeScreen;
