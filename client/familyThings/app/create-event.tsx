import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Avatar } from "@/components/Avatar";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

const types = [
  { label: "Outing", icon: "map", color: colors.sage },
  { label: "Reminder", icon: "notifications", color: colors.peach },
  { label: "Holiday", icon: "airplane", color: colors.sky },
  { label: "Wish", icon: "heart", color: colors.plum }
] as const;

export default function CreateEventScreen() {
  const { familyMembers } = useFamilyData();

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={{ width: 44, height: 44, justifyContent: "center" }}>
        <Ionicons name="arrow-back" color={colors.ink} size={24} />
      </Pressable>
      <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900", marginTop: 10 }}>Create something</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 8 }}>
        Add an outing, task, holiday, or personal reminder to the shared family view.
      </Text>

      <SectionHeader title="Type" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {types.map((type, index) => (
          <View
            key={type.label}
            style={{
              width: "48%",
              borderRadius: radii.lg,
              backgroundColor: index === 0 ? colors.ink : colors.surface,
              borderWidth: 1,
              borderColor: index === 0 ? colors.ink : colors.line,
              padding: 16,
              gap: 12
            }}
          >
            <Ionicons name={type.icon} color={index === 0 ? colors.surface : type.color} size={24} />
            <Text style={{ color: index === 0 ? colors.surface : colors.ink, fontSize: 16, fontWeight: "900" }}>{type.label}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Details" />
      <View style={{ gap: 12 }}>
        <TextInput
          defaultValue="Greenwich picnic trail"
          placeholder="Title"
          placeholderTextColor={colors.faint}
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
          defaultValue="Pack a blanket, fruit, and Kofi's scooter."
          multiline
          placeholder="Notes"
          placeholderTextColor={colors.faint}
          style={{
            minHeight: 112,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor: colors.line,
            backgroundColor: colors.surface,
            padding: 16,
            color: colors.ink,
            fontSize: 16,
            textAlignVertical: "top"
          }}
        />
      </View>

      <SectionHeader title="Invite" />
      <InfoCard>
        <View style={{ flexDirection: "row" }}>
          {familyMembers.map((member, index) => (
            <View key={member.name} style={{ marginLeft: index === 0 ? 0 : -8 }}>
              <Avatar initials={member.initials} color={member.color} />
            </View>
          ))}
        </View>
        <Text style={{ color: colors.muted, marginTop: 12 }}>All family members can vote and comment.</Text>
      </InfoCard>

      <AppButton label="Add to family calendar" onPress={() => router.replace("/event-detail")} style={{ marginTop: 24 }} />
    </Screen>
  );
}
