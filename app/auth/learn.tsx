import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LearnScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎓 Learn</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Learning Path */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Your Learning Path</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>React Native Mastery</Text>
            <Text style={styles.progressPercent}>65%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "65%" }]} />
          </View>
          <Text style={styles.progressText}>4 of 12 modules completed</Text>
        </View>
      </View>

      {/* Quick Categories */}
      <View style={styles.section}>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryChip}>
            <Ionicons name="code-slash" size={18} color="#007AFF" />
            <Text style={styles.categoryText}>Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Ionicons name="hammer" size={18} color="#FF9500" />
            <Text style={styles.categoryText}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}>
            <Ionicons name="trophy" size={18} color="#FFD60A" />
            <Text style={styles.categoryText}>Challenges</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Learning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Continue Learning</Text>

        <TouchableOpacity style={styles.courseCard}>
          <View style={[styles.courseIcon, { backgroundColor: "#E3F2FD" }]}>
            <Ionicons name="logo-react" size={28} color="#007AFF" />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>React Native Components</Text>
            <Text style={styles.courseSubtitle}>Module 5 of 12</Text>
            <View style={styles.courseMeta}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Text style={styles.courseTime}>45 min left</Text>
            </View>
          </View>
          <Ionicons name="play-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Build Real Projects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🛠️ Build Real Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.projectCard}>
          <View style={styles.projectBadge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
          <Text style={styles.projectTitle}>Build a Weather App</Text>
          <Text style={styles.projectDescription}>
            Create a real-time weather application using APIs
          </Text>
          <View style={styles.projectMeta}>
            <View style={styles.projectMetaItem}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Text style={styles.projectMetaText}>2-3 hours</Text>
            </View>
            <View style={styles.projectMetaItem}>
              <Ionicons name="bar-chart-outline" size={14} color="#34C759" />
              <Text style={styles.projectMetaText}>Beginner</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.projectCard}>
          <Text style={styles.projectTitle}>Chat App with AI</Text>
          <Text style={styles.projectDescription}>
            Build a messaging app integrated with Claude API
          </Text>
          <View style={styles.projectMeta}>
            <View style={styles.projectMetaItem}>
              <Ionicons name="time-outline" size={14} color="#8E8E93" />
              <Text style={styles.projectMetaText}>4-6 hours</Text>
            </View>
            <View style={styles.projectMetaItem}>
              <Ionicons name="bar-chart-outline" size={14} color="#FF9500" />
              <Text style={styles.projectMetaText}>Intermediate</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Weekly Challenge */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Weekly Challenge</Text>

        <View style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Ionicons name="flame" size={32} color="#FF3B30" />
            <View style={styles.challengeTimer}>
              <Text style={styles.timerText}>Ends in 3 days</Text>
            </View>
          </View>
          <Text style={styles.challengeTitle}>Build a Todo App in 1 Hour</Text>
          <Text style={styles.challengeDescription}>
            Test your skills by building a functional todo list app
          </Text>
          <View style={styles.challengeReward}>
            <Ionicons name="trophy" size={16} color="#FFD60A" />
            <Text style={styles.rewardText}>Win 500 XP + Badge</Text>
          </View>
          <TouchableOpacity style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>Start Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Skill Paths */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Skill Paths</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.skillPathsContainer}
        >
          <TouchableOpacity style={styles.skillPathCard}>
            <Ionicons name="globe-outline" size={32} color="#007AFF" />
            <Text style={styles.skillPathTitle}>Web Development</Text>
            <Text style={styles.skillPathCourses}>12 courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skillPathCard}>
            <Ionicons name="phone-portrait-outline" size={32} color="#34C759" />
            <Text style={styles.skillPathTitle}>Mobile Apps</Text>
            <Text style={styles.skillPathCourses}>8 courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skillPathCard}>
            <Ionicons name="bulb-outline" size={32} color="#AF52DE" />
            <Text style={styles.skillPathTitle}>AI & ML</Text>
            <Text style={styles.skillPathCourses}>10 courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skillPathCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={32}
              color="#FF3B30"
            />
            <Text style={styles.skillPathTitle}>Cybersecurity</Text>
            <Text style={styles.skillPathCourses}>6 courses</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginTop: 8,
  },
  seeAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  categoryRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  courseIcon: {
    width: 56,
    height: 56,
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
  courseSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 6,
  },
  courseMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseTime: {
    fontSize: 12,
    color: "#8E8E93",
  },
  projectCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  projectBadge: {
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
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 12,
    lineHeight: 20,
  },
  projectMeta: {
    flexDirection: "row",
    gap: 16,
  },
  projectMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  projectMetaText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  challengeCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  challengeTimer: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 12,
    color: "#FF9500",
    fontWeight: "600",
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#8E8E93",
    marginBottom: 12,
    lineHeight: 20,
  },
  challengeReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9500",
  },
  challengeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  challengeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  skillPathsContainer: {
    paddingLeft: 20,
  },
  skillPathCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    width: 140,
    marginRight: 12,
    alignItems: "center",
  },
  skillPathTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  skillPathCourses: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
