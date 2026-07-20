import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default function MapViewComponent({ location, colors }) {
  if (!location || !location.coords) return null;

  const lat = location.coords.latitude;
  const lng = location.coords.longitude;

  const leafletHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html, #map { height: 100%; width: 100%; background: ${colors.background || "#ffffff"}; }
        .leaflet-container { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .custom-popup .leaflet-popup-content-wrapper {
          background: ${colors.card || "#ffffff"};
          color: ${colors.text || "#000000"};
          border-radius: 8px;
          padding: 4px;
        }
        .custom-popup .leaflet-popup-tip { background: ${colors.card || "#ffffff"}; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: true, attributionControl: false }).setView([${lat}, ${lng}], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        var marker = L.marker([${lat}, ${lng}]).addTo(map);
        marker.bindPopup("<b style='color:${colors.primary || "#3b82f6"};'>Current Location</b><br/>Lat: ${lat.toFixed(5)}<br/>Lng: ${lng.toFixed(5)}", { className: 'custom-popup' }).openPopup();
      </script>
    </body>
    </html>
  `;

  if (Platform.OS === "web") {
    return (
      <View style={[styles.mapContainer, { borderColor: colors.border }]}>
        <iframe
          title="OpenStreetMap"
          srcDoc={leafletHtml}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: 10 }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.mapContainer, { borderColor: colors.border }]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHtml }}
        style={{ flex: 1, backgroundColor: "transparent", borderRadius: 10 }}
        scrollEnabled={false}
        overScrollMode="never"
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "90%",
    height: 230,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
});
