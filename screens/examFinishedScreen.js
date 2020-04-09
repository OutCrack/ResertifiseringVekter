import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const examFinishedScreen = props => {
  const { examQuestions } = props.route.params;
  const { correctAnswers } = props.route.params;

  props.navigation.setOptions({
    title:
      examQuestions.length -
      correctAnswers +
      " Feil : " +
      correctAnswers +
      "/" +
      examQuestions.length +
      " Riktige",
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: "#eff4f7",
      fontSize: 30,
      fontWeight: "bold"
    },
    headerStyle: { backgroundColor: "#476780" },
  });

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <FlatList
          data={examQuestions}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <View style={styles.questionBox}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionHeaderTxt}>
                  Spørsmål {itemData.index + 1} : Kapittel{" "}
                  {itemData.item.chapter}
                </Text>
              </View>
              <View style={styles.separator}></View>
              <View style={styles.question}>
                <Text style={styles.questionTxt}>{itemData.item.question}</Text>
              </View>
              <View style={styles.answersContainer}>
                {answersFeedback(itemData.item)}
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => resetQuestions(props, examQuestions)}
          title="Lukk"
        />
      </View>
    </View>
  );
};

const answersFeedback = question => {
  let corAnwserPosition = null;
  for (let i = 0; i < question.answers.length; i++) {
    if (question.correctAnswer === question.answers[i]) {
      corAnwserPosition = i;
    }
  }

  return question.answers.map((item, key) => (
    <View style={styles.answer}>
      <Text style={{ fontSize: 15, marginRight: 5 }}>{"\u2B24"}</Text>
      <Text
        style={
          corAnwserPosition === key
            ? styles.answerCorrect
            : question.selectedAnswer === key
            ? styles.answerWrong
            : styles.answersTxt
        }
      >
        {item}
      </Text>
    </View>
  ));
};

const resetQuestions = (props, questions) => {
  questions.forEach(element => {
    element.selectedAnswer = -1;
  });
 props.navigation.navigate("Home");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#759ebe"
  },
  questionContainer: {
    height: "92%",
    backgroundColor: "white",
    paddingTop: 10,
    backgroundColor: "#759ebe"
  },
  questionBox: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: "#a9a9a9",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#e0e9f0"
  },
  separator: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginTop: 3,
    marginBottom: 3
  },
  questionHeader: { flexDirection: "row", justifyContent: "space-between" },
  questionHeaderTxt: { fontSize: 25, fontWeight: "bold", color: "#1e2c36" },
  question: {},
  questionTxt: { fontSize: 20, color: "#1e2c36" },
  answersContainer: { marginLeft: 10, marginTop: 10 },
  answer: { marginBottom: 5, flexDirection: "row", alignItems: "center" },
  answersTxt: { color: "#1e2c36", fontSize: 20 },
  answerCorrect: { color: "green", fontSize: 20 },
  answerWrong: { color: "red", fontSize: 20 },
  buttonContainer: {
    height: "8%",
    width: "50%",
    justifyContent: "center"
  }
});

export default examFinishedScreen;
