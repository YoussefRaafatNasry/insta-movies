import React from "react";

import { Image, Skeleton } from "native-base";

import { create } from "../test/utils";
import { MovieCard } from "./MovieCard";

describe("<MovieCard />", () => {
  it("renders skeletons when no movie provided", () => {
    const tree = create(<MovieCard />);
    const skeletons = tree.root.findAllByType(Skeleton);
    expect(skeletons.length).toBe(7);
  });

  it("renders placeholder image when no image provided", () => {
    const tree = create(
      <MovieCard
        movie={{
          id: 0,
          title: "Mock Movie",
          date: new Date(2020, 1),
          overview: "Lorem ipsum dolor sit amet",
        }}
      />,
    );
    const image = tree.root.findByType(Image);
    const uri = image.props.source;
    expect(typeof uri).toBe("number");
  });
});
