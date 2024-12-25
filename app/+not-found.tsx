import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const NotFoundScreen = () => {
	return (
		<>
			<Stack.Screen options={{ title: "Oops! Not Found" }} />
			<View style={styles.container}>
				<Link href="/" style={styles.button}>
					Go to Home screen
				</Link>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#25292e",
	},
	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff",
	},
});

export default NotFoundScreen;
