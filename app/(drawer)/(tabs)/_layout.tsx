import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#121212",
                    borderTopColor: "#282828",
                    height: 64,
                    paddingTop: 6,
                    paddingBottom: 8,
                    marginBottom: 6,
                },
                tabBarActiveTintColor: "#1DB954",
                tabBarInactiveTintColor: "#B3B3B3",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search/index"
                options={{
                    title: "Buscar",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="library/index"
                options={{
                    title: "Biblioteca",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="library-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add/index"
                options={{
                    title: "Añadir",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
