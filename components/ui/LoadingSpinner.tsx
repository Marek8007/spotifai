import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
        <ActivityIndicator size="large" color="#1DB954" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 32,
    },
    fullScreen: {
        flex: 1,
        backgroundColor: "#121212",
    },
});
