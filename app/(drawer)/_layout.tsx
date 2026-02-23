import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: false }}>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: "Inicio",
                    drawerLabel: "Inicio",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}
