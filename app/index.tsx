import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";

export default function Index() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) {
        return <Redirect href="/(stack)" />;
    }

    return <Redirect href="/(auth)/login" />;
}
