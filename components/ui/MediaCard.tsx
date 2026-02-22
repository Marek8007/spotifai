import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export type MediaType = "playlist" | "artista" | "album" | "podcast" | "cancion";

export interface MediaCardProps {
    id: number;
    title: string;
    subtitle?: string;
    imageUrl?: string;
    type: MediaType;
    onPress?: () => void;
    onPlusPress?: () => void;
    compact?: boolean;
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
            case "playlist":
                return "musical-notes";
            case "artista":
                return "person";
            case "album":
                return "disc";
            case "podcast":
                return "mic";
            case "cancion":
                return "musical-note";
        }
    };

    if (compact) {
        return (
            <Pressable onPress={onPress} className="flex-row items-center px-4 py-2">
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} className="mr-3 h-[50px] w-[50px] rounded bg-[#282828]" />
                ) : (
                    <View className="mr-3 h-[50px] w-[50px] items-center justify-center rounded bg-[#282828]">
                        <Ionicons name={getIcon()} size={20} color="#B3B3B3" />
                    </View>
                )}

                <View className="flex-1">
                    <Text className="text-[15px] font-medium text-white" numberOfLines={1}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text className="mt-0.5 text-[13px] text-[#B3B3B3]" numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {type === "cancion" && onPlusPress && (
                    <Pressable onPress={onPlusPress} className="mr-2 p-1">
                        <Ionicons name="add-circle-outline" size={24} color="#B3B3B3" />
                    </Pressable>
                )}

                <Ionicons name="chevron-forward" size={16} color="#535353" />
            </Pressable>
        );
    }

    return (
        <Pressable onPress={onPress} className="mr-4 w-[140px]">
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} className="mb-2 h-[140px] w-[140px] rounded-lg bg-[#282828]" />
            ) : (
                <View className="mb-2 h-[140px] w-[140px] items-center justify-center rounded-lg bg-[#282828]">
                    <Ionicons name={getIcon()} size={32} color="#B3B3B3" />
                </View>
            )}

            <Text className="text-sm font-semibold text-white" numberOfLines={2}>
                {title}
            </Text>
            {subtitle && (
                <Text className="mt-0.5 text-xs text-[#B3B3B3]" numberOfLines={1}>
                    {subtitle}
                </Text>
            )}
        </Pressable>
    );
};
