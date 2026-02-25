import { MediaCard } from "@/components/ui/MediaCard";
import { useSearchRoute } from "@/hooks/useSearchRoute";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    const search = useSearchRoute();

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <View className="px-4 pb-3 pt-4">
                <Text className="mb-3 text-2xl font-bold text-white">Buscar</Text>
                <TextInput
                    className="h-[50px] rounded-lg bg-[#282828] px-4 text-white"
                    placeholder="Busca playlists, artistas, álbumes..."
                    placeholderTextColor="#B3B3B3"
                    value={search.query}
                    onChangeText={search.setQuery}
                />
            </View>

            {search.showInitialButtons ? (
                <View className="flex-1 px-4 pt-2">
                    <View className="mb-3 flex-row gap-3">
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#8D67AB] px-5"
                            onPress={search.openPlaylists}
                        >
                            <Text className="text-base font-semibold text-white">Playlists</Text>
                        </Pressable>
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#27856A] px-5"
                            onPress={search.openPodcasts}
                        >
                            <Text className="text-base font-semibold text-white">Podcasts</Text>
                        </Pressable>
                    </View>

                    <View className="flex-row gap-3">
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#E8115B] px-5"
                            onPress={search.openArtists}
                        >
                            <Text className="text-base font-semibold text-white">Artistas</Text>
                        </Pressable>
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#509BF5] px-5"
                            onPress={search.openAlbums}
                        >
                            <Text className="text-base font-semibold text-white">Álbumes</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={search.results}
                    keyExtractor={(item) => `${item.type}-${item.id}`}
                    renderItem={({ item }) => (
                        <MediaCard
                            id={item.id}
                            type={item.type}
                            title={item.title}
                            subtitle={item.subtitle}
                            compact
                            onPress={() => search.openResult(item)}
                            onPlusPress={
                                item.type === "cancion" ? () => search.toggleFavoriteSong(item.id) : undefined
                            }
                            isPlusFilled={item.type === "cancion" && search.isFavoriteSong(item.id)}
                            showChevron={item.type !== "cancion"}
                        />
                    )}
                    ListEmptyComponent={
                        <View className="px-4 py-6">
                            <Text className="text-sm text-[#B3B3B3]">Sin resultados</Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </SafeAreaView>
    );
}
