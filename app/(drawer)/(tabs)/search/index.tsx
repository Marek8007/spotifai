import { getAlbumsAction } from "@/actions/album.actions";
import { getArtistasAction } from "@/actions/artist.actions";
import {
    addSongToPlaylistAction,
    getPlaylistsAction,
    getUserPlaylistsAction,
} from "@/actions/playlist.actions";
import { getPodcastsAction } from "@/actions/podcast.actions";
import { getCancionesAction } from "@/actions/song.actions";
import { MediaCard, MediaType } from "@/components/ui/MediaCard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SearchResult = {
    id: number;
    title: string;
    subtitle?: string;
    type: MediaType;
};

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim().toLowerCase();
    const user = useAuthStore((s) => s.user);

    const userPlaylistsQuery = useQuery({
        queryKey: ["search", "user-playlists", user?.id],
        queryFn: () => getUserPlaylistsAction(user?.id as number),
        enabled: !!user?.id,
    });

    const searchQuery = useQuery({
        queryKey: ["search", normalizedQuery],
        queryFn: async () => {
            const text = normalizedQuery;
            if (text.length < 3) return [] as SearchResult[];

            const [playlists, artistas, albums, canciones, podcasts] = await Promise.all([
                getPlaylistsAction().catch(() => []),
                getArtistasAction().catch(() => []),
                getAlbumsAction().catch(() => []),
                getCancionesAction().catch(() => []),
                getPodcastsAction().catch(() => []),
            ]);

            const playlistResults: SearchResult[] = playlists
                .filter((item) => item.titulo.toLowerCase().includes(text))
                .map((item) => ({
                    id: item.id,
                    title: item.titulo,
                    type: "playlist",
                }));

            const artistResults: SearchResult[] = artistas
                .filter((item) => item.nombre.toLowerCase().includes(text))
                .map((item) => ({
                    id: item.id,
                    title: item.nombre,
                    type: "artista",
                }));

            const albumResults: SearchResult[] = albums
                .filter((item) => item.titulo.toLowerCase().includes(text))
                .map((item) => ({
                    id: item.id,
                    title: item.titulo,
                    type: "album",
                }));

            const songResults: SearchResult[] = canciones
                .filter((item) => item.titulo.toLowerCase().includes(text))
                .map((item) => ({
                    id: item.id,
                    title: item.titulo,
                    type: "cancion",
                }));

            const podcastResults: SearchResult[] = podcasts
                .filter((item) => item.titulo.toLowerCase().includes(text))
                .map((item) => ({
                    id: item.id,
                    title: item.titulo,
                    subtitle: item.descripcion,
                    type: "podcast",
                }));

            return [
                ...playlistResults,
                ...artistResults,
                ...albumResults,
                ...songResults,
                ...podcastResults,
            ];
        },
        enabled: normalizedQuery.length >= 3,
    });

    const data = searchQuery.data ?? [];
    const showInitialButtons = normalizedQuery.length < 3;

    const handleSongAdd = async (songId: number) => {
        if (!user?.id) return;

        const targetPlaylist = userPlaylistsQuery.data?.[0];
        if (!targetPlaylist) {
            Alert.alert("Aviso", "No tienes playlists creadas para añadir canciones");
            return;
        }

        try {
            await addSongToPlaylistAction(targetPlaylist.id, songId, user.id);
            Alert.alert("Ok", `Canción añadida a ${targetPlaylist.titulo}`);
        } catch {
            Alert.alert("Error", "No se pudo añadir la canción a la playlist");
        }
    };

    const handleOpenResult = (item: SearchResult) => {
        if (item.type === "playlist") {
            router.push(`/(stack)/playlist/${item.id}`);
            return;
        }
        if (item.type === "artista") {
            router.push(`/(stack)/artist/${item.id}`);
            return;
        }
        if (item.type === "album") {
            router.push(`/(stack)/album/${item.id}`);
            return;
        }
        if (item.type === "podcast") {
            router.push(`/(stack)/podcast/${item.id}`);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <View className="px-4 pb-3 pt-4">
                <Text className="mb-3 text-2xl font-bold text-white">Buscar</Text>
                <TextInput
                    className="h-[50px] rounded-lg bg-[#282828] px-4 text-white"
                    placeholder="Busca playlists, artistas, álbumes..."
                    placeholderTextColor="#B3B3B3"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            {showInitialButtons ? (
                <View className="flex-1 px-4 pt-2">
                    <View className="mb-3 flex-row gap-3">
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#8D67AB] px-5"
                            onPress={() => router.push("/(stack)/playlists")}
                        >
                            <Text className="text-base font-semibold text-white">Playlists</Text>
                        </Pressable>
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#27856A] px-5"
                            onPress={() => router.push("/(stack)/podcasts")}
                        >
                            <Text className="text-base font-semibold text-white">Podcasts</Text>
                        </Pressable>
                    </View>

                    <View className="flex-row gap-3">
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#E8115B] px-5"
                            onPress={() => router.push("/(stack)/artists")}
                        >
                            <Text className="text-base font-semibold text-white">Artistas</Text>
                        </Pressable>
                        <Pressable
                            className="h-[74px] flex-1 items-start justify-center rounded-xl bg-[#509BF5] px-5"
                            onPress={() => router.push("/(stack)/albums")}
                        >
                            <Text className="text-base font-semibold text-white">Álbumes</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => `${item.type}-${item.id}`}
                    renderItem={({ item }) => (
                        <MediaCard
                            id={item.id}
                            type={item.type}
                            title={item.title}
                            subtitle={item.subtitle}
                            compact
                            onPress={() => handleOpenResult(item)}
                            onPlusPress={
                                item.type === "cancion" ? () => handleSongAdd(item.id) : undefined
                            }
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
