import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { colors, radii } from "@/constants/theme";

export default function JoinFamilyScreen() {
  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 36, lineHeight: 40, fontWeight: "900" }}>Join a family</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
        Enter the private code from your family admin.
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 34 }}>
        {["F", "T", "2", "8"].map((char) => (
          <TextInput
            key={char}
            defaultValue={char}
            maxLength={1}
            textAlign="center"
            style={{
              flex: 1,
              minHeight: 70,
              borderRadius: radii.md,
              borderWidth: 1,
              borderColor: colors.line,
              backgroundColor: colors.surface,
              color: colors.ink,
              fontSize: 28,
              fontWeight: "900"
            }}
          />
        ))}
      </View>
      <AppButton label="Join Boateng home" onPress={() => router.replace("/(tabs)")} style={{ marginTop: 28 }} />
    </Screen>
  );
}
