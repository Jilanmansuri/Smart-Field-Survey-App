import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import { useSurveyContext } from "../../contexts/survey-context";

const LocationScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateSurvey } = useSurveyContext();

  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  // Check Permission on Mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
      }
    })();
  }, []);

  // Request Permission
  const requestPermission = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        setPermissionGranted(true);
        Alert.alert("Success", "Location Permission Granted");
        // Automatically fetch location once permission is granted
        getCurrentLocation();
      } else {
        Alert.alert("Permission Denied", "Location Permission Required");
      }
    } catch {
      Alert.alert("Error", "An error occurred while requesting permission");
    } finally {
      setLoading(false);
    }
  };

  // Get Current Location
  const getCurrentLocation = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

    const locationText = `${location.coords.latitude}, ${location.coords.longitude}`;

    await Clipboard.setStringAsync(locationText);
    updateSurvey({
      location: locationText,
    });

    Alert.alert("Success", "Location Copied Successfully!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['bottom']}>
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
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={styles.buttonText}>
              {permissionGranted
                ? "Get Current Location"
                : "Request Permission"}
            </Text>
          )}
        </Pressable>

        {/* Loading Coordinates Card */}
        {loading && !location && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching GPS coordinates...</Text>
          </View>
        )}

        {/* Location Details */}
        {location && (
          <>
            <View style={styles.coordsCard}>
              <View style={styles.coordRow}>
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>{location.coords.latitude}</Text>
              </View>
              <View style={styles.coordRowDivider} />
              <View style={styles.coordRow}>
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>{location.coords.longitude}</Text>
              </View>
            </View>

            <Text style={styles.location}>
              Accuracy : {location.coords.accuracy ? Number(location.coords.accuracy).toFixed(1) : "0"} meters
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
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.buttonText} />
              ) : (
                <Text style={styles.buttonText}>
                  Refresh Location
                </Text>
              )}
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
    </SafeAreaView>
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
    paddingTop: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
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

  coordsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: "80%",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  coordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  coordLabel: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "600",
  },

  coordValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },

  coordRowDivider: {
    height: 1,
    backgroundColor: colors.border,
    width: "100%",
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    gap: 12,
  },

  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },

  map: {
    width: "90%",
    height: 230,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
});