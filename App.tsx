import React from "react";
import { SafeAreaView } from "react-native";
import { MoviesRepository } from "./src/domain/repositories/MoviesRepository";
import { MoviesList } from "./src/ui/MoviesList";

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <MoviesList repository={new MoviesRepository()} />
    </SafeAreaView>
  );
};

export default App;
