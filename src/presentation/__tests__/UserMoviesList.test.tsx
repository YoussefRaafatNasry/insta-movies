import React from "react";

import { Text } from "native-base";

import { create } from "../../test/utils";
import { MovieCard } from "../MovieCard";
import { UserMoviesList } from "../UserMoviesList";

describe("<UserMoviesList />", () => {
  it("renders 'No Items Found!' when list is empty", () => {
    // Arrange
    const tree = create(<UserMoviesList movies={[]} />);

    // Act
    const text = tree.root.findByType(Text);

    // Assert
    expect(text.props.children).toBe("No Items Found!");
  });

  it("renders movies when list has items", () => {
    // Arrange
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

    // Act
    const cards = tree.root.findAllByType(MovieCard);

    // Assert
    expect(cards.length).toBe(1);
  });
});
