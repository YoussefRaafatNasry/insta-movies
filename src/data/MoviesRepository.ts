import { client } from "../client";
import { Movie, MovieDto, movieFromDto } from "./Movie";
import { Page, PageDto, pageFromDto } from "./Page";

// TODO: Change to repository and use DI
export const fetchMovies = async (): Promise<Page<Movie>> => {
  const response = await client.get<PageDto<MovieDto>>("/discover/movie", {
    params: {
      page: 1, // TODO: use pagination
    },
  });

  return pageFromDto(response.data, movieFromDto);
};
