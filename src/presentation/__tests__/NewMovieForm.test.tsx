import React from "react";

import { Button, FormControl } from "native-base";

import { ReactTestRenderer, act, create } from "../../test/utils";
import { NewMovieForm } from "../NewMovieForm";

describe("<NewMovieForm />", () => {
  // Arrange
  const handleSubmit = jest.fn();
  let tree: ReactTestRenderer;

  beforeAll(async () => {
    await act(async () => {
      tree = create(<NewMovieForm onMovieSubmit={handleSubmit} />);
    });
  });

  it("validates fields are required", async () => {
    // Act
    const controls = tree.root.findAllByType(FormControl);
    const button = tree.root.findByType(Button);
    await act(async () => button.props.onPress());

    // Assert
    controls.forEach((c) => expect(c.props.isInvalid).toBe(true));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
