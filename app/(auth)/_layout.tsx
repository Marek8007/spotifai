import { useAuthStore } from "@/stores/authStore";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(drawer)/(tabs)/home");
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
