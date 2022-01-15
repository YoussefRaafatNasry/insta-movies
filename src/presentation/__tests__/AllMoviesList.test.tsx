import React from "react";

import { FlatList } from "native-base";

import { Movie } from "../../domain/models/Movie";
import { MoviesMockRepository } from "../../domain/repositories/MoviesRepository";
import { ReactTestRenderer, act, create } from "../../test/utils";
import { AllMoviesList } from "../AllMoviesList";

describe("<AllMoviesList />", () => {
  // Arrange
  const pages = 2.5;
  const pageSize = 10;
  const mockRepository = new MoviesMockRepository(pages, pageSize);
  let tree: ReactTestRenderer;

  beforeAll(async () => {
    await act(async () => {
      tree = create(<AllMoviesList repository={mockRepository} />);
    });
  });

  it("renders first page only", async () => {
    // Act
    const list = tree.root.findByType(FlatList);
    const movies = list.props.data as Movie[];

    // Assert
    expect(movies.length).toBe(pageSize);
    expect(movies.at(0)?.id).toBe(0);
    expect(movies.at(-1)?.id).toBe(9);
  });
});
