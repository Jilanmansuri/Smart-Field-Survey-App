import { useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Modal,
    ScrollView,
    Image,
    Linking,
    Platform,
    useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSurveyContext } from "../../../contexts/survey-context";
import { Colors } from "../../../constants/theme";

export default function History() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  
  const { history, deleteSurveyFromHistory } = useSurveyContext();
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const styles = getStyles(colors);

  const filteredData = history.filter((item) => {
    const matchSearch =
      item.site.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.priority === filter;

    return matchSearch && matchFilter;
  });

  const deleteSurvey = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteSurveyFromHistory(id);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey History</Text>

      <TextInput
        placeholder="Search Survey..."
        placeholderTextColor={colors.textSecondary}
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterContainer}>
        {["All", "High", "Medium", "Low"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item ? styles.activeFilterText : styles.inactiveFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.site}>{item.site}</Text>

            <Text style={styles.text}>
              Survey ID : {item.surveyId || "N/A"}
            </Text>

            <Text style={styles.text}>
              Client : {item.client}
            </Text>

            <Text style={styles.text}>
              Priority : {item.priority}
            </Text>

            <Text style={styles.text}>
              Date : {item.date}
            </Text>

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.viewBtn}
                onPress={() => setSelectedItem(item)}
              >
                <Text style={styles.btnText}>View</Text>
              </Pressable>

              <Pressable
                style={styles.deleteBtn}
                onPress={() => deleteSurvey(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Detail Modal */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedItem !== null}
          onRequestClose={() => setSelectedItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Survey Details</Text>
                <Pressable onPress={() => setSelectedItem(null)} style={styles.closeBtn}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </Pressable>
              </View>

              <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {selectedItem.photo ? (
                  <Image source={{ uri: selectedItem.photo }} style={styles.modalImage} resizeMode="cover" />
                ) : (
                  <View style={styles.noPhotoPlaceholder}>
                    <Ionicons name="image-outline" size={48} color={colors.icon} />
                    <Text style={styles.noPhotoText}>No Photo Attached</Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Survey ID</Text>
                  <Text style={styles.detailValue}>{selectedItem.surveyId || "N/A"}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Site Name</Text>
                  <Text style={styles.detailValue}>{selectedItem.site}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Client</Text>
                  <Text style={styles.detailValue}>{selectedItem.client}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Priority</Text>
                  <View
                    style={[
                      styles.priorityBadge,
                      selectedItem.priority === "High" && { backgroundColor: colors.error + "22", borderColor: colors.error },
                      selectedItem.priority === "Medium" && { backgroundColor: colors.warning + "22", borderColor: colors.warning },
                      selectedItem.priority === "Low" && { backgroundColor: colors.success + "22", borderColor: colors.success },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityBadgeText,
                        selectedItem.priority === "High" && { color: colors.error },
                        selectedItem.priority === "Medium" && { color: colors.warning },
                        selectedItem.priority === "Low" && { color: colors.success },
                      ]}
                    >
                      {selectedItem.priority}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Submission Date</Text>
                  <Text style={styles.detailValue}>{selectedItem.date}</Text>
                </View>

                {selectedItem.description ? (
                  <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Description</Text>
                    <Text style={styles.detailText}>{selectedItem.description}</Text>
                  </View>
                ) : null}

                {selectedItem.location ? (
                  <View style={styles.detailRowWithAction}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>Location Coordinates</Text>
                      <Text style={styles.detailValue}>{selectedItem.location}</Text>
                    </View>
                    <Pressable
                      style={styles.actionIconBtn}
                      onPress={() => {
                        const [lat, lng] = selectedItem.location.split(",");
                        const url = Platform.select({
                          ios: `maps:0,0?q=${lat.trim()},${lng.trim()}`,
                          android: `geo:0,0?q=${lat.trim()},${lng.trim()}`,
                          default: `https://www.google.com/maps/search/?api=1&query=${lat.trim()},${lng.trim()}`,
                        });
                        Linking.openURL(url).catch(() => Alert.alert("Error", "Could not open map app."));
                      }}
                    >
                      <Ionicons name="map" size={20} color={colors.primary} />
                    </Pressable>
                  </View>
                ) : null}

                {selectedItem.contact ? (
                  <View style={styles.detailRowWithAction}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>Contact Phone</Text>
                      <Text style={styles.detailValue}>{selectedItem.contact}</Text>
                    </View>
                    <Pressable
                      style={[styles.actionIconBtn, { backgroundColor: colors.success + "15" }]}
                      onPress={() => Linking.openURL(`tel:${selectedItem.contact}`)}
                    >
                      <Ionicons name="call" size={20} color={colors.success} />
                    </Pressable>
                  </View>
                ) : null}

                {selectedItem.notes ? (
                  <View style={styles.detailBlock}>
                    <Text style={styles.detailLabel}>Field Notes</Text>
                    <Text style={styles.detailText}>{selectedItem.notes}</Text>
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 15,
  },

  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },

  search: {
    backgroundColor: colors.inputBg,
    color: colors.text,
    borderRadius: 14,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  filterButton: {
    backgroundColor: colors.card,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },

  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterText: {
    fontWeight: "600",
  },

  activeFilterText: {
    color: colors.buttonText,
  },

  inactiveFilterText: {
    color: colors.textSecondary,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  site: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  text: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  viewBtn: {
    backgroundColor: colors.primary,
    width: "48%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: colors.error,
    width: "48%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: colors.buttonText,
    fontWeight: "700",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  closeBtn: {
    padding: 4,
  },

  modalScroll: {
    paddingBottom: 40,
  },

  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },

  noPhotoPlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: colors.card,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  noPhotoText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  detailRowWithAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "700",
  },

  detailText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 6,
    lineHeight: 22,
  },

  detailBlock: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  actionIconBtn: {
    backgroundColor: colors.primary + "15",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },

  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },

  priorityBadgeText: {
    fontSize: 13,
    fontWeight: "800",
  },
});