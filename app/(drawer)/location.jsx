import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import * as Clipboard from "expo-clipboard";

const LocationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);

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
    } catch (error) {
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

    Alert.alert("Success", "Location Copied Successfully!");
  };

  return (
    <View style={styles.container}>
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
        </>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },

  buttonPressed: {
    backgroundColor: "#ccc",
    transform: [{ scale: 0.95 }],
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

  location: {
    color: "white",
    fontSize: 17,
    marginTop: 10,
  },

  map: {
    width: "90%",
    height: 250,
    marginTop: 20,
    borderRadius: 10,
  },
});