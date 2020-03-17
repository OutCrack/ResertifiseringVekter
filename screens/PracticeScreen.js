import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MultipleChoice from "react-native-multiple-choice-picker";

import { QUESTIONS } from "../data/dummy-data";

const getExamQuestion = () => {
  let questionArray = QUESTIONS;
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

  return questionArray;
};

const PracticeScreen = props => {
  let examQuestions = getExamQuestion();
  const [chapter, setChapter] = useState(examQuestions[0].chapter);
  const [question, setQuestion] = useState(examQuestions[0].question);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState(examQuestions[questionNumber].answers);
  const [chosen, setChosen] = useState(-1);
  const [backBtnDisable, setBackBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);

  useEffect(() => {
    if (questionNumber >= 1) {
      setBackBtnDisable(false);
    } else {
      setBackBtnDisable(true);
    }

    if (questionNumber === examQuestions.length - 1) {
      setNextBtnDisable(true);
    } else {
      setNextBtnDisable(false);
    }

    if (examQuestions[questionNumber].selectedAnswer === -1) {
      setChosen(-1);
    } else {
      setChosen(examQuestions[questionNumber].selectedAnswer);
    }

    setQuestion(examQuestions[questionNumber].question);
    setAnswers(examQuestions[questionNumber].answers);
    setChapter(examQuestions[questionNumber].chapter);
  }, [questionNumber]);

  let changeQuestion = val => {
    if (val === "Next") {
      if (chosen !== -1) {
        examQuestions[questionNumber].selectedAnswer = chosen;
      }
      setQuestionNumber(questionNumber + 1);
    } else if (val === "Back") {
      if (chosen !== -1) {
        examQuestions[questionNumber].selectedAnswer = chosen;
      }
      setQuestionNumber(questionNumber - 1);
    }
  };

  let handinExam = () => {
    let correct = 0;
    let corAnwserPosition = null;

    for (let i = 0; i < examQuestions.length; i++) {
      for (let y = 0; y < examQuestions[i].answers.length; y++) {
        if (examQuestions[i].correctAnswer === examQuestions[i].answers[y]) {
          corAnwserPosition = y;
        }
      }
      if (corAnwserPosition === examQuestions[i].selectedAnswer) {
        correct++;
      }
    }

    alert("Du klarte: " + correct + " riktige svar");
    for (let i = 0; i < examQuestions.length; i++) {
      examQuestions[i].selectedAnswer = -1;
    }
    props.navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>
          Spørsmål {questionNumber + 1} av {QUESTIONS.length} : Kapittel{" "}
          {chapter}
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.answer}>
        <MultipleChoice
          direction={"column"}
          chosenIndex={chosen}
          onPress={val => setChosen(val)}
          choices={answers}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Forrige spørsmål"
          disabled={backBtnDisable}
          onPress={() => changeQuestion("Back")}
        />
        <Button
          title="Neste Spørsmål"
          disabled={nextBtnDisable}
          onPress={() => changeQuestion("Next")}
        />
        <Button title="lever prøven" onPress={() => handinExam()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    width: "100%",
    height: "5%"
  },
  headerTxt: {
    fontSize: 23
  },
  question: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "blue"
  },
  questionText: {
    fontSize: 25,
    width: "90%",
    fontWeight: "bold"
  },
  answer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F5F5F5"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "15%",
    backgroundColor: "white"
  },
  button: {
    width: "50%"
  }
});

export default PracticeScreen;
