import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <View className="flex-1 items-center justify-center px-8">
                <Text className="mb-2 text-xl font-semibold text-white">Añadir</Text>
                <Text className="text-sm text-[#B3B3B3]">Pantalla en construcción</Text>
            </View>
        </SafeAreaView>
    );
}
