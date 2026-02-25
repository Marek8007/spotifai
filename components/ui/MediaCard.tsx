import { Ionicons } from "@expo/vector-icons";
import { getRandomMediaImage } from "@/constants/randomMediaImages";
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
    isPlusFilled?: boolean;
    showChevron?: boolean;
    compact?: boolean;
}

export function MediaCard({
    title,
    subtitle,
    imageUrl,
    type,
    onPress,
    onPlusPress,
    isPlusFilled = false,
    showChevron = true,
    compact = false,
}: MediaCardProps) {
    const randomImage = getRandomMediaImage();
    const imageSource = randomImage;

    if (compact) {
        return (
            <Pressable onPress={onPress} className="flex-row items-center px-4 py-2">
                {imageSource ? (
                    <Image source={imageSource} className="mr-3 h-[50px] w-[50px] rounded bg-[#282828]" />
                ) : (
                    <View className="mr-3 h-[50px] w-[50px] rounded bg-[#282828]" />
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
                        <Ionicons
                            name={isPlusFilled ? "add-circle" : "add-circle-outline"}
                            size={24}
                            color={isPlusFilled ? "#1DB954" : "#B3B3B3"}
                        />
                    </Pressable>
                )}

                {showChevron && <Ionicons name="chevron-forward" size={16} color="#535353" />}
            </Pressable>
        );
    }

    return (
        <Pressable onPress={onPress} className="mr-4 w-[140px]">
            {imageSource ? (
                <Image source={imageSource} className="mb-2 h-[140px] w-[140px] rounded-lg bg-[#282828]" />
            ) : (
                <View className="mb-2 h-[140px] w-[140px] rounded-lg bg-[#282828]" />
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
}
