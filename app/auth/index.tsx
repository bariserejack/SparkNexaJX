import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>⚡ SparkNexaJX</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome back! 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Ready to ignite your tech journey?
        </Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color="#FF9500" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={24} color="#FFD60A" />
          <Text style={styles.statNumber}>850</Text>
          <Text style={styles.statLabel}>XP Points</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="ribbon" size={24} color="#AF52DE" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Badges</Text>
        </View>
      </View>

      {/* Daily Spark */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Today's Tech Spark</Text>
        <View style={styles.sparkCard}>
          <Text style={styles.sparkText}>
            "The best way to predict the future is to invent it." - Alan Kay
          </Text>
          <TouchableOpacity style={styles.sparkButton}>
            <Text style={styles.sparkButtonText}>Share This</Text>
            <Ionicons name="share-social-outline" size={16} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Learning */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📚 Continue Learning</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="logo-react" size={24} color="#007AFF" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>React Native Basics</Text>
            <Text style={styles.courseProgress}>75% Complete</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "75%" }]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: "#F3E5F5" }]}>
            <Ionicons name="hardware-chip-outline" size={24} color="#AF52DE" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>AI Fundamentals</Text>
            <Text style={styles.courseProgress}>30% Complete</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "30%" }]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Trending Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Trending Skills</Text>
        <View style={styles.skillsRow}>
          {["AI", "Web3", "React", "Python", "Cybersecurity", "Flutter"].map(
            (skill) => (
              <TouchableOpacity key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="chatbubbles" size={28} color="#007AFF" />
            <Text style={styles.actionTitle}>Ask AI</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="code-slash" size={28} color="#34C759" />
            <Text style={styles.actionTitle}>Practice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="people" size={28} color="#FF9500" />
            <Text style={styles.actionTitle}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="newspaper" size={28} color="#FF3B30" />
            <Text style={styles.actionTitle}>Tech News</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Community Highlights */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>👥 Community Highlights</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.communityCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userAction}>completed a project</Text>
            </View>
          </View>
          <Text style={styles.postContent}>
            Just built my first AI chatbot with Claude API! The possibilities
            are endless 🚀
          </Text>
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="heart-outline" size={18} color="#8E8E93" />
              <Text style={styles.postActionText}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={18} color="#8E8E93" />
              <Text style={styles.postActionText}>8</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.communityCard}>
          <View style={styles.userInfo}>
            <View style={[styles.avatar, { backgroundColor: "#34C759" }]}>
              <Text style={styles.avatarText}>SM</Text>
            </View>
            <View>
              <Text style={styles.userName}>Sarah Miller</Text>
              <Text style={styles.userAction}>earned a badge</Text>
            </View>
          </View>
          <View style={styles.badgeEarned}>
            <Ionicons name="trophy" size={32} color="#FFD60A" />
            <View>
              <Text style={styles.badgeTitle}>Code Master</Text>
              <Text style={styles.badgeDescription}>
                Completed 10 challenges
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recommended for You */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Recommended for You</Text>

        <TouchableOpacity style={styles.recommendCard}>
          <View style={styles.recommendBadge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
          <Text style={styles.recommendTitle}>Advanced React Patterns</Text>
          <Text style={styles.recommendDescription}>
            Master hooks, context, and performance optimization
          </Text>
          <View style={styles.recommendMeta}>
            <View style={styles.recommendMetaItem}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Text style={styles.recommendMetaText}>8 hours</Text>
            </View>
            <View style={styles.recommendMetaItem}>
              <Ionicons name="star" size={14} color="#FFD60A" />
              <Text style={styles.recommendMetaText}>4.9</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  welcomeCard: {
    backgroundColor: "#007AFF",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  sparkCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD60A",
  },
  sparkText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 12,
    lineHeight: 24,
  },
  sparkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  sparkButtonText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseProgress: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
  },
  skillChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  skillText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  actionCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  communityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
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
    fontSize: 14,
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
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    gap: 16,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postActionText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  badgeEarned: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF9E6",
    padding: 12,
    borderRadius: 8,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  badgeDescription: {
    fontSize: 12,
    color: "#8E8E93",
  },
  recommendCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  recommendBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  recommendDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendMeta: {
    flexDirection: "row",
    gap: 16,
  },
  recommendMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  recommendMetaText: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
