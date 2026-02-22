import { loginAction } from "@/actions/auth.actions";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((s) => s.login);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert("Error", "Introduce tu nombre de usuario y contraseña");
            return;
        }

        setLoading(true);
        try {
            const { user, isPremium } = await loginAction(username.trim(), password);
            await login(user, isPremium);
            router.replace("/(app)/(tabs)/home");
        } catch (error: any) {
            Alert.alert("Error", error.message ?? "No se pudo iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <KeyboardAvoidingView
                className="flex-1 justify-center px-8"
            >
                <View className="mb-12 items-center gap-2">
                    <Ionicons name="musical-notes" size={48} color="#1DB954" />
                    <Text className="text-4xl font-bold tracking-[1px] text-white">spotify</Text>
                    <Text className="text-sm text-[#B3B3B3]">Inicia sesión para continuar</Text>
                </View>

                <View className="gap-4">
                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <View className="mr-3">
                            <Ionicons name="person-outline" size={20} color="#B3B3B3" />
                        </View>
                        <TextInput
                            className="flex-1 text-[15px] text-white"
                            placeholder="Nombre de usuario"
                            placeholderTextColor="#535353"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <View className="mr-3">
                            <Ionicons name="lock-closed-outline" size={20} color="#B3B3B3" />
                        </View>
                        <TextInput
                            className="flex-1 text-[15px] text-white"
                            placeholder="Contraseña"
                            placeholderTextColor="#535353"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="p-1"
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#B3B3B3"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className={`mt-2 h-[52px] items-center justify-center rounded-full bg-[#1DB954] ${loading ? "opacity-60" : ""}`}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="#000000" />
                        ) : (
                            <Text className="text-base font-bold tracking-[0.5px] text-black">Iniciar sesión</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-10 flex-row justify-center">
                    <Text className="text-sm text-[#B3B3B3]">¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                        <Text className="text-sm font-semibold text-[#1DB954]"> Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
