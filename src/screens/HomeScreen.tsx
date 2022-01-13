import React, { useState } from "react";
import { ScrollView } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Actionsheet, Box, Fab, Heading, Icon, View, useDisclose } from "native-base";

import { Movie } from "../domain/models/Movie";
import { MoviesRepository } from "../domain/repositories/MoviesRepository";
import { AllMoviesList } from "../presentation/AllMoviesList";
import { NewMovieForm } from "../presentation/NewMovieForm";
import { UserMoviesList } from "../presentation/UserMoviesList";

export const HomeScreen: React.FC = () => {
  const sectionHeight = 420;
  const { isOpen, onOpen, onClose } = useDisclose();
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <View flex={1}>
      <ScrollView>
        <Box h={sectionHeight} py={2}>
          <Heading ml={6}>My Movies</Heading>
          <UserMoviesList movies={movies} />
        </Box>
        <Box h={sectionHeight} py={2}>
          <Heading ml={6}>All Movies</Heading>
          <AllMoviesList repository={new MoviesRepository()} />
        </Box>
      </ScrollView>

      <Fab
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
    </View>
  );
};
