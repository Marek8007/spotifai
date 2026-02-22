import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = "musical-notes-outline",
    message = "No hay elementos que mostrar",
}) => (
    <View style={styles.container}>
        <Ionicons name={icon} size={48} color="#535353" />
        <Text style={styles.text}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        gap: 12,
    },
    text: {
        color: "#B3B3B3",
        fontSize: 14,
        textAlign: "center",
    },
});
