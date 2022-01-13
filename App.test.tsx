import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />);
    expect(tree.root.children.length).toBe(1);
  });
});