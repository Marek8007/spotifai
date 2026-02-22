import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#121212] px-8">
            <Text className="mb-4 text-xl font-semibold text-white">Registro</Text>
            <Text className="mb-8 text-center text-sm text-[#B3B3B3]">
                Pantalla pendiente de implementación.
            </Text>
            <Pressable
                className="rounded-full bg-[#1DB954] px-6 py-3"
                onPress={() => router.replace("/(auth)/login")}
            >
                <Text className="font-semibold text-black">Volver al login</Text>
            </Pressable>
        </SafeAreaView>
    );
}
