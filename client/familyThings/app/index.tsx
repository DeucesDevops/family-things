import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function WelcomeScreen() {
  const { error, isLoading, signInDemo } = useFamilyData();

  async function handleDemoEntry() {
    const signedIn = await signInDemo();
    if (signedIn) {
      router.replace("/(tabs)");
    }
  }

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "space-between" }}>
      <View style={{ paddingTop: 18 }}>
        <Text style={{ color: colors.peach, fontSize: 16, fontWeight: "900" }}>Family Things</Text>
        <Text style={{ color: colors.ink, fontSize: 48, lineHeight: 52, fontWeight: "900", marginTop: 18 }}>
          {"Everyone's week, gently held together."}
        </Text>
        <Text style={{ color: colors.muted, fontSize: 17, lineHeight: 25, marginTop: 18 }}>
          Plan outings, remember care tasks, send thoughtful wishes, and keep the family calendar in sync.
        </Text>
      </View>

      <View
        style={{
          height: 270,
          borderRadius: 32,
          backgroundColor: colors.ink,
          padding: 22,
          overflow: "hidden",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: colors.surface, fontSize: 16, fontWeight: "800" }}>Today</Text>
          <Text style={{ color: colors.peachSoft, fontWeight: "800" }}>4 people synced</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-end" }}>
          {[120, 78, 148, 98].map((height, index) => (
            <View
              key={height}
              style={{
                flex: 1,
                height,
                borderRadius: radii.md,
                backgroundColor: [colors.peach, colors.sage, colors.sky, colors.gold][index]
              }}
            />
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["Outing", "Birthday", "Grooming"].map((item) => (
            <Text key={item} style={{ color: colors.surface, fontWeight: "800" }}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      <View style={{ gap: 12, paddingBottom: 10 }}>
        <AppButton label="Create my family space" onPress={() => router.push("/role-selection")} />
        <AppButton label={isLoading ? "Opening demo household..." : "Explore demo household"} variant="soft" onPress={handleDemoEntry} />
        <Pressable onPress={() => router.push("/sign-in")} style={{ alignItems: "center", padding: 12 }}>
          <Text style={{ color: colors.ink, fontWeight: "800" }}>I already have an account</Text>
        </Pressable>
        {error ? (
          <Text style={{ color: colors.peach, textAlign: "center", lineHeight: 20 }}>
            {error}
          </Text>
        ) : null}
      </View>
    </Screen>
  );
}
