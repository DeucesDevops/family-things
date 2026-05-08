import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { colors, radii, shadow } from "@/constants/theme";

type InfoCardProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export function InfoCard({ children, style }: InfoCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: colors.line,
          padding: 16
        },
        shadow,
        style
      ]}
    >
      {children}
    </View>
  );
}
