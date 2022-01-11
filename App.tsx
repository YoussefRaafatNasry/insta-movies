import React from "react";
import { SafeAreaView } from "react-native";
import { MoviesList } from "./src/ui/MoviesList";

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <MoviesList />
    </SafeAreaView>
  );
};

export default App;
