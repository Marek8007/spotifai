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
    StyleSheet,
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
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inner}
            >
                {/* Logo / Título */}
                <View style={styles.header}>
                    <Ionicons name="musical-notes" size={48} color="#1DB954" />
                    <Text style={styles.appName}>spotify</Text>
                    <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
                </View>

                {/* Formulario */}
                <View style={styles.form}>
                    {/* Nombre de usuario */}
                    <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#B3B3B3" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            placeholderTextColor="#535353"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Contraseña */}
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#B3B3B3" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#535353"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#B3B3B3"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Botón login */}
                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="#000000" />
                        ) : (
                            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Ir a Registro */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                        <Text style={styles.registerLink}> Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 32,
    },
    header: {
        alignItems: "center",
        marginBottom: 48,
        gap: 8,
    },
    appName: {
        fontSize: 32,
        fontWeight: "700",
        color: "#FFFFFF",
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        color: "#B3B3B3",
    },
    form: {
        gap: 16,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#282828",
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 52,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 15,
    },
    eyeIcon: {
        padding: 4,
    },
    loginButton: {
        backgroundColor: "#1DB954",
        borderRadius: 30,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },
    footerText: {
        color: "#B3B3B3",
        fontSize: 14,
    },
    registerLink: {
        color: "#1DB954",
        fontSize: 14,
        fontWeight: "600",
    },
});
