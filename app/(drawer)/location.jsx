import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import { useSurveyContext } from "../../contexts/survey-context";
import { Colors } from "../../constants/theme";

const LocationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const { updateSurvey } = useSurveyContext();

  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  // Request Permission
  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      setPermissionGranted(true);
      Alert.alert("Success", "Location Permission Granted");
    } else {
      Alert.alert("Permission Denied", "Location Permission Required");
    }
  };

  // Get Current Location
  const getCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      updateSurvey({
        location: `${currentLocation.coords.latitude}, ${currentLocation.coords.longitude}`,
      });
    } catch {
      Alert.alert("Error", "Unable to fetch location");
    }
  };

  // Refresh Location
  const refreshLocation = () => {
    getCurrentLocation();
  };

  // Copy Current Location
  const copyLocation = async () => {
    if (!location) {
      Alert.alert("Error", "No location found");
      return;
    }

    const locationText = `Latitude: ${location.coords.latitude}
Longitude: ${location.coords.longitude}
Accuracy: ${location.coords.accuracy} meters`;

    await Clipboard.setStringAsync(locationText);
    updateSurvey({
      location: `${location.coords.latitude}, ${location.coords.longitude}`,
    });

    Alert.alert("Success", "Location Copied Successfully!");
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Location Demo</Text>

      {/* Permission / Get Location Button */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={
          permissionGranted
            ? getCurrentLocation
            : requestPermission
        }
      >
        <Text style={styles.buttonText}>
          {permissionGranted
            ? "Get Current Location"
            : "Request Permission"}
        </Text>
      </Pressable>

      {/* Location Details */}
      {location && (
        <>
          <Text style={styles.location}>
            Latitude : {location.coords.latitude}
          </Text>

          <Text style={styles.location}>
            Longitude : {location.coords.longitude}
          </Text>

          <Text style={styles.location}>
            Accuracy : {location.coords.accuracy} meters
          </Text>

          <MapView
            style={styles.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Current Location"
            />
          </MapView>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={refreshLocation}
          >
            <Text style={styles.buttonText}>
              Refresh Location
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={copyLocation}
          >
            <Text style={styles.buttonText}>
              Copy Current Location
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.useBtn,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => {
              updateSurvey({
                location: `${location.coords.latitude}, ${location.coords.longitude}`,
              });
              Alert.alert("Success", "Location assigned to survey draft!");
              router.push("/(drawer)/(tabs)/survey");
            }}
          >
            <Text style={styles.buttonText}>
              Use Location in Survey
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};

export default LocationScreen;

const getStyles = (colors) => StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 35,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  useBtn: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.buttonText,
  },

  location: {
    color: colors.text,
    fontSize: 17,
    marginTop: 10,
  },

  map: {
    width: "90%",
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
});