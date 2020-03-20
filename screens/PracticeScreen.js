import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import MultipleChoice from "react-native-multiple-choice-picker";
import { Ionicons } from "@expo/vector-icons";

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

    if (chosen !== -1) {
      examQuestions[questionNumber].selectedAnswer = chosen;
    }

    var countFinished = new Promise((resolve, reject) => {
      examQuestions.forEach((value, index, array) => {
        if (value.selectedAnswer !== -1) {
          ++count;
          if (index === array.length - 1) resolve();
        }
      });
    });

    countFinished.then(() => {
      if (count == examQuestions.length) {
        setHandIn(false);
      }
    });
  }, [chosen]);

  // Runs of Next question og previous question is being pressed
  let changeQuestion = val => {
    if (val === "Next") {
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

    props.navigation.navigate("Modal", {
      examQuestions: examQuestions,
      correctAnswers: correct
    });
  };

  props.navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
        <Ionicons
          name={Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"}
          size={25}
          color="black"
        />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <Button
        onPress={() => handinExam()}
        title="Lever Prøven"
        disabled={handIn}
      />
    )
  });

  const goBack = () => {
    Alert.alert(
      "Vil du avslutte eksamen?",
      "Prøven blir ikke lagret!",
      [
        {
          text: "JA",
          onPress: () => {
            props.navigation.navigate("Home");
          }
        },
        { text: "NEI", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>
          Spørsmål {questionNumber + 1} av {examQuestions.length} : Kapittel{" "}
          {chapter}
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <Text style={styles.questionText}>{question}</Text>
        </View>
      </View>
      <View style={styles.answer}>
        <MultipleChoice
          direction={"column"}
          chosenIndex={chosen}
          onPress={val => setChosen(val)}
          choices={answers}
          // style={{height: "50%"}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previusBtn}
          disabled={backBtnDisable}
          onPress={() => changeQuestion("Back")}
        >
          <Ionicons
            name={
              Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
            }
            size={50}
            color="#6694B7"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtn}
          disabled={nextBtnDisable}
          onPress={() => changeQuestion("Next")}
        >
          <Ionicons
            name={
              Platform.OS === "android"
                ? "md-arrow-forward"
                : "ios-arrow-forward"
            }
            size={50}
            color="#6694B7"
          />
        </TouchableOpacity>
        {/* <Button
          title="Forrige spørsmål"
          disabled={backBtnDisable}
          onPress={() => changeQuestion("Back")}
        />
        <Button
          title="Neste Spørsmål"
          disabled={nextBtnDisable}
          onPress={() => changeQuestion("Next")}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  backBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 13
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e9f0",
    width: "100%",
    height: "6%"
  },
  headerTxt: {
    fontSize: 25
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff4f7",
    height: "30%",
    borderBottomWidth: 1,
    borderBottomColor: "#6694b7",
    borderTopWidth: 1,
    borderTopColor: "#6694b7",
  },
  question: {
    width: "90%",
    marginRight: 10
  },
  questionText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  answer: {
    width: "100%",
    paddingRight: 20,
    paddingTop: 10,
    height: "50%",
    backgroundColor: "#e0e9f0"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "14%",
    backgroundColor: "white"
  },
  previusBtn: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c1d4e2"
  },
  nextBtn: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b2c9db"
  }
});

export default PracticeScreen;
