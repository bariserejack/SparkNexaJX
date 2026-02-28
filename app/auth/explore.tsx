import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌍 Explore</Text>
      </View>

      {/* Quick Categories */}
      <View style={styles.section}>
        <View style={styles.categoryGrid}>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="newspaper-outline" size={32} color="#007AFF" />
            <Text style={styles.categoryTitle}>Tech News</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="calendar-outline" size={32} color="#FF9500" />
            <Text style={styles.categoryTitle}>Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="people-outline" size={32} color="#34C759" />
            <Text style={styles.categoryTitle}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="rocket-outline" size={32} color="#FF3B30" />
            <Text style={styles.categoryTitle}>Startups</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tech News Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📰 Latest Tech News</Text>

        <TouchableOpacity style={styles.newsCard}>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>AI Breakthrough in 2026</Text>
            <Text style={styles.newsSnippet}>
              New developments in large language models...
            </Text>
            <Text style={styles.newsTime}>2 hours ago • 3 min read</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.newsCard}>
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>React Native Updates</Text>
            <Text style={styles.newsSnippet}>
              Latest features and improvements announced...
            </Text>
            <Text style={styles.newsTime}>5 hours ago • 4 min read</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎉 Upcoming Events</Text>

        <TouchableOpacity style={styles.eventCard}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>15</Text>
            <Text style={styles.eventMonth}>FEB</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>AI Hackathon 2026</Text>
            <Text style={styles.eventLocation}>📍 Virtual • Free</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventCard}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDay}>22</Text>
            <Text style={styles.eventMonth}>FEB</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>Mobile Dev Workshop</Text>
            <Text style={styles.eventLocation}>📍 Online • $20</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Community Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👥 Community Highlights</Text>

        <View style={styles.communityCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userAction}>shared a project</Text>
            </View>
          </View>
          <Text style={styles.postContent}>
            Just built my first AI chatbot with Claude API! 🚀
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 12,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  newsCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  newsSnippet: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 6,
  },
  newsTime: {
    fontSize: 12,
    color: "#8E8E93",
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  eventDate: {
    width: 60,
    height: 60,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  eventDay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventMonth: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  eventInfo: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#8E8E93",
  },
  communityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
  },
  userAction: {
    fontSize: 12,
    color: "#8E8E93",
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
