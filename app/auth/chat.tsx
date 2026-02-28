import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState("messages"); // messages, groups, sparkbot

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 Chat</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="add-circle-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "messages" && styles.activeTab]}
          onPress={() => setActiveTab("messages")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "messages" && styles.activeTabText,
            ]}
          >
            Messages
          </Text>
          {activeTab === "messages" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "groups" && styles.activeTab]}
          onPress={() => setActiveTab("groups")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "groups" && styles.activeTabText,
            ]}
          >
            Groups
          </Text>
          {activeTab === "groups" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "sparkbot" && styles.activeTab]}
          onPress={() => setActiveTab("sparkbot")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "sparkbot" && styles.activeTabText,
            ]}
          >
            SparkBot AI
          </Text>
          {activeTab === "sparkbot" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "groups" && <GroupsTab />}
        {activeTab === "sparkbot" && <SparkBotTab />}
      </ScrollView>
    </View>
  );
}

// Messages Tab Component
function MessagesTab() {
  return (
    <View>
      {/* Spark Network Quick Access */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚡ Your Spark Network</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {/* Add New Spark */}
          <TouchableOpacity style={styles.addStory}>
            <View style={styles.addStoryCircle}>
              <Ionicons name="add" size={24} color="#007AFF" />
            </View>
            <Text style={styles.storyName}>Add Spark</Text>
          </TouchableOpacity>

          {/* Online Sparks */}
          <TouchableOpacity style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.storyAvatar}>JD</Text>
            </View>
            <Text style={styles.storyName}>John D.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.storyAvatar}>SM</Text>
            </View>
            <Text style={styles.storyName}>Sarah M.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <Text style={styles.storyAvatar}>AK</Text>
            </View>
            <Text style={styles.storyName}>Alex K.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.storyAvatar}>EP</Text>
            </View>
            <Text style={styles.storyName}>Emma P.</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Recent Messages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>

        {/* Message Item 1 */}
        <TouchableOpacity style={styles.messageCard}>
          <View style={styles.messageAvatar}>
            <View style={styles.onlineIndicatorSmall} />
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>John Doe</Text>
              <Text style={styles.messageTime}>2m</Text>
            </View>
            <View style={styles.messagePreview}>
              <Text style={styles.messageText} numberOfLines={1}>
                Hey! Did you check out that React Native tutorial?
              </Text>
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>2</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Message Item 2 */}
        <TouchableOpacity style={styles.messageCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#34C759" }]}>
            <View style={styles.onlineIndicatorSmall} />
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>Sarah Miller</Text>
              <Text style={styles.messageTime}>1h</Text>
            </View>
            <View style={styles.messagePreview}>
              <Ionicons name="mic" size={14} color="#8E8E93" />
              <Text
                style={[styles.messageText, { marginLeft: 4 }]}
                numberOfLines={1}
              >
                Voice message
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Message Item 3 */}
        <TouchableOpacity style={styles.messageCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#AF52DE" }]}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>Alex Kumar</Text>
              <Text style={styles.messageTime}>3h</Text>
            </View>
            <View style={styles.messagePreview}>
              <Ionicons name="code-slash" size={14} color="#8E8E93" />
              <Text
                style={[
                  styles.messageText,
                  { marginLeft: 4, color: "#8E8E93" },
                ]}
                numberOfLines={1}
              >
                Shared a code snippet
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Message Item 4 */}
        <TouchableOpacity style={styles.messageCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#FF9500" }]}>
            <Text style={styles.avatarText}>EP</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>Emma Park</Text>
              <Text style={styles.messageTime}>Yesterday</Text>
            </View>
            <View style={styles.messagePreview}>
              <Text
                style={[styles.messageText, { color: "#8E8E93" }]}
                numberOfLines={1}
              >
                Thanks for the help! Really appreciate it 🙏
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Message Item 5 */}
        <TouchableOpacity style={styles.messageCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#FF3B30" }]}>
            <Text style={styles.avatarText}>MJ</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.messageName}>Mike Johnson</Text>
              <Text style={styles.messageTime}>2 days ago</Text>
            </View>
            <View style={styles.messagePreview}>
              <Text
                style={[styles.messageText, { color: "#8E8E93" }]}
                numberOfLines={1}
              >
                You: Sure, let's collaborate on that project!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Suggested Sparks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Suggested Sparks</Text>
        <Text style={styles.sectionSubtitle}>
          People you might want to spark with
        </Text>

        <TouchableOpacity style={styles.suggestedCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#5856D6" }]}>
            <Text style={styles.avatarText}>LW</Text>
          </View>
          <View style={styles.suggestedInfo}>
            <Text style={styles.suggestedName}>Lisa Wang</Text>
            <Text style={styles.suggestedBio}>
              Full-Stack Developer • AI Enthusiast
            </Text>
            <View style={styles.mutualSparks}>
              <Ionicons name="people" size={12} color="#8E8E93" />
              <Text style={styles.mutualText}>5 mutual sparks</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sparkButton}>
            <Ionicons name="flash" size={16} color="#FFFFFF" />
            <Text style={styles.sparkButtonText}>Spark</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.suggestedCard}>
          <View style={[styles.messageAvatar, { backgroundColor: "#00C7BE" }]}>
            <Text style={styles.avatarText}>RC</Text>
          </View>
          <View style={styles.suggestedInfo}>
            <Text style={styles.suggestedName}>Ryan Chen</Text>
            <Text style={styles.suggestedBio}>
              Mobile Dev • React Native Expert
            </Text>
            <View style={styles.mutualSparks}>
              <Ionicons name="people" size={12} color="#8E8E93" />
              <Text style={styles.mutualText}>3 mutual sparks</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sparkButton}>
            <Ionicons name="flash" size={16} color="#FFFFFF" />
            <Text style={styles.sparkButtonText}>Spark</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Groups Tab Component
function GroupsTab() {
  return (
    <View>
      {/* My Groups */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Groups</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.groupCard}>
          <View style={[styles.groupIcon, { backgroundColor: "#007AFF" }]}>
            <Ionicons name="logo-react" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>React Native Developers</Text>
            <Text style={styles.groupMembers}>1.2k members • 45 online</Text>
            <Text style={styles.groupLastMessage}>
              Sarah: Anyone tried the new Expo SDK?
            </Text>
          </View>
          <View style={styles.groupBadge}>
            <Text style={styles.groupBadgeText}>12</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.groupCard}>
          <View style={[styles.groupIcon, { backgroundColor: "#AF52DE" }]}>
            <Ionicons name="hardware-chip" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>AI & Machine Learning</Text>
            <Text style={styles.groupMembers}>850 members • 28 online</Text>
            <Text style={styles.groupLastMessage}>
              Alex: Check out this GPT-4 tutorial!
            </Text>
          </View>
          <View style={styles.groupBadge}>
            <Text style={styles.groupBadgeText}>5</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.groupCard}>
          <View style={[styles.groupIcon, { backgroundColor: "#34C759" }]}>
            <Ionicons name="code-slash" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Web Development</Text>
            <Text style={styles.groupMembers}>2.1k members • 67 online</Text>
            <Text style={styles.groupLastMessage}>
              Mike: New CSS features are amazing 🔥
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Discover Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Discover Groups</Text>

        <TouchableOpacity style={styles.discoverCard}>
          <View style={[styles.groupIcon, { backgroundColor: "#FF9500" }]}>
            <Ionicons name="logo-python" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Python Developers</Text>
            <Text style={styles.groupMembers}>3.5k members</Text>
            <Text style={styles.groupDescription}>
              Learn and share Python tips & tricks
            </Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.discoverCard}>
          <View style={[styles.groupIcon, { backgroundColor: "#FF3B30" }]}>
            <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>Cybersecurity Hub</Text>
            <Text style={styles.groupMembers}>1.8k members</Text>
            <Text style={styles.groupDescription}>
              Security best practices & news
            </Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// SparkBot AI Tab Component
function SparkBotTab() {
  return (
    <View style={styles.sparkBotContainer}>
      {/* SparkBot Header */}
      <View style={styles.sparkBotHeader}>
        <View style={styles.botAvatar}>
          <Ionicons name="flash" size={32} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.botName}>SparkBot AI</Text>
          <View style={styles.botStatus}>
            <View style={styles.onlineIndicatorSmall} />
            <Text style={styles.botStatusText}>Always online</Text>
          </View>
        </View>
      </View>

      {/* Bot Features */}
      <View style={styles.botFeatures}>
        <Text style={styles.botFeaturesTitle}>I can help you with:</Text>

        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="code-slash" size={24} color="#007AFF" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Code Explanation</Text>
            <Text style={styles.featureDescription}>
              Understand any code snippet
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="bug" size={24} color="#FF3B30" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Debug Help</Text>
            <Text style={styles.featureDescription}>Fix errors and bugs</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="map" size={24} color="#34C759" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Learning Roadmap</Text>
            <Text style={styles.featureDescription}>
              Get personalized learning paths
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureCard}>
          <Ionicons name="briefcase" size={24} color="#FF9500" />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Career Guidance</Text>
            <Text style={styles.featureDescription}>Tech career advice</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Questions */}
      <View style={styles.quickQuestions}>
        <Text style={styles.quickQuestionsTitle}>Quick Questions:</Text>
        <TouchableOpacity style={styles.quickQuestion}>
          <Text style={styles.quickQuestionText}>
            How do I start with React Native?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickQuestion}>
          <Text style={styles.quickQuestionText}>
            Explain async/await in JavaScript
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickQuestion}>
          <Text style={styles.quickQuestionText}>
            Best practices for API calls?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start Chat Button */}
      <TouchableOpacity style={styles.startChatButton}>
        <Ionicons name="chatbubbles" size={20} color="#FFFFFF" />
        <Text style={styles.startChatText}>Start Conversation</Text>
      </TouchableOpacity>
    </View>
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
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#007AFF",
  },
  content: {
    flex: 1,
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
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  storiesContainer: {
    paddingLeft: 20,
  },
  addStory: {
    alignItems: "center",
    marginRight: 16,
  },
  addStoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    position: "relative",
  },
  storyAvatar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  storyName: {
    fontSize: 12,
    color: "#333",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  onlineIndicatorSmall: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  messageCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 2,
    padding: 12,
  },
  messageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "600",
  },
  messageTime: {
    fontSize: 12,
    color: "#8E8E93",
  },
  messagePreview: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  suggestedCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  suggestedInfo: {
    flex: 1,
    marginLeft: 12,
  },
  suggestedName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  suggestedBio: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 4,
  },
  mutualSparks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  mutualText: {
    fontSize: 12,
    color: "#8E8E93",
  },
  sparkButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    gap: 4,
  },
  sparkButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  groupCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  groupMembers: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 4,
  },
  groupLastMessage: {
    fontSize: 13,
    color: "#333",
  },
  groupBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  groupBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  discoverCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  groupDescription: {
    fontSize: 13,
    color: "#8E8E93",
  },
  joinButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  sparkBotContainer: {
    padding: 20,
  },
  sparkBotHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  botAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  botName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  botStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  botStatusText: {
    fontSize: 14,
    color: "#34C759",
  },
  botFeatures: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  botFeaturesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  featureText: {
    marginLeft: 12,
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: "#8E8E93",
  },
  quickQuestions: {
    marginBottom: 24,
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  quickQuestion: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  quickQuestionText: {
    fontSize: 14,
    color: "#007AFF",
  },
  startChatButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startChatText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
