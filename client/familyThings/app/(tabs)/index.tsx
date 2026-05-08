import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Avatar } from "@/components/Avatar";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function HomeScreen() {
  const { agenda, currentUser, familyMembers, familyName, featuredSuggestion, reminders } = useFamilyData();

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.muted, fontSize: 15, fontWeight: "800" }}>{familyName}</Text>
          <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900", marginTop: 2 }}>
            Friday is nearly sorted.
          </Text>
        </View>
        <Avatar initials={currentUser?.name?.[0]?.toUpperCase() ?? "A"} color={colors.peach} />
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
        <AppButton label="Add event" onPress={() => router.push("/create-event")} style={{ flex: 1 }} />
        <AppButton label="Invite" variant="soft" onPress={() => router.push("/family-code")} style={{ flex: 1 }} />
      </View>

      <InfoCard style={{ marginTop: 24, backgroundColor: colors.ink }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.peach,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons name="sunny" color={colors.surface} size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.surface, fontSize: 18, fontWeight: "900" }}>Best next move</Text>
            <Text style={{ color: colors.peachSoft, marginTop: 4, lineHeight: 20 }}>
              {featuredSuggestion
                ? `Back ${featuredSuggestion.title.toLowerCase()} while the plan still lines up for everyone.`
                : "Pick the next small move and keep the week feeling light."}
            </Text>
          </View>
        </View>
      </InfoCard>

      <SectionHeader title="Today" action="View all" />
      <View style={{ gap: 10 }}>
        {agenda.map((item) => (
          <Pressable key={item.id} onPress={() => router.push({ pathname: "/event-detail", params: { id: item.id } })}>
            <InfoCard style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: item.tone, fontWeight: "900" }}>{item.time}</Text>
                <View style={{ width: 2, height: 42, backgroundColor: colors.line, marginTop: 8 }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.ink, fontSize: 17, fontWeight: "900" }}>{item.title}</Text>
                <Text style={{ color: colors.muted, marginTop: 4 }}>{item.detail}</Text>
              </View>
              <Ionicons name="chevron-forward" color={colors.faint} size={20} />
            </InfoCard>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Family pulse" />
      <View style={{ flexDirection: "row", gap: 10 }}>
        {familyMembers.map((member) => (
          <View key={member.name} style={{ flex: 1, alignItems: "center", gap: 8 }}>
            <Avatar initials={member.initials} color={member.color} size={48} />
            <Text numberOfLines={1} style={{ color: colors.ink, fontSize: 12, fontWeight: "800" }}>
              {member.name}
            </Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Needs attention" />
      <View style={{ gap: 10 }}>
        {reminders.slice(0, 2).map((item) => (
          <View
            key={item.title}
            style={{
              borderRadius: radii.lg,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12
            }}
          >
            <View style={{ width: 10, height: 42, borderRadius: 5, backgroundColor: item.tone }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontWeight: "900" }}>{item.title}</Text>
              <Text style={{ color: colors.muted, marginTop: 3 }}>{item.type} · {item.due}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionHeader title="Popular idea" />
      {featuredSuggestion ? (
        <Pressable onPress={() => router.push({ pathname: "/suggestion-detail", params: { id: featuredSuggestion.id } })}>
          <InfoCard>
            <Text style={{ color: featuredSuggestion.tone, fontWeight: "900" }}>{featuredSuggestion.tag}</Text>
            <Text style={{ color: colors.ink, fontSize: 22, fontWeight: "900", marginTop: 5 }}>{featuredSuggestion.title}</Text>
            <Text style={{ color: colors.muted, marginTop: 5 }}>{featuredSuggestion.meta}</Text>
          </InfoCard>
        </Pressable>
      ) : null}
    </Screen>
  );
}
