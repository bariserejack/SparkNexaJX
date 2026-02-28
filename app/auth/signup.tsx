import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "./../lib/supabase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function signUpWithEmail() {
    // Validation
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        Alert.alert("Signup Failed", error.message);
      } else {
        Alert.alert(
          "Success!",
          "Account created successfully! Please check your email to verify your account.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/auth/login" as any),
            },
          ],
        );
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.logo}>⚡ SparkNexaJX</Text>
          <Text style={styles.tagline}>Join the Community</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your learning journey today</Text>

          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#8E8E93"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#8E8E93"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
              editable={!loading}
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8E8E93"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              editable={!loading}
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8E8E93"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Min 6 characters"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              textContentType="newPassword"
              returnKeyType="next"
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8E8E93"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#8E8E93"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="password"
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={signUpWithEmail}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.signupButton,
              loading && styles.signupButtonDisabled,
            ]}
            onPress={signUpWithEmail}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.signupButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()} disabled={loading}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#007AFF",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 60,
    zIndex: 10,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  form: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#000",
  },
  signupButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  loginLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
