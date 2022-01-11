import React from "react";
import useSWR from "swr";

import { FlatList, Text, View } from "react-native";
import { Movie } from "../domain/models/Movie";
import { IMoviesRepository } from "../domain/repositories/MoviesRepository";
import { MovieCard } from "./MovieCard";

interface IMoviesListProps {
  repository: IMoviesRepository;
}

export const MoviesList: React.FC<IMoviesListProps> = (props) => {
  // TODO: Use pagination
  const { data, error } = useSWR("movies", props.repository.getAll);

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
