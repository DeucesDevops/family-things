import { Text, View } from "react-native";
import { colors } from "@/constants/theme";

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={{ marginTop: 28, marginBottom: 12, flexDirection: "row", alignItems: "center" }}>
      <Text style={{ flex: 1, color: colors.ink, fontSize: 20, fontWeight: "900" }}>{title}</Text>
      {action ? <Text style={{ color: colors.peach, fontWeight: "800" }}>{action}</Text> : null}
    </View>
  );
}
