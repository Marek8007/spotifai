import { useAuthStore } from "@/stores/authStore";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#121212] px-8">
            <Text className="mb-2 text-xl font-semibold text-white">Inicio</Text>
            <Text className="mb-8 text-sm text-[#B3B3B3]">
                {user ? `Bienvenido, ${user.nombre}` : "Sesión iniciada"}
            </Text>
            <Pressable className="rounded-full bg-[#1DB954] px-6 py-3" onPress={logout}>
                <Text className="font-semibold text-black">Cerrar sesión</Text>
            </Pressable>
        </SafeAreaView>
    );
}
