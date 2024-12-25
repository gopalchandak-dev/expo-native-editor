import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";

interface Props {
	isVisible: boolean;
	children: ReactNode;
	onClose: () => void;
}
const EmojiPicker = ({ children, isVisible, onClose }: Props) => {
	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={styles.modelContent}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Choose a sticker</Text>
					<Pressable onPress={onClose}>
						<MaterialIcons name="close" size={26} color="#fff" />
					</Pressable>
				</View>
				{children}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modelContent: {
		height: "26%",
		width: "100%",
		backgroundColor: "#25292e",
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: "absolute",
		bottom: 0,
	},
	titleContainer: {
		height: "26%",
		backgroundColor: "#464C55",
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 19,
		color: "#fff",
	},
});

export default EmojiPicker;
