import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MediaType = "playlist" | "artista" | "album" | "podcast" | "cancion";

export interface MediaCardProps {
    id: number;
    title: string;
    subtitle?: string;
    imageUrl?: string;
    type: MediaType;
    onPress?: () => void;
    onPlusPress?: () => void; // Solo para canciones en búsqueda
    compact?: boolean; // Vista compacta (lista vertical)
}

export const MediaCard: React.FC<MediaCardProps> = ({
    title,
    subtitle,
    imageUrl,
    type,
    onPress,
    onPlusPress,
    compact = false,
}) => {
    const getIcon = (): keyof typeof Ionicons.glyphMap => {
        switch (type) {
            case "playlist": return "musical-notes";
            case "artista": return "person";
            case "album": return "disc";
            case "podcast": return "mic";
            case "cancion": return "musical-note";
        }
    };

    if (compact) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.compactContainer}
                activeOpacity={0.7}
            >
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.compactImage} />
                ) : (
                    <View style={[styles.compactImage, styles.placeholder]}>
                        <Ionicons name={getIcon()} size={20} color="#B3B3B3" />
                    </View>
                )}
                <View style={styles.compactTextContainer}>
                    <Text style={styles.compactTitle} numberOfLines={1}>{title}</Text>
                    {subtitle && (
                        <Text style={styles.compactSubtitle} numberOfLines={1}>{subtitle}</Text>
                    )}
                </View>
                {type === "cancion" && onPlusPress && (
                    <TouchableOpacity onPress={onPlusPress} style={styles.plusButton}>
                        <Ionicons name="add-circle-outline" size={24} color="#B3B3B3" />
                    </TouchableOpacity>
                )}
                <Ionicons name="chevron-forward" size={16} color="#535353" />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.cardContainer}
            activeOpacity={0.7}
        >
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
            ) : (
                <View style={[styles.cardImage, styles.placeholder]}>
                    <Ionicons name={getIcon()} size={32} color="#B3B3B3" />
                </View>
            )}
            <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
            {subtitle && (
                <Text style={styles.cardSubtitle} numberOfLines={1}>{subtitle}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Tarjeta vertical (para listas horizontales)
    cardContainer: {
        width: 140,
        marginRight: 16,
    },
    cardImage: {
        width: 140,
        height: 140,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#282828",
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    cardSubtitle: {
        color: "#B3B3B3",
        fontSize: 12,
        marginTop: 2,
    },
    // Fila compacta (para listas verticales)
    compactContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    compactImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: "#282828",
    },
    compactTextContainer: {
        flex: 1,
    },
    compactTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "500",
    },
    compactSubtitle: {
        color: "#B3B3B3",
        fontSize: 13,
        marginTop: 2,
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    plusButton: {
        marginRight: 8,
        padding: 4,
    },
});
