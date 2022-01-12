import React, { useState } from "react";
import { Button, Modal, Platform, StatusBar, View } from "react-native";

import { Movie } from "../domain/models/Movie";
import { MoviesRepository } from "../domain/repositories/MoviesRepository";
import { MoviesList } from "../ui/MoviesList";
import { NewMovieForm } from "../ui/NewMovieForm";

export const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              backgroundColor: "grey",
              padding: 24,
            }}>
            <NewMovieForm
              onMovieAdded={(movie) => {
                setMovies((previous) => [movie, ...previous]);
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Button title="Add Movie" onPress={() => setModalVisible(true)} />
      <MoviesList userMovies={movies} repository={new MoviesRepository()} />
    </View>
  );
};
