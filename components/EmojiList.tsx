import {
	View,
	Text,
	FlatList,
	Pressable,
	ImageSourcePropType,
	Platform,
	StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Image, ImageSource } from "expo-image";

interface Props {
	onSelect: (image: ImageSource) => void;
	onCloseModel: () => void;
}
const EmojiList = ({ onSelect, onCloseModel }: Props) => {
	const [emoji] = useState<ImageSource[]>([
		require("../assets/images/emoji1.png"),
		require("../assets/images/emoji2.png"),
		require("../assets/images/emoji3.png"),
		require("../assets/images/emoji4.png"),
		require("../assets/images/emoji5.png"),
		require("../assets/images/emoji6.png"),
	]);
	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={Platform.OS === "web"}
			data={emoji}
			contentContainerStyle={styles.listContainer}
			renderItem={({ item, index }) => (
				<Pressable
					onPress={() => {
						onSelect(item);
						onCloseModel();
					}}
				>
					<Image source={item} key={index} style={styles.image} />
				</Pressable>
			)}
		/>
	);
};
const styles = StyleSheet.create({
	listContainer: {
		paddingHorizontal: 10,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	image: {
		marginRight: 15,
		width: 70,
		height: 70,
	},
});

export default EmojiList;
