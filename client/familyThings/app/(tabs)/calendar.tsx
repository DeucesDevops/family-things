import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function CalendarScreen() {
  const { agenda, calendarDays } = useFamilyData();
  const activeDay = agenda[0]
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" }).format(new Date(agenda[0].startsAt))
    : "This week";

  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900" }}>Family calendar</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 8 }}>
        Shared events, care reminders, holidays, and plans in one place.
      </Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 24 }}>
        {calendarDays.map((item) => (
          <View
            key={item.date}
            style={{
              flex: 1,
              minHeight: 92,
              borderRadius: radii.md,
              backgroundColor: item.active ? colors.ink : colors.surface,
              borderWidth: 1,
              borderColor: item.active ? colors.ink : colors.line,
              alignItems: "center",
              justifyContent: "center",
              gap: 5
            }}
          >
            <Text style={{ color: item.active ? colors.surface : colors.muted, fontSize: 12, fontWeight: "800" }}>{item.day}</Text>
            <Text style={{ color: item.active ? colors.surface : colors.ink, fontSize: 18, fontWeight: "900" }}>{item.date}</Text>
            <View style={{ flexDirection: "row", gap: 3, height: 7 }}>
              {item.dots.map((dot) => (
                <View key={dot} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dot }} />
              ))}
            </View>
          </View>
        ))}
      </View>

      <SectionHeader title={activeDay} action="+ Event" />
      <View style={{ gap: 12 }}>
        {agenda.map((item) => (
          <Pressable key={item.id} onPress={() => router.push({ pathname: "/event-detail", params: { id: item.id } })}>
            <InfoCard style={{ flexDirection: "row", gap: 14 }}>
              <View style={{ width: 9, borderRadius: 5, backgroundColor: item.tone }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.muted, fontWeight: "800" }}>{item.time}</Text>
                <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "900", marginTop: 3 }}>{item.title}</Text>
                <Text style={{ color: colors.muted, marginTop: 4, lineHeight: 20 }}>{item.detail}</Text>
              </View>
            </InfoCard>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
