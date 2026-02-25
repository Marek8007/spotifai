import { EmptyState } from "@/components/ui/EmptyState";
import { MediaCard } from "@/components/ui/MediaCard";
import { useHomeRoute } from "@/hooks/useHomeRoute";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const home = useHomeRoute();

    if (!home.hasUser) {
        return (
            <SafeAreaView className="flex-1 bg-[#121212]">
                <EmptyState message="No hay sesión activa" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <FlatList
                data={home.savedSongs}
                keyExtractor={(item) => `song-${item.id}`}
                renderItem={({ item }) => <MediaCard id={item.id} type="cancion" title={item.titulo} compact />}
                ListHeaderComponent={
                    <View className="px-4 pb-4 pt-4">
                        <View className="mb-4 flex-row items-center justify-between">
                            <View>
                                <Text className="text-2xl font-bold text-white">Inicio</Text>
                                <Text className="mt-1 text-sm text-[#B3B3B3]">
                                    {home.user ? `Bienvenido, ${home.user.username}` : "Sesión iniciada"}
                                </Text>
                            </View>
                            <Pressable className="rounded-full bg-[#1DB954] px-4 py-2" onPress={home.handleLogout}>
                                <Text className="font-semibold text-black">Cerrar sesión</Text>
                            </Pressable>
                        </View>

                        <Text className="mb-3 text-lg font-semibold text-white">Playlists seguidas</Text>
                        {home.playlistsError && (
                            <Text className="mb-4 text-sm text-red-400">Error cargando playlists</Text>
                        )}
                        {!home.playlistsError &&
                            (home.visiblePlaylists.length ? (
                                <FlatList
                                    horizontal
                                    data={home.visiblePlaylists}
                                    keyExtractor={(item) => `playlist-${item.id}`}
                                    ListHeaderComponent={
                                        <Pressable onPress={home.openLikedSongs} className="mr-4 w-[140px]">
                                            <View className="mb-2 h-[140px] w-[140px] items-center justify-center rounded-lg bg-[#5C3BAA]">
                                                <Ionicons name="heart" size={42} color="#FFFFFF" />
                                            </View>
                                            <Text className="text-sm font-semibold text-white" numberOfLines={2}>
                                                Canciones que te gustan
                                            </Text>
                                            <Text className="mt-0.5 text-xs text-[#B3B3B3]" numberOfLines={1}>
                                                {home.savedSongs.length} canciones
                                            </Text>
                                        </Pressable>
                                    }
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="playlist"
                                            title={item.titulo}
                                            onPress={() => home.openPlaylist(item.id)}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            ) : (
                                <Text className="mb-4 text-sm text-[#B3B3B3]">No sigues playlists todavía</Text>
                            ))}

                        <Text className="mb-3 mt-6 text-lg font-semibold text-white">Álbumes seguidos</Text>
                        {home.albumsError && <Text className="mb-4 text-sm text-red-400">Error cargando álbumes</Text>}
                        {!home.albumsError &&
                            (home.followedAlbums.length ? (
                                <FlatList
                                    horizontal
                                    data={home.followedAlbums}
                                    keyExtractor={(item) => `album-${item.id}`}
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="album"
                                            title={item.titulo}
                                            subtitle={item.artista?.nombre}
                                            imageUrl={item.imagen ?? undefined}
                                            onPress={() => home.openAlbum(item.id)}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            ) : (
                                <Text className="mb-4 text-sm text-[#B3B3B3]">No sigues álbumes todavía</Text>
                            ))}

                        <Text className="mb-3 mt-6 text-lg font-semibold text-white">Canciones que te gustan</Text>
                        {home.songsError && (
                            <Text className="mb-4 text-sm text-red-400">Error cargando canciones guardadas</Text>
                        )}
                        {!home.songsError && !home.savedSongs.length && (
                            <Text className="mb-4 text-sm text-[#B3B3B3]">No tienes canciones guardadas</Text>
                        )}
                    </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
                ListEmptyComponent={home.songsError ? null : <View />}
            />
        </SafeAreaView>
    );
}
