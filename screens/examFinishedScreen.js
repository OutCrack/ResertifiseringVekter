import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const examFinishedScreen = props => {
  return(
    <View style={styles.container}>
      <Text style={styles.font}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
			<View style={headerContainer}>
			<Text style={styles.headerTxt}>Du klarte {props.correct} av {props.questions}</Text>
			</View>
			<View style={questionContainer}>
			</View>
    </View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center"
	},
	headerContainer: {
	
	},
	questionContainer: {
		
	};
	font: {
		fontSize: 30
	}
});

export default examFinishedScreen;
