import { router } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Avatar } from "@/components/Avatar";
import { Screen } from "@/components/Screen";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function FamilySetupScreen() {
  const { familyMembers, familyName } = useFamilyData();

  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 36, lineHeight: 40, fontWeight: "900" }}>Create your family space</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
        Add a name now. You can invite everyone else after setup.
      </Text>
      <TextInput
        placeholder="Family name"
        defaultValue={familyName}
        placeholderTextColor={colors.faint}
        style={{
          minHeight: 58,
          borderRadius: radii.md,
          borderWidth: 1,
          borderColor: colors.line,
          backgroundColor: colors.surface,
          paddingHorizontal: 16,
          color: colors.ink,
          fontSize: 16,
          marginTop: 28
        }}
      />
      <View style={{ marginTop: 28 }}>
        <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "900" }}>Starter members</Text>
        <View style={{ flexDirection: "row", marginTop: 14 }}>
          {familyMembers.map((member, index) => (
            <View key={member.name} style={{ marginLeft: index === 0 ? 0 : -8, alignItems: "center" }}>
              <Avatar initials={member.initials} color={member.color} size={54} />
            </View>
          ))}
        </View>
      </View>
      <AppButton label="Finish setup" onPress={() => router.replace("/(tabs)")} style={{ marginTop: 36 }} />
      <AppButton label="I have an invite code" variant="ghost" onPress={() => router.push("/join-family")} style={{ marginTop: 12 }} />
    </Screen>
  );
}
