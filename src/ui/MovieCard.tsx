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
      width={width}
      borderWidth="2"
      borderColor="dark"
      borderRadius="xl"
      overflow="hidden">
      <ZStack h={height}>
        <Image
          alt={`${movie.title} poster`}
          height={height}
          width={width}
          fallbackSource={require("../../assets/poster-placeholder.png")}
          source={{
            uri: movie.posterUrl,
          }}
        />
        <Badge colorScheme="primary" m={1} borderRadius="xl">
          {movie.date.getUTCFullYear()}
        </Badge>
      </ZStack>

      <VStack alignItems="flex-start" space={1} padding={3}>
        <Heading isTruncated>{movie.title}</Heading>
        <Text numberOfLines={5}>{movie.overview}</Text>
      </VStack>
    </VStack>
  ) : (
    <VStack
      h="100%"
      width={width}
      borderWidth="2"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden">
      <Skeleton height={height} />
      <VStack space={1} padding={3}>
        <Skeleton height="6" mb="2" />
        <Skeleton height="3" />
        <Skeleton height="3" />
        <Skeleton height="3" />
        <Skeleton height="3" />
        <Skeleton height="3" />
      </VStack>
    </VStack>
  );
};
