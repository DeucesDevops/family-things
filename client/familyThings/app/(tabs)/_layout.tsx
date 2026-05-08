import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.peach,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: {
          height: 82,
          paddingTop: 8,
          paddingBottom: 18,
          backgroundColor: colors.surface,
          borderTopColor: colors.line
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "800"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Ideas",
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: "Care",
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Family",
          tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
