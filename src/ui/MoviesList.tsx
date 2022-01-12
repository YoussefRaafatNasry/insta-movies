import React from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";

import useSWRInfinite from "swr/infinite";

import { Movie } from "../domain/models/Movie";
import { Page } from "../domain/models/Page";
import { IMoviesRepository } from "../domain/repositories/MoviesRepository";
import { MovieCard } from "./MovieCard";

enum Sections {
  User = "My Movies",
  All = "All Movies",
}

interface IMoviesListProps {
  userMovies: Movie[];
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
      <SectionList<Movie, { key: Sections }>
        sections={[
          {
            key: Sections.User,
            data: props.userMovies,
          },
          {
            key: Sections.All,
            data: movies ?? [],
          },
        ]}
        onEndReachedThreshold={0.1}
        onEndReached={() => setSize(size + 1)}
        renderSectionHeader={({ section }) => <Text>{section.key}</Text>}
        renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
        renderSectionFooter={({ section }) => {
          if (section.data.length === 0) {
            return <Text>No Content</Text>;
          } else if (section.key === Sections.All && isLoadingMore) {
            return <ActivityIndicator color="blue" size="large" />;
          } else {
            return null;
          }
        }}
      />
    </View>
  );
};
