import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign } from "@expo/vector-icons";
import { Actionsheet, Box, Fab, Heading, Icon, useDisclose } from "native-base";

import { Movie } from "../domain/models/Movie";
import { MoviesRepository } from "../domain/repositories/MoviesRepository";
import { AllMoviesList } from "../presentation/AllMoviesList";
import { NewMovieForm } from "../presentation/NewMovieForm";
import { UserMoviesList } from "../presentation/UserMoviesList";

export const HomeScreen: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}>
      <Box flex={1}>
        <Heading ml={4}>My Movies</Heading>
        <UserMoviesList movies={movies} />
      </Box>
      <Box flex={1}>
        <Heading ml={4}>All Movies</Heading>
        <AllMoviesList repository={new MoviesRepository()} />
      </Box>

      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={onOpen}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <NewMovieForm
            onMovieAdded={(movie) => {
              setMovies((previous) => [movie, ...previous]);
              onClose();
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
};
