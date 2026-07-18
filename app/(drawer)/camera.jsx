import React, { useRef, useState } from "react";
import { StyleSheet, View, Image, Alert, TouchableOpacity, Text, ActivityIndicator, } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const Camera = () => {
    const CameraRef = useRef(null);

    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();

    const [mediaPermission, requestMediaLibraryPermission] =
        MediaLibrary.usePermissions({
            writeOnly: true,
        });

    const [photo, setPhoto] = useState(null);
    const [captureTime, setCaptureTime] = useState("");
    const [loading, setLoading] = useState(true);

    if (!permission) {
        return <View />;
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
                    color="#fff"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingBottom: 35,
    },

    camera: {
        flex: 1,
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
        backgroundColor: "#121212",
    },

    permissionButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 25,
        height: 55,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        padding: 15,
        backgroundColor: "#121212",
        gap: 12,
    },

    button: {
        backgroundColor: "#007AFF",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    captureButton: {
        backgroundColor: "#28A745",
    },

    deleteButton: {
        backgroundColor: "#DC3545",
    },

    buttonText: {
        color: "#fff",
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
        color: "#fff",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
    },
});