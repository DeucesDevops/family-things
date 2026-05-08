import { Pressable, Text, ViewStyle } from "react-native";
import { colors, radii } from "@/constants/theme";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "ghost" | "soft";
  style?: ViewStyle;
};

export function AppButton({ label, onPress, variant = "primary", style }: AppButtonProps) {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 52,
          borderRadius: radii.pill,
          paddingHorizontal: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isPrimary ? colors.ink : isGhost ? "transparent" : colors.peachSoft,
          borderWidth: isGhost ? 1 : 0,
          borderColor: colors.line,
          opacity: pressed ? 0.72 : 1
        },
        style
      ]}
    >
      <Text
        style={{
          color: isPrimary ? colors.surface : colors.ink,
          fontWeight: "800",
          fontSize: 15
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
