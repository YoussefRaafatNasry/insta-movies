import React from "react";

import { Button, FormControl } from "native-base";

import { ReactTestRenderer, act, create } from "../test/utils";
import { NewMovieForm } from "./NewMovieForm";

describe("<NewMovieForm />", () => {
  const handleSubmit = jest.fn();
  let tree: ReactTestRenderer;

  beforeAll(async () => {
    await act(async () => {
      tree = create(<NewMovieForm onMovieAdded={handleSubmit} />);
    });
  });

  it("validates fields are required", async () => {
    const controls = tree.root.findAllByType(FormControl);
    const button = tree.root.findByType(Button);

    await act(async () => button.props.onPress());

    controls.forEach((c) => expect(c.props.isInvalid).toBe(true));
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
