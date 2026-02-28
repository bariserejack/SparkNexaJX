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
import {supabase } from "./../lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithEmail() {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert("Login Failed", error.message);
      } else {
        router.replace("/(tabs)");
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
          <Text style={styles.logo}>⚡ SparkNexaJX</Text>
          <Text style={styles.tagline}>Ignite Your Tech Journey</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue learning</Text>

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
              placeholder="Enter your password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={signInWithEmail}
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

          <TouchableOpacity disabled={loading}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={signInWithEmail}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Ionicons name="logo-google" size={20} color="#DB4437" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <Ionicons name="logo-github" size={20} color="#333" />
            <Text style={styles.socialButtonText}>Continue with GitHub</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth/signup" as any)}
              disabled={loading}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
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
  forgotPassword: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#8E8E93",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  signupLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
