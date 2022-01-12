import React from "react";

import { Badge, Heading, Image, Text, VStack, ZStack } from "native-base";

import { Movie } from "../domain/models/Movie";

export const MovieCard: React.FC<Movie> = (movie) => {
  const width = 220;
  return (
    <VStack width={width} borderWidth="2" borderRadius="xl" borderColor="dark" overflow="hidden">
      <ZStack h={180}>
        <Image
          alt={`${movie.title} poster`}
          height={180}
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
  );
};
