import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image, ImageSource } from "expo-image";

type Props = {
	imgSource: ImageSource;
	selectedImage?: string;
};
const ImageViewer = ({ imgSource, selectedImage }: Props) => {
	const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

	return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
	image: {
		width: 300,
		height: 400,
		borderRadius: 18,
	},
});
export default ImageViewer;
