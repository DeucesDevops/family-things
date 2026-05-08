import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Avatar } from "@/components/Avatar";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function ProfileScreen() {
  const { familyMembers, familyName, inviteCode, isLoading, refresh, source } = useFamilyData();

  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900" }}>Family settings</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 8 }}>
        Manage members, invites, preferences, and notification rhythm.
      </Text>

      <InfoCard style={{ marginTop: 22, backgroundColor: colors.ink }}>
        <Text style={{ color: colors.peachSoft, fontWeight: "900" }}>Invite code</Text>
        <Text style={{ color: colors.peachSoft, marginTop: 8 }}>
          {source === "api" ? "Connected to Docker demo data" : "Showing local fallback data"}
        </Text>
        <Text style={{ color: colors.surface, fontSize: 38, letterSpacing: 0, fontWeight: "900", marginTop: 6 }}>{inviteCode}</Text>
        <AppButton label="Share code" variant="soft" onPress={() => router.push("/family-code")} style={{ marginTop: 16 }} />
      </InfoCard>

      <Text style={{ color: colors.muted, marginTop: 16 }}>{familyName}</Text>
      <SectionHeader title="Members" action="Add" />
      <View style={{ gap: 12 }}>
        {familyMembers.map((member) => (
          <InfoCard key={member.name} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Avatar initials={member.initials} color={member.color} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontSize: 17, fontWeight: "900" }}>{member.name}</Text>
              <Text style={{ color: colors.muted, marginTop: 3 }}>{member.role}</Text>
            </View>
          </InfoCard>
        ))}
      </View>

      <SectionHeader title="Preferences" />
      {["Weather-aware outing ideas", "Birthday wish drafts", "Grooming reminder cycle", "Shared family calendar"].map((item) => (
        <Pressable key={item}>
          <View style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Text style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}>{item}</Text>
          </View>
        </Pressable>
      ))}
      <AppButton label={isLoading ? "Refreshing..." : "Refresh from backend"} variant="soft" onPress={refresh} style={{ marginTop: 24 }} />
    </Screen>
  );
}
