import React from "react";
import useSWR from "swr";
import { FlatList, View, Text } from "react-native";
import { Movie } from "../data/Movie";
import { fetchMovies } from "../data/MoviesRepository";
import { MovieCard } from "./MovieCard";

export const MoviesList: React.FC = () => {
  // TODO: Use pagination
  const { data, error } = useSWR("movies", fetchMovies);

  if (error)
    return (
      <View>
        <Text>Failed to load!</Text>
      </View>
    );

  // TODO: Use shimmer skeleton
  if (!data)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View>
      <FlatList<Movie>
        data={data?.items}
        renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
      />
    </View>
  );
};
