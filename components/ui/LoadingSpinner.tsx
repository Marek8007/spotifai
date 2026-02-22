import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoadingSpinnerProps {
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => (
    <View className={fullScreen ? "flex-1 items-center justify-center bg-[#121212]" : "items-center justify-center py-8"}>
        <ActivityIndicator size="large" color="#1DB954" />
    </View>
);
