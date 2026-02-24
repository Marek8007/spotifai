import { getFollowedAlbumsAction } from "@/actions/album.actions";
import { getFollowedPlaylistsAction } from "@/actions/playlist.actions";
import { getSavedSongsAction } from "@/actions/song.actions";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { MediaCard } from "@/components/ui/MediaCard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const userId = user?.id;

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
                contentContainerStyle={{ paddingBottom: 32 }}
                ListHeaderComponent={
                    <View className="px-4 pb-6 pt-4">
                        <View className="mb-6 flex-row items-center justify-between">
                            <View>
                                <Text className="text-2xl font-bold text-white">Inicio</Text>
                                <Text className="mt-1 text-sm text-[#B3B3B3]">
                                    {user ? `Bienvenido, ${user.username}` : "Sesión iniciada"}
                                </Text>
                            </View>
                            <Pressable className="rounded-full bg-[#1DB954] px-4 py-2" onPress={logout}>
                                <Text className="font-semibold text-black">Cerrar sesión</Text>
                            </Pressable>
                        </View>

                        <Text className="mb-3 text-lg font-semibold text-white">Playlists seguidas</Text>
                        {playlistsQuery.isLoading && <LoadingSpinner />}
                        {playlistsQuery.isError && (
                            <Text className="text-sm text-red-400">Error cargando playlists</Text>
                        )}
                        {!playlistsQuery.isLoading &&
                            !playlistsQuery.isError &&
                            (playlistsQuery.data?.length ? (
                                <FlatList
                                    data={playlistsQuery.data}
                                    horizontal
                                    keyExtractor={(item) => `playlist-${item.id}`}
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="playlist"
                                            title={item.nombre}
                                            subtitle={
                                                item.numeroCanciones
                                                    ? `${item.numeroCanciones} canciones`
                                                    : "Playlist"
                                            }
                                            imageUrl={item.foto}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : (
                                <EmptyState message="No sigues playlists todavía" />
                            ))}

                        <Text className="mb-3 mt-8 text-lg font-semibold text-white">Álbumes seguidos</Text>
                        {albumsQuery.isLoading && <LoadingSpinner />}
                        {albumsQuery.isError && (
                            <Text className="text-sm text-red-400">Error cargando álbumes</Text>
                        )}
                        {!albumsQuery.isLoading &&
                            !albumsQuery.isError &&
                            (albumsQuery.data?.length ? (
                                <FlatList
                                    data={albumsQuery.data}
                                    horizontal
                                    keyExtractor={(item) => `album-${item.id}`}
                                    renderItem={({ item }) => (
                                        <MediaCard
                                            id={item.id}
                                            type="album"
                                            title={item.nombre}
                                            subtitle={item.artista?.nombre ?? "Álbum"}
                                            imageUrl={item.foto}
                                        />
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : (
                                <EmptyState message="No sigues álbumes todavía" />
                            ))}

                        <Text className="mb-3 mt-8 text-lg font-semibold text-white">Canciones que te gustan</Text>
                        {songsQuery.isLoading && <LoadingSpinner />}
                        {songsQuery.isError && (
                            <Text className="text-sm text-red-400">Error cargando canciones guardadas</Text>
                        )}
                        {!songsQuery.isLoading &&
                            !songsQuery.isError &&
                            !songsQuery.data?.length && (
                                <EmptyState message="No tienes canciones guardadas" />
                            )}
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-4">
                        <MediaCard
                            id={item.id}
                            type="cancion"
                            title={item.nombre}
                            subtitle={item.album?.artista?.nombre ?? item.album?.nombre}
                            imageUrl={item.foto}
                            compact
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
