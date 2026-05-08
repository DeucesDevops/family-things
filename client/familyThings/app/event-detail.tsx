import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Avatar } from "@/components/Avatar";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { agenda, familyMembers } = useFamilyData();
  const event = agenda.find((item) => item.id === id) ?? agenda[0];

  if (!event) {
    return (
      <Screen>
        <Text style={{ color: colors.ink, fontSize: 24, fontWeight: "900" }}>No event selected</Text>
      </Screen>
    );
  }

  const eventDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(event.startsAt));

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={{ width: 44, height: 44, justifyContent: "center" }}>
        <Ionicons name="arrow-back" color={colors.ink} size={24} />
      </Pressable>
      <Text style={{ color: colors.peach, fontWeight: "900", marginTop: 12 }}>{eventDate}</Text>
      <Text style={{ color: colors.ink, fontSize: 38, lineHeight: 42, fontWeight: "900", marginTop: 6 }}>{event.title}</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
        {event.detail}
      </Text>

      <InfoCard style={{ marginTop: 24 }}>
        <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "900" }}>Plan notes</Text>
        <Text style={{ color: colors.muted, lineHeight: 22, marginTop: 8 }}>
          {event.detail}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 16 }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.sage,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons name="person" color={colors.surface} size={14} />
          </View>
          <Text style={{ color: colors.ink, fontWeight: "800" }}>Added by {event.createdBy}</Text>
        </View>
      </InfoCard>

      <SectionHeader title="People" />
      <View style={{ gap: 10 }}>
        {familyMembers.map((member) => (
          <View key={member.name} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Avatar initials={member.initials} color={member.color} size={40} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontWeight: "900" }}>{member.name}</Text>
              <Text style={{ color: colors.muted, marginTop: 2 }}>{member.role}</Text>
            </View>
            <Text style={{ color: colors.sage, fontWeight: "900" }}>Included</Text>
          </View>
        ))}
      </View>

      <AppButton label="Mark as handled" style={{ marginTop: 26 }} />
    </Screen>
  );
}
