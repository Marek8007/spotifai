import { loginAction } from "@/actions/auth.actions";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = useAuthStore((s) => s.login);
    
    const performLogin = async (username: string, pwd: string) => {
        const { user, isPremium } = await loginAction(username, pwd);
        await login(user, isPremium);
        router.replace("/(drawer)/(tabs)/home");
    };

    const handleLogin = async () => {
        if (!name.trim() || !password.trim()) {
            Alert.alert("Error", "Introduce tu nombre y contraseña");
            return;
        }

        try {
            await performLogin(name.trim(), password);
        } catch (error: any) {
            Alert.alert("Error", error.message ?? "No se pudo iniciar sesión");
        }
    };

    const handleQuickLogin = async () => {
        try {
            await performLogin("antonio", "test");
        } catch (error: any) {
            Alert.alert("Error", error.message ?? "No se pudo iniciar sesión");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <Pressable
                className="absolute right-4 top-12 z-10 h-10 w-10 items-center justify-center rounded-md bg-[#282828]"
                onPress={handleQuickLogin}
            >
                <Ionicons name="fish-outline" size={18} color="#FFFFFF" />
            </Pressable>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                            placeholder="Nombre"
                            placeholderTextColor="#535353"
                            value={name}
                            onChangeText={setName}
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
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            className="p-1"
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#B3B3B3"
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        className="mt-2 h-[52px] items-center justify-center rounded-full bg-[#1DB954]"
                        onPress={handleLogin}
                    >
                        <Text className="text-base font-bold tracking-[0.5px] text-black">Iniciar sesión</Text>
                    </Pressable>
                </View>

                <View className="mt-10 flex-row justify-center">
                    <Text className="text-sm text-[#B3B3B3]">¿No tienes cuenta?</Text>
                    <Pressable onPress={() => router.push("/(auth)/register")}>
                        <Text className="text-sm font-semibold text-[#1DB954]"> Regístrate</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
