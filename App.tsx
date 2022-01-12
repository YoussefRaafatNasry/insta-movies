import React from "react";

import { NativeBaseProvider } from "native-base";

import { HomeScreen } from "./src/screens/HomeScreen";

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <HomeScreen />
    </NativeBaseProvider>
  );
};

export default App;
