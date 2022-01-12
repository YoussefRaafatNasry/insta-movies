import React from "react";

import { Box, Center, FlatList, Spinner, Text } from "native-base";
import useSWRInfinite from "swr/infinite";

import { Movie } from "../domain/models/Movie";
import { Page } from "../domain/models/Page";
import { IMoviesRepository } from "../domain/repositories/MoviesRepository";
import { MovieCard } from "./MovieCard";

interface IMoviesListProps {
  repository: IMoviesRepository;
}

export const MoviesList: React.FC<IMoviesListProps> = (props) => {
  const keyPrefix = "movies?page=";
  const pageToKey = (page: number) => `${keyPrefix}${page}`;
  const keyToPage = (key: string) => parseInt(key.replace(keyPrefix, ""));

  const { data, error, size, setSize } = useSWRInfinite(
    (page: number, previousData: Page<Movie>) => {
      const nextPage = page + 1;
      const hasMore = previousData && nextPage > previousData?.totalPages;
      return hasMore ? null : pageToKey(nextPage);
    },
    (key) => {
      const page = keyToPage(key);
      return props.repository.getAll(page);
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

  // TODO: Use shimmer skeleton
  if (isLoadingInitialData) return <Spinner />;

  return (
    <FlatList<Movie>
      horizontal
      padding={4}
      data={movies}
      ItemSeparatorComponent={() => <Box padding={2} />}
      onEndReachedThreshold={0}
      onEndReached={() => setSize(size + 1)}
      renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
      ListFooterComponent={() => {
        return isLoadingMore ? (
          <Center padding={8} flex={1}>
            <Spinner size="lg" />
          </Center>
        ) : null;
      }}
    />
  );
};
