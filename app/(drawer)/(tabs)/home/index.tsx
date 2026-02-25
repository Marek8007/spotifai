import { getFollowedAlbumsAction } from "@/actions/album.actions";
import { getFollowedPlaylistsAction } from "@/actions/playlist.actions";
import { getSavedSongsAction } from "@/actions/song.actions";
import { EmptyState } from "@/components/ui/EmptyState";
import { MediaCard } from "@/components/ui/MediaCard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const userId = user?.id;
    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
    };

    const playlistsQuery = useQuery({
        queryKey: ["home", "followed-playlists", userId],
        queryFn: () => getFollowedPlaylistsAction(userId as number),
        enabled: !!userId,
    });

    const albumsQuery = useQuery({
        queryKey: ["home", "followed-albums", userId],
        queryFn: () => getFollowedAlbumsAction(userId as number),
        enabled: !!userId,
    });

    const songsQuery = useQuery({
        queryKey: ["home", "saved-songs", userId],
        queryFn: () => getSavedSongsAction(userId as number),
        enabled: !!userId,
    });

    if (!userId) {
        return (
            <SafeAreaView className="flex-1 bg-[#121212]">
                <EmptyState message="No hay sesión activa" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <FlatList
                data={songsQuery.data ?? []}
                keyExtractor={(item) => `song-${item.id}`}
                renderItem={({ item }) => (
                    <MediaCard
                        id={item.id}
                        type="cancion"
                        title={item.titulo}
                        compact
                    />
                )}
                ListHeaderComponent={
                    <View className="px-4 pb-4 pt-4">
                        <View className="mb-4 flex-row items-center justify-between">
                            <View>
                                <Text className="text-2xl font-bold text-white">Inicio</Text>
                                <Text className="mt-1 text-sm text-[#B3B3B3]">
                                    {user ? `Bienvenido, ${user.username}` : "Sesión iniciada"}
                                </Text>
                            </View>
                            <Pressable className="rounded-full bg-[#1DB954] px-4 py-2" onPress={handleLogout}>
                                <Text className="font-semibold text-black">Cerrar sesión</Text>
                            </Pressable>
                        </View>

                        <Text className="mb-3 text-lg font-semibold text-white">Playlists seguidas</Text>
                        {playlistsQuery.isError && (
                            <Text className="mb-4 text-sm text-red-400">Error cargando playlists</Text>
                        )}
                        {!playlistsQuery.isError &&
                            (playlistsQuery.data?.length ? (
                                <FlatList
                                    horizontal
                                    data={playlistsQuery.data}
                                    keyExtractor={(item) => `playlist-${item.id}`}
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="playlist"
                                            title={item.titulo}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            ) : (
                                <Text className="mb-4 text-sm text-[#B3B3B3]">No sigues playlists todavía</Text>
                            ))}

                        <Text className="mb-3 mt-6 text-lg font-semibold text-white">Álbumes seguidos</Text>
                        {albumsQuery.isError && (
                            <Text className="mb-4 text-sm text-red-400">Error cargando álbumes</Text>
                        )}
                        {!albumsQuery.isError &&
                            (albumsQuery.data?.length ? (
                                <FlatList
                                    horizontal
                                    data={albumsQuery.data}
                                    keyExtractor={(item) => `album-${item.id}`}
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="album"
                                            title={item.titulo}
                                            subtitle={item.artista?.nombre}
                                            imageUrl={item.imagen ?? undefined}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                />
                            ) : (
                                <Text className="mb-4 text-sm text-[#B3B3B3]">No sigues álbumes todavía</Text>
                            ))}

                        <Text className="mb-3 mt-6 text-lg font-semibold text-white">Canciones que te gustan</Text>
                        {songsQuery.isError && (
                            <Text className="mb-4 text-sm text-red-400">
                                Error cargando canciones guardadas
                            </Text>
                        )}
                        {!songsQuery.isError && !songsQuery.data?.length && (
                            <Text className="mb-4 text-sm text-[#B3B3B3]">No tienes canciones guardadas</Text>
                        )}
                    </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
                ListEmptyComponent={songsQuery.isError ? null : <View />}
            />
        </SafeAreaView>
    );
}
