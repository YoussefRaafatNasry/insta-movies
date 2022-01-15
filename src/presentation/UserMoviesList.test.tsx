import React from "react";

import { Text } from "native-base";

import { create } from "../test/utils";
import { MovieCard } from "./MovieCard";
import { UserMoviesList } from "./UserMoviesList";

describe("<UserMoviesList />", () => {
  it("renders 'No Items Found!' when list is empty", () => {
    const tree = create(<UserMoviesList movies={[]} />);
    const text = tree.root.findByType(Text);
    expect(text.props.children).toBe("No Items Found!");
  });

  it("renders movies when list has items", () => {
    const tree = create(
      <UserMoviesList
        movies={[
          {
            id: 0,
            title: "Mock Movie",
            date: new Date(2020, 1),
            overview: "Lorem ipsum dolor sit amet",
          },
        ]}
      />,
    );

    const cards = tree.root.findAllByType(MovieCard);
    expect(cards.length).toBe(1);
  });
});
