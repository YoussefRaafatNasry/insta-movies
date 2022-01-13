import React from "react";

import { Box, Center, FlatList, Text } from "native-base";

import { Movie } from "../domain/models/Movie";
import { MovieCard } from "./MovieCard";

interface IUserMoviesListProps {
  movies: Movie[];
}

export const UserMoviesList: React.FC<IUserMoviesListProps> = (props) => {
  return props.movies.length === 0 ? (
    <Center flex={1}>
      <Text>No Items Found</Text>
    </Center>
  ) : (
    <FlatList<Movie>
      horizontal
      padding={4}
      data={props.movies}
      ItemSeparatorComponent={() => <Box padding={2} />}
      renderItem={({ item }) => <MovieCard key={item.id} movie={item} />}
    />
  );
};
