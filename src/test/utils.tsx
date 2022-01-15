import React from "react";
import { ReactTestRenderer, TestRendererOptions, create } from "react-test-renderer";

import { NativeBaseProvider } from "native-base";

import { theme } from "../util/theme";

const Wrapper: React.FC = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
      {children},
    </NativeBaseProvider>
  );
};

const wrappedCreate = (
  nextElement: React.ReactElement,
  options?: TestRendererOptions,
): ReactTestRenderer => create(<Wrapper>{nextElement}</Wrapper>, options);

export * from "react-test-renderer";
export { wrappedCreate as create };
