import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const MainScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resertifisering for Vektere</Text>
      <Button
        title="Prøve eksamen"
        onPress={() => props.navigation.navigate("Practice")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'space-around'
  },
  header: {
    color: "#59566B",
    fontSize: 36,
    fontWeight: '500'
	},
  menu: {}
});

export default MainScreen;
