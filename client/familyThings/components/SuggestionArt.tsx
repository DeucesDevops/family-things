import { View } from "react-native";
import { colors, radii } from "@/constants/theme";

export function SuggestionArt({ tone, type }: { tone: string; type: string }) {
  return (
    <View
      style={{
        height: 112,
        borderRadius: radii.md,
        backgroundColor: tone,
        overflow: "hidden",
        marginBottom: 14
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 170,
          height: 170,
          borderRadius: 85,
          backgroundColor: "rgba(255,255,255,0.28)",
          right: -36,
          top: -48
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 92,
          height: 92,
          borderRadius: 46,
          backgroundColor: "rgba(255,255,255,0.22)",
          left: 20,
          bottom: -22
        }}
      />
      {type === "park" ? (
        <View style={{ position: "absolute", left: 40, bottom: 20, flexDirection: "row", gap: 12 }}>
          {[36, 52, 28].map((height, index) => (
            <View key={height} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: height,
                  height,
                  borderRadius: height / 2,
                  backgroundColor: colors.sageSoft
                }}
              />
              <View style={{ width: 5, height: 28 + index * 4, backgroundColor: "#80634E" }} />
            </View>
          ))}
        </View>
      ) : null}
      {type === "movie" ? (
        <View
          style={{
            position: "absolute",
            left: 34,
            bottom: 24,
            width: 92,
            height: 58,
            borderRadius: 10,
            backgroundColor: colors.plumSoft,
            borderWidth: 5,
            borderColor: colors.surface
          }}
        />
      ) : null}
      {type === "meal" ? (
        <View
          style={{
            position: "absolute",
            left: 44,
            bottom: 20,
            width: 78,
            height: 78,
            borderRadius: 39,
            backgroundColor: colors.surface,
            borderWidth: 12,
            borderColor: "#F6D68C"
          }}
        />
      ) : null}
    </View>
  );
}
