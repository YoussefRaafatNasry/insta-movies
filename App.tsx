import React from "react";

import { HStack, Heading, NativeBaseProvider, StatusBar } from "native-base";

import { HomeScreen } from "./src/screens/HomeScreen";
import { theme } from "./src/util/theme";

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary[500]} barStyle="light-content" />
      <HStack bg="primary.500" px="6" py="3" alignItems="center" justifyContent="center">
        <Heading color="white">InstaMovies</Heading>
      </HStack>
      <HomeScreen />
    </NativeBaseProvider>
  );
};

export default App;
