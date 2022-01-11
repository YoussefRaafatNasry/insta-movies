import React from "react";
import useSWRInfinite from "swr/infinite";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Movie } from "../domain/models/Movie";
import { IMoviesRepository } from "../domain/repositories/MoviesRepository";
import { MovieCard } from "./MovieCard";
import { Page } from "../domain/models/Page";

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

  if (error)
    return (
      <View>
        <Text>Failed to load!</Text>
      </View>
    );

  // TODO: Use shimmer skeleton
  if (isLoadingInitialData)
    return (
      <View>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );

  return (
    <View>
      <FlatList<Movie>
        data={movies}
        renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => setSize(size + 1)}
        ListFooterComponent={
          !isLoadingMore ? null : <ActivityIndicator color="blue" size="large" />
        }
      />
    </View>
  );
};
