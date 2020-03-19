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
      color: "red",
      fontSize: 30,
      fontWeight: "bold"
    }
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
                <Text>{itemData.item.sel}</Text>
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

const answeredResult = question => {
  let corAnwserPosition = null;
  for (let i = 0; i < question.answers.length; i++) {
    if (question.correctAnswer === question.answers[i]) {
      corAnwserPosition = i;
    }
  }
  return (
    <Text></Text>
  )
}

const answersFeedback = question => {
  let corAnwserPosition = null;
  for (let i = 0; i < question.answers.length; i++) {
    if (question.correctAnswer === question.answers[i]) {
      corAnwserPosition = i;
    }
  }

  return question.answers.map((item, key) => (
    <View style={styles.answer}>
      <Text style={{ fontSize: 15, marginRight: 3 }}>{"\u2B24"}</Text>
      <Text
        style={
          corAnwserPosition === key
            ? { color: "green", fontSize: 15 }
            : question.selectedAnswer === key
            ? { color: "red", fontSize: 15 }
            : { color: "black", fontSize: 15 }
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
    alignItems: "center"
  },
  questionContainer: {
    height: "92%",
    // flex: 10,
    backgroundColor: "white",
    paddingTop: 10
    // width: "100%",
    // alignItems: "center"
  },
  questionBox: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 0.5
  },
  separator: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginTop: 3,
    marginBottom: 3
  },
  questionHeader: { flexDirection: "row", justifyContent: "space-between" },
  questionHeaderTxt: { fontSize: 20, fontWeight: "bold" },
  question: {},
  questionTxt: { color: "black" },
  answersContainer: { marginLeft: 10, marginTop: 10 },
  answer: { paddingTop: 0, flexDirection: "row" },
  answersTxt: {},
  answerCorrect: {},
  answerWrong: {},
  buttonContainer: {
    // flex: 1,
    height: "8%",
    width: "50%",
    justifyContent: "center"
  }
});

export default examFinishedScreen;
