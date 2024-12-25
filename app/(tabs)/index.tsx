import { View, StyleSheet, Platform } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import { ImageSource } from "expo-image";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

const placeHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
	const [status, requestPermission] = MediaLibrary.usePermissions();
	const [selectedImage, setSelectedImage] = useState<string | undefined>(
		undefined
	);
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
	const [isModelVisible, setIsModelVisible] = useState<boolean>(false);
	const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
		undefined
	);

	if (status == null) {
		requestPermission();
	}

	const imageRef = useRef<View>(null);
	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos", "images"],
			allowsEditing: true,
			quality: 1,
		});
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert("You did not select any image...");
		}
	};

	const onReset = () => {
		setShowAppOptions(false);
	};
	const onAddSticker = () => {
		setIsModelVisible(true);
	};
	const onCloseModel = () => {
		setIsModelVisible(false);
	};
	const onSaveImageAsync = async () => {
		if (Platform.OS !== "web") {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});
				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert("Saved");
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const dataUri: string = await domtoimage.toJpeg(
					imageRef.current,
					{
						quality: 0.95,
						width: 300,
						height: 400,
					}
				);

				let link = document.createElement("a");
				link.download = "sticker-smash.jpeg";
				link.href = dataUri;
				link.click();
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<View ref={imageRef} collapsable={false}>
						<ImageViewer
							imgSource={placeHolderImage}
							selectedImage={selectedImage}
						/>
						{pickedEmoji && (
							<EmojiSticker
								imageSize={30}
								stickerSource={pickedEmoji}
							/>
						)}
					</View>
				</View>
				{showAppOptions ? (
					<View style={styles.optionsContainer}>
						<View style={styles.optionsRow}>
							<IconButton
								icon="refresh"
								label="Reset"
								onPress={onReset}
							/>
							<CircleButton onPress={onAddSticker} />
							<IconButton
								icon="save-alt"
								label="Save"
								onPress={onSaveImageAsync}
							/>
						</View>
					</View>
				) : (
					<View style={styles.footerContainer}>
						<Button
							onPress={pickImageAsync}
							theme="primary"
							label="Choose a photo"
						/>
						<Button
							label="Use this photo"
							onPress={() => setShowAppOptions(true)}
						/>
					</View>
				)}
				<EmojiPicker isVisible={isModelVisible} onClose={onCloseModel}>
					<EmojiList
						onSelect={setPickedEmoji}
						onCloseModel={onCloseModel}
					/>
				</EmojiPicker>
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#25292e",
	},
	imageContainer: {
		flex: 1,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: "center",
	},
	optionsContainer: {
		position: "absolute",
		bottom: 33,
	},
	optionsRow: {
		alignItems: "center",
		flexDirection: "row",
	},
});
