import { Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function CareScreen() {
  const { reminders, wishes } = useFamilyData();

  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900" }}>Care and wishes</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 8 }}>
        Grooming, birthdays, anniversaries, health tasks, and thoughtful words.
      </Text>

      <SectionHeader title="Upcoming reminders" />
      <View style={{ gap: 12 }}>
        {reminders.map((item) => (
          <InfoCard key={item.title} style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: `${item.tone}22`,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: item.tone }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontSize: 16, fontWeight: "900" }}>{item.title}</Text>
              <Text style={{ color: colors.muted, marginTop: 4 }}>{item.type} · {item.due}</Text>
            </View>
          </InfoCard>
        ))}
      </View>

      <SectionHeader title="Wish drafts" action="Generate" />
      <View style={{ gap: 10 }}>
        {wishes.map((wish, index) => (
          <View
            key={wish.id}
            style={{
              borderRadius: radii.lg,
              backgroundColor: index === 0 ? colors.peachSoft : colors.surface,
              borderWidth: 1,
              borderColor: colors.line,
              padding: 16
            }}
          >
            <Text style={{ color: colors.ink, fontSize: 15, lineHeight: 22, fontWeight: index === 0 ? "800" : "500" }}>
              {wish.message}
            </Text>
          </View>
        ))}
      </View>
      <AppButton label="Schedule a reminder" style={{ marginTop: 20 }} />
    </Screen>
  );
}
