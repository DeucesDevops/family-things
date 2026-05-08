import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function SignInScreen() {
  const { error, isLoading, signIn, signInDemo } = useFamilyData();
  const [email, setEmail] = useState("demo@familythings.local");
  const [password, setPassword] = useState("password123");

  async function handleSignIn() {
    const signedIn = await signIn(email, password);
    if (signedIn) {
      router.replace("/(tabs)");
    }
  }

  async function handleDemoSignIn() {
    const signedIn = await signInDemo();
    if (signedIn) {
      router.replace("/(tabs)");
    }
  }

  return (
    <Screen contentStyle={{ paddingTop: 30 }}>
      <Text style={{ color: colors.ink, fontSize: 38, lineHeight: 42, fontWeight: "900" }}>Welcome back</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
        Sign in to see what your family has added since you last checked.
      </Text>

      <View style={{ gap: 14, marginTop: 34 }}>
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.faint}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            minHeight: 58,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            color: colors.ink,
            fontSize: 16
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.faint}
          secureTextEntry
          style={{
            minHeight: 58,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            paddingHorizontal: 16,
            color: colors.ink,
            fontSize: 16
          }}
        />
      </View>

      {error ? (
        <Text style={{ color: colors.peach, lineHeight: 20, marginTop: 16 }}>{error}</Text>
      ) : null}

      <AppButton label={isLoading ? "Signing in..." : "Sign in"} onPress={handleSignIn} style={{ marginTop: 24 }} />
      <AppButton label={isLoading ? "Loading demo..." : "Use demo data instead"} variant="soft" onPress={handleDemoSignIn} style={{ marginTop: 12 }} />
      <AppButton label="Join with family code" variant="ghost" onPress={() => router.push("/join-family")} style={{ marginTop: 12 }} />
    </Screen>
  );
}
