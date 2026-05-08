import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { colors } from "@/constants/theme";

const roles = [
  { title: "Parent or guardian", detail: "Create groups, approve plans, manage reminders.", color: colors.peach },
  { title: "Family member", detail: "Join a shared calendar, vote, and add wishes.", color: colors.sky },
  { title: "Care helper", detail: "See assigned events and care tasks only.", color: colors.sage }
];

export default function RoleSelectionScreen() {
  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 36, lineHeight: 40, fontWeight: "900" }}>How do you fit in?</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
        We will tune permissions and reminders around your role.
      </Text>
      <View style={{ gap: 12, marginTop: 28 }}>
        {roles.map((role) => (
          <Pressable key={role.title} onPress={() => router.push("/family-setup")}>
            <InfoCard style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <View style={{ width: 12, height: 58, borderRadius: 6, backgroundColor: role.color }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.ink, fontSize: 17, fontWeight: "900" }}>{role.title}</Text>
                <Text style={{ color: colors.muted, lineHeight: 20, marginTop: 4 }}>{role.detail}</Text>
              </View>
            </InfoCard>
          </Pressable>
        ))}
      </View>
      <AppButton label="Continue" onPress={() => router.push("/family-setup")} style={{ marginTop: 24 }} />
    </Screen>
  );
}
