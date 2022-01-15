import React from "react";

import { Badge, Heading, Image, Skeleton, Text, VStack, ZStack } from "native-base";

import { Movie } from "../domain/models/Movie";

interface IMovieCardProps {
  movie?: Movie;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ movie }) => {
  const width = 220;
  const height = 180;

  return movie ? (
    <VStack
      w={width}
      borderWidth="2"
      borderColor="dark"
      borderRadius="xl"
      overflow="hidden">
      <ZStack h={height}>
        <Image
          alt={`${movie.title} poster`}
          w={width}
          h={height}
          source={
            movie.posterUrl
              ? {
                  uri: movie.posterUrl,
                }
              : require("../../assets/poster-placeholder.png")
          }
        />
        <Badge colorScheme="dark" m={1} borderRadius="xl">
          {movie.date.getUTCFullYear()}
        </Badge>
      </ZStack>

      <VStack alignItems="flex-start" space={1} p={3}>
        <Heading size="md" isTruncated>
          {movie.title}
        </Heading>
        <Text numberOfLines={5}>{movie.overview}</Text>
      </VStack>
    </VStack>
  ) : (
    <VStack
      w={width}
      h="100%"
      borderWidth="2"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden">
      <Skeleton h={height} />
      <VStack space={1} p={3}>
        <Skeleton h="6" mb="2" />
        <Skeleton h="3" />
        <Skeleton h="3" />
        <Skeleton h="3" />
        <Skeleton h="3" />
        <Skeleton h="3" />
      </VStack>
    </VStack>
  );
};
