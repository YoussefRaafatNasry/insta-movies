import React from "react";

import { Box, FlatList, Text } from "native-base";
import useSWRInfinite from "swr/infinite";

import { Movie } from "../domain/models/Movie";
import { Page } from "../domain/models/Page";
import { IMoviesRepository } from "../domain/repositories/MoviesRepository";
import { PageKeyConverter } from "../util/PageKeyConverter";
import { MovieCard } from "./MovieCard";

interface IMoviesListProps {
  repository: IMoviesRepository;
}

export const MoviesList: React.FC<IMoviesListProps> = (props) => {
  const converter = new PageKeyConverter("movies?page=");

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPage: Page<Movie>) => {
      const nextPageIndex = pageIndex + 1;
      const hasMore = previousPage && previousPage?.totalPages < nextPageIndex;
      return hasMore ? null : converter.toKey(nextPageIndex);
    },
    (key) => {
      const pageIndex = converter.toIndex(key);
      return props.repository.getAll(pageIndex);
    },
    {
      initialSize: 1,
      revalidateFirstPage: false,
    },
  );

  const lastPage = data?.slice(-1)[0];
  const isLoadingInitialData = !data && !error;
  const hasMore = lastPage && lastPage?.page < lastPage?.totalPages;
  const isLoadingMore = !isLoadingInitialData && size > 1 && hasMore;
  const movies = data?.reduce<Movie[]>((acc, page) => acc.concat(page.items), []);

  if (error) return <Text>Failed to load!</Text>;

  if (isLoadingInitialData)
    return (
      <FlatList
        horizontal
        padding={4}
        data={[...Array(4).keys()]}
        renderItem={() => <MovieCard />}
        ItemSeparatorComponent={() => <Box padding={2} />}
      />
    );

  return (
    <FlatList<Movie>
      horizontal
      padding={4}
      data={movies}
      ItemSeparatorComponent={() => <Box padding={2} />}
      onEndReachedThreshold={0}
      onEndReached={() => setSize(size + 1)}
      renderItem={({ item }) => <MovieCard key={item.id} movie={item} />}
      ListFooterComponent={() => {
        return isLoadingMore ? (
          <Box pl={4} pr={8}>
            <MovieCard />
          </Box>
        ) : null;
      }}
    />
  );
};
