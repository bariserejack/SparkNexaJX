import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header with Settings */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>YN</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Your Name</Text>
            <Text style={styles.profileTitle}>Full-Stack Developer</Text>
            <View style={styles.locationBadge}>
              <Ionicons name="location" size={14} color="#8E8E93" />
              <Text style={styles.locationText}>Benin City, Nigeria</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={18} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <Text style={styles.bio}>
          Passionate about building amazing mobile apps and learning new
          technologies. Currently mastering React Native and AI! 🚀
        </Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Sparks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>850</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
        </View>
      </View>

      {/* Learning Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Learning Progress</Text>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Current Streak</Text>
              <Text style={styles.progressSubtitle}>Keep it up! 🔥</Text>
            </View>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={24} color="#FF9500" />
              <Text style={styles.streakNumber}>12</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressItem}>
            <View style={styles.progressItemHeader}>
              <Text style={styles.progressItemTitle}>Courses Completed</Text>
              <Text style={styles.progressItemValue}>8/15</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "53%", backgroundColor: "#007AFF" },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressItemHeader}>
              <Text style={styles.progressItemTitle}>Challenges Won</Text>
              <Text style={styles.progressItemValue}>15/20</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "75%", backgroundColor: "#34C759" },
                ]}
              />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressItemHeader}>
              <Text style={styles.progressItemTitle}>Skill Level</Text>
              <Text style={styles.progressItemValue}>Intermediate</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: "60%", backgroundColor: "#FF9500" },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Achievements & Badges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏆 Achievements</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.badgesContainer}
        >
          <View style={styles.badgeCard}>
            <View style={[styles.badgeIcon, { backgroundColor: "#FFD60A" }]}>
              <Ionicons name="trophy" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.badgeName}>First Win</Text>
            <Text style={styles.badgeDescription}>Won first challenge</Text>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIcon, { backgroundColor: "#FF9500" }]}>
              <Ionicons name="flame" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.badgeName}>On Fire</Text>
            <Text style={styles.badgeDescription}>7-day streak</Text>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIcon, { backgroundColor: "#007AFF" }]}>
              <Ionicons name="code-slash" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.badgeName}>Code Master</Text>
            <Text style={styles.badgeDescription}>10 projects done</Text>
          </View>

          <View style={styles.badgeCard}>
            <View style={[styles.badgeIcon, { backgroundColor: "#34C759" }]}>
              <Ionicons name="people" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.badgeName}>Networker</Text>
            <Text style={styles.badgeDescription}>50+ sparks</Text>
          </View>

          <View style={[styles.badgeCard, styles.lockedBadge]}>
            <View style={[styles.badgeIcon, { backgroundColor: "#E5E5EA" }]}>
              <Ionicons name="lock-closed" size={32} color="#8E8E93" />
            </View>
            <Text style={styles.badgeName}>Expert</Text>
            <Text style={styles.badgeDescription}>Complete 20 courses</Text>
          </View>
        </ScrollView>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>💡 My Skills</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.skillsGrid}>
          <View style={styles.skillBadge}>
            <Ionicons name="logo-react" size={20} color="#007AFF" />
            <Text style={styles.skillName}>React Native</Text>
            <View style={styles.skillLevel}>
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star-outline" size={12} color="#FFD60A" />
            </View>
          </View>

          <View style={styles.skillBadge}>
            <Ionicons name="logo-javascript" size={20} color="#F7DF1E" />
            <Text style={styles.skillName}>JavaScript</Text>
            <View style={styles.skillLevel}>
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
            </View>
          </View>

          <View style={styles.skillBadge}>
            <Ionicons name="logo-python" size={20} color="#3776AB" />
            <Text style={styles.skillName}>Python</Text>
            <View style={styles.skillLevel}>
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star-outline" size={12} color="#FFD60A" />
              <Ionicons name="star-outline" size={12} color="#FFD60A" />
            </View>
          </View>

          <View style={styles.skillBadge}>
            <Ionicons name="hardware-chip" size={20} color="#AF52DE" />
            <Text style={styles.skillName}>AI/ML</Text>
            <View style={styles.skillLevel}>
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star" size={12} color="#FFD60A" />
              <Ionicons name="star-outline" size={12} color="#FFD60A" />
              <Ionicons name="star-outline" size={12} color="#FFD60A" />
            </View>
          </View>
        </View>
      </View>

      {/* Portfolio/Projects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚀 My Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Add New</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.projectCard}>
          <View style={styles.projectThumbnail}>
            <Ionicons name="phone-portrait" size={32} color="#007AFF" />
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>Weather App</Text>
            <Text style={styles.projectDescription}>
              Real-time weather app with beautiful UI
            </Text>
            <View style={styles.projectTags}>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>React Native</Text>
              </View>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>API</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.projectCard}>
          <View
            style={[styles.projectThumbnail, { backgroundColor: "#F3E5F5" }]}
          >
            <Ionicons name="chatbubbles" size={32} color="#AF52DE" />
          </View>
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>AI Chat Bot</Text>
            <Text style={styles.projectDescription}>
              Smart chatbot powered by Claude API
            </Text>
            <View style={styles.projectTags}>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>AI</Text>
              </View>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>Claude</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Settings</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={22} color="#007AFF" />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <View style={styles.settingDivider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#FF9500"
              />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E5E5EA", true: "#007AFF" }}
            />
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={22} color="#5856D6" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#E5E5EA", true: "#007AFF" }}
            />
          </View>

          <View style={styles.settingDivider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#34C759"
              />
              <Text style={styles.settingText}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <View style={styles.settingDivider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={22} color="#8E8E93" />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>Share Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={[styles.actionButtonText, styles.logoutText]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <Text style={styles.versionText}>SparkNexaJX v1.0.0</Text>

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
  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 8,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  editProfileButton: {
    padding: 8,
  },
  bio: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E5EA",
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
  progressCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
  },
  streakBadge: {
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF9500",
    marginTop: 4,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressItemTitle: {
    fontSize: 14,
    color: "#333",
  },
  progressItemValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  badgesContainer: {
    paddingLeft: 20,
  },
  badgeCard: {
    width: 120,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 12,
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  badgeDescription: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  skillBadge: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  skillName: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 8,
  },
  skillLevel: {
    flexDirection: "row",
    gap: 2,
  },
  projectCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  projectThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 8,
  },
  projectTags: {
    flexDirection: "row",
    gap: 6,
  },
  projectTag: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  projectTagText: {
    fontSize: 11,
    color: "#007AFF",
    fontWeight: "500",
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  settingDivider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginLeft: 50,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    backgroundColor: "#FFFFFF",
  },
  logoutText: {
    color: "#FF3B30",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 8,
  },
});
