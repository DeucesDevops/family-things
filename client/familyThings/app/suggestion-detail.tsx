import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { InfoCard } from "@/components/InfoCard";
import { Screen } from "@/components/Screen";
import { SuggestionArt } from "@/components/SuggestionArt";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function SuggestionDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { suggestions } = useFamilyData();
  const suggestion = suggestions.find((item) => item.id === id) ?? suggestions[0];

  if (!suggestion) {
    return (
      <Screen>
        <Text style={{ color: colors.ink, fontSize: 24, fontWeight: "900" }}>No suggestion selected</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={{ width: 44, height: 44, justifyContent: "center" }}>
        <Ionicons name="arrow-back" color={colors.ink} size={24} />
      </Pressable>
      <SuggestionArt tone={suggestion.tone} type={suggestion.image} />
      <Text style={{ color: suggestion.tone, fontWeight: "900", marginTop: 6 }}>{suggestion.tag}</Text>
      <Text style={{ color: colors.ink, fontSize: 38, lineHeight: 42, fontWeight: "900", marginTop: 6 }}>{suggestion.title}</Text>
      <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>{suggestion.meta}</Text>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
        {suggestion.meta.split("·").map((item) => (
          <View key={item} style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: radii.pill, backgroundColor: colors.surface }}>
            <Text style={{ color: colors.ink, fontWeight: "800" }}>{item.trim()}</Text>
          </View>
        ))}
      </View>

      <InfoCard style={{ marginTop: 22 }}>
        <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "900" }}>Why it fits</Text>
        <Text style={{ color: colors.muted, lineHeight: 22, marginTop: 8 }}>
          {suggestion.rationale}
        </Text>
      </InfoCard>

      <AppButton label="Vote for this" style={{ marginTop: 22 }} />
      <AppButton label="Turn into event" variant="ghost" onPress={() => router.push("/create-event")} style={{ marginTop: 12 }} />
    </Screen>
  );
}
