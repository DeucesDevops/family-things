import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { AppButton } from "@/components/AppButton";
import { Screen } from "@/components/Screen";
import { colors, radii } from "@/constants/theme";
import { useFamilyData } from "@/providers/family-data";

export default function FamilyCodeScreen() {
  const { familyName, inviteCode } = useFamilyData();

  return (
    <Screen scroll={false} contentStyle={{ justifyContent: "space-between" }}>
      <View>
        <Pressable onPress={() => router.back()} style={{ width: 44, height: 44, justifyContent: "center" }}>
          <Ionicons name="arrow-back" color={colors.ink} size={24} />
        </Pressable>
        <Text style={{ color: colors.ink, fontSize: 36, lineHeight: 40, fontWeight: "900", marginTop: 16 }}>Share your family code</Text>
        <Text style={{ color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10 }}>
          Send this to family members you want in the shared space.
        </Text>
      </View>

      <View
        style={{
          borderRadius: 34,
          backgroundColor: colors.ink,
          padding: 28,
          alignItems: "center",
          gap: 18
        }}
      >
        <Text style={{ color: colors.peachSoft, fontWeight: "900" }}>{familyName}</Text>
        <Text style={{ color: colors.surface, fontSize: 54, fontWeight: "900", letterSpacing: 0 }}>{inviteCode}</Text>
        <View
          style={{
            width: 148,
            height: 148,
            borderRadius: radii.lg,
            backgroundColor: colors.surface,
            padding: 14,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8
          }}
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <View
              key={index}
              style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                backgroundColor: index % 3 === 0 ? colors.ink : colors.peach
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ gap: 12, paddingBottom: 20 }}>
        <AppButton label="Share invite" />
        <AppButton label="Done" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
