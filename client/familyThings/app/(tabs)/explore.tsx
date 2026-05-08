import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { SuggestionArt } from "@/components/SuggestionArt";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function ExploreScreen() {
  const { suggestions } = useFamilyData();

  return (
    <Screen>
      <Text style={{ color: colors.ink, fontSize: 34, lineHeight: 38, fontWeight: "900" }}>Ideas everyone can vote on</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 8 }}>
        Weather, location, budget, and family preferences folded into practical suggestions.
      </Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 22 }}>
        {["Nearby", "Weekend", "Low cost"].map((filter, index) => (
          <View
            key={filter}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: radii.pill,
              backgroundColor: index === 0 ? colors.ink : colors.surface,
              borderWidth: 1,
              borderColor: index === 0 ? colors.ink : colors.line
            }}
          >
            <Text style={{ color: index === 0 ? colors.surface : colors.ink, fontWeight: "800" }}>{filter}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="Suggested plans" />
      <View style={{ gap: 14 }}>
        {suggestions.map((item) => (
          <Pressable key={item.id} onPress={() => router.push({ pathname: "/suggestion-detail", params: { id: item.id } })}>
            <InfoCard>
              <SuggestionArt tone={item.tone} type={item.image} />
              <Text style={{ color: item.tone, fontWeight: "900" }}>{item.tag}</Text>
              <Text style={{ color: colors.ink, fontSize: 22, fontWeight: "900", marginTop: 4 }}>{item.title}</Text>
              <Text style={{ color: colors.muted, marginTop: 5 }}>{item.meta}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 14 }}>
                <Text style={{ flex: 1, color: colors.ink, fontWeight: "800" }}>{item.votes} family votes</Text>
                <AppButton label="Vote" variant="soft" style={{ minHeight: 42, paddingHorizontal: 18 }} />
              </View>
            </InfoCard>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
