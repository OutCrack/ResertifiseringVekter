import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MultipleChoice from "react-native-multiple-choice-picker";

const PracticeScreen = props => {
  const { examQuestions } = props.route.params;
  const [chapter, setChapter] = useState(examQuestions[0].chapter);
  const [question, setQuestion] = useState(examQuestions[0].question);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState(examQuestions[questionNumber].answers);
  const [chosen, setChosen] = useState(-1);
  const [backBtnDisable, setBackBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);
  const [handIn, setHandIn] = useState(true);

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

    setChosen(examQuestions[questionNumber].selectedAnswer);
    setQuestion(examQuestions[questionNumber].question);
    setAnswers(examQuestions[questionNumber].answers);
    setChapter(examQuestions[questionNumber].chapter);
  }, [questionNumber]);

  useEffect(() => {
    let count = 0;
    examQuestions.forEach(element => {
      if (element.selectedAnswer !== -1) count++;
    });

    alert(count + " - " + examQuestions.length);
    if (count == examQuestions.length) {
      setHandIn(false);
    }
  }, [chosen, setChosen]);

  // Runs of Next question og previous question is being pressed
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

    // alert("Du klarte: " + correct + " riktige svar");
    // for (let i = 0; i < examQuestions.length; i++) {
    //   examQuestions[i].selectedAnswer = -1;
    // }
    props.navigation.navigate("Modal", {
      examQuestions: examQuestions,
      correctAnswers: correct
    });
  };

  props.navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() => alert("This is a button!")}
        title="Lever Prøven"
        disabled={handIn}
      />
    )
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>
          Spørsmål {questionNumber + 1} av {examQuestions.length} : Kapittel{" "}
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
    paddingRight: 20,
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
