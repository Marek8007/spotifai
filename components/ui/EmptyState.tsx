import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = "musical-notes-outline",
    message = "No hay elementos que mostrar",
}) => (
    <View className="flex-1 items-center justify-center gap-3 py-10">
        <Ionicons name={icon} size={48} color="#535353" />
        <Text className="text-center text-sm text-[#B3B3B3]">{message}</Text>
    </View>
);
