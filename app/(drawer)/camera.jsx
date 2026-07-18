import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { router } from "expo-router";
import { useSurveyContext } from "../../contexts/survey-context";
import { Colors } from "../../constants/theme";

const Camera = () => {
    const CameraRef = useRef(null);

    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();

    const [mediaPermission, requestMediaLibraryPermission] =
        MediaLibrary.usePermissions({
            writeOnly: true,
        });

    const { survey, updateSurvey } = useSurveyContext();
    const [photo, setPhoto] = useState(survey.photo);
    const [captureTime, setCaptureTime] = useState("");
    const [loading, setLoading] = useState(true);

    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const styles = getStyles(colors);

    if (!permission) {
        return <View style={{ flex: 1, backgroundColor: colors.background }} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Grant Camera Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePhoto = async () => {
        if (!CameraRef.current) return;

        try {
            const result = await CameraRef.current.takePictureAsync();

            if (!result) return;

            setPhoto(result.uri);
            updateSurvey({ photo: result.uri });
            setCaptureTime(new Date().toLocaleString());

            const libraryPermission = mediaPermission?.granted
                ? mediaPermission
                : await requestMediaLibraryPermission();

            if (!libraryPermission.granted) {
                Alert.alert(
                    "Permission Denied",
                    "Gallery permission is required."
                );
                return;
            }

            await MediaLibrary.saveToLibraryAsync(result.uri);

            Alert.alert("Success", "Photo Saved Successfully!");
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to capture photo.");
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
        setCaptureTime("");
    };

    const deletePhoto = () => {
        Alert.alert(
            "Delete Photo",
            "Are you sure you want to delete this photo?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setPhoto(null);
                        updateSurvey({ photo: null });
                        setCaptureTime("");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={styles.loader}
                />
            )}

            <CameraView
                ref={CameraRef}
                style={styles.camera}
                facing={facing}
                onCameraReady={() => setLoading(false)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        setFacing(facing === "back" ? "front" : "back")
                    }
                >
                    <Text style={styles.buttonText}>Flip Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.captureButton]}
                    onPress={takePhoto}
                >
                    <Text style={styles.buttonText}>Click Picture</Text>
                </TouchableOpacity>

                {photo && (
                    <>
                        <Image
                            source={{ uri: photo }}
                            style={styles.image}
                        />

                        <Text style={styles.time}>
                            Capture Time : {captureTime}
                        </Text>

                        <TouchableOpacity
                            style={[styles.button, styles.assignButton]}
                            onPress={() => {
                                Alert.alert("Success", "Photo linked to survey!");
                                router.push("/(drawer)/(tabs)/survey");
                            }}
                        >
                            <Text style={styles.buttonText}>Use Photo in Survey</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={retakePhoto}
                        >
                            <Text style={styles.buttonText}>Retake Photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={deletePhoto}
                        >
                            <Text style={styles.buttonText}>Delete Photo</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

export default Camera;

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 35,
    },

    camera: {
        flex: 2,
    },

    loader: {
        position: "absolute",
        top: "45%",
        alignSelf: "center",
        zIndex: 10,
    },

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },

    permissionButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 25,
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        padding: 15,
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
    },

    button: {
        backgroundColor: colors.primary,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    captureButton: {
        backgroundColor: colors.primary, // Blue capture
    },

    assignButton: {
        backgroundColor: colors.success, // Green assign
    },

    deleteButton: {
        backgroundColor: colors.error,
    },

    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "bold",
    },

    image: {
        width: 180,
        height: 180,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
    },

    time: {
        color: colors.text,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
    },
});