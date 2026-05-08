import { PropsWithChildren } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}>;

export function Screen({ children, scroll = true, style, contentStyle }: ScreenProps) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.paper }, style]} edges={["top"]}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ padding: 20, paddingBottom: 118 }, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, padding: 20 }, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
