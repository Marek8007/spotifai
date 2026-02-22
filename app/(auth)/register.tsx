import { registerAction } from "@/actions/auth.actions";
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

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const isEmailValid = (value: string) => /.+@.+\..+/.test(value);
    const isDateValid = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

    const handleRegister = async () => {
        if (!username.trim() || !email.trim() || !password.trim() || !fechaNacimiento.trim()) {
            Alert.alert("Error", "Completa todos los campos obligatorios");
            return;
        }

        if (!isEmailValid(email.trim())) {
            Alert.alert("Error", "Introduce un email válido");
            return;
        }

        if (!isDateValid(fechaNacimiento.trim())) {
            Alert.alert("Error", "Fecha inválida. Usa formato YYYY-MM-DD");
            return;
        }

        try {
            await registerAction({
                username: username.trim(),
                email: email.trim(),
                password,
                fechaNacimiento: fechaNacimiento.trim(),
                genero: null,
                pais: null,
                codigoPostal: null,
            });

            Alert.alert("Registro completado", "Ya puedes iniciar sesión", [
                { text: "Ir al login", onPress: () => router.replace("/(auth)/login") },
            ]);
        } catch (error: any) {
            Alert.alert("Error", error?.response?.data ?? "No se pudo registrar el usuario");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-8"
            >
                <View className="mb-10 items-center gap-2">
                    <Ionicons name="person-add-outline" size={44} color="#1DB954" />
                    <Text className="text-3xl font-bold text-white">Crear cuenta</Text>
                    <Text className="text-sm text-[#B3B3B3]">Regístrate para continuar</Text>
                </View>

                <View className="gap-3">
                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <Ionicons name="person-outline" size={20} color="#B3B3B3" />
                        <TextInput
                            className="ml-3 flex-1 text-[15px] text-white"
                            placeholder="Nombre de usuario"
                            placeholderTextColor="#535353"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <Ionicons name="mail-outline" size={20} color="#B3B3B3" />
                        <TextInput
                            className="ml-3 flex-1 text-[15px] text-white"
                            placeholder="Email"
                            placeholderTextColor="#535353"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <Ionicons name="lock-closed-outline" size={20} color="#B3B3B3" />
                        <TextInput
                            className="ml-3 flex-1 text-[15px] text-white"
                            placeholder="Contraseña"
                            placeholderTextColor="#535353"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <View className="h-[52px] flex-row items-center rounded-lg bg-[#282828] px-4">
                        <Ionicons name="calendar-outline" size={20} color="#B3B3B3" />
                        <TextInput
                            className="ml-3 flex-1 text-[15px] text-white"
                            placeholder="Fecha nacimiento (YYYY-MM-DD)"
                            placeholderTextColor="#535353"
                            value={fechaNacimiento}
                            onChangeText={setFechaNacimiento}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <Pressable
                        className="mt-2 h-[52px] items-center justify-center rounded-full bg-[#1DB954]"
                        onPress={handleRegister}
                    >
                        <Text className="text-base font-bold text-black">Registrarme</Text>
                    </Pressable>
                </View>

                <View className="mt-8 flex-row justify-center">
                    <Text className="text-sm text-[#B3B3B3]">¿Ya tienes cuenta?</Text>
                    <Pressable onPress={() => router.replace("/(auth)/login")}>
                        <Text className="text-sm font-semibold text-[#1DB954]"> Inicia sesión</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
