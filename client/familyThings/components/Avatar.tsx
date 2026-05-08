import { Text, View } from "react-native";
import { colors } from "@/constants/theme";

type AvatarProps = {
  initials: string;
  color: string;
  size?: number;
};

export function Avatar({ initials, color, size = 42 }: AvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: colors.surface, fontSize: size * 0.36, fontWeight: "800" }}>{initials}</Text>
    </View>
  );
}
