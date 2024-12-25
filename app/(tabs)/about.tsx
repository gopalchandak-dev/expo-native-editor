import { View, Text, StyleSheet } from "react-native";
import React from "react";

const about = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text1}> Expo React Native Learning</Text>
			<Text style={styles.text2}>
				This app is created as a learning experiment with Expo React
				Native
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#25292e",
	},
	text1: {
		color: "#fff",
		fontSize: 24,
	},
	text2: {
		color: "#fff",
		paddingHorizontal: 15,
		paddingVertical: 15,
		alignItems: "center",
	},
});
export default about;
