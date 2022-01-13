import React from "react";

import { Box, Center, FlatList, Image, Text } from "native-base";

import { Movie } from "../domain/models/Movie";
import { MovieCard } from "./MovieCard";

interface IUserMoviesListProps {
  movies: Movie[];
}

export const UserMoviesList: React.FC<IUserMoviesListProps> = (props) => {
  return props.movies.length === 0 ? (
    <Center flex={1}>
      <Image size="sm" source={require("../../assets/adaptive-icon.png")} alt="Logo" />
      <Text mt={2} fontWeight="700" opacity={0.48}>
        No Items Found!
      </Text>
    </Center>
  ) : (
    <FlatList<Movie>
      p={4}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={props.movies}
      ItemSeparatorComponent={() => <Box p={2} />}
      renderItem={({ item }) => <MovieCard key={item.id} movie={item} />}
    />
  );
};
