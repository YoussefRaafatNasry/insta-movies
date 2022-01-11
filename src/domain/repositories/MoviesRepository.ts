import { client } from "../../client";
import { Movie, MovieDto, movieFromDto } from "../models/Movie";
import { Page, PageDto, pageFromDto } from "../models/Page";

export interface IMoviesRepository {
  getAll(): Promise<Page<Movie>>;
}

export class MoviesRepository implements IMoviesRepository {
  async getAll(): Promise<Page<Movie>> {
    const response = await client.get<PageDto<MovieDto>>("/discover/movie", {
      params: {
        page: 1, // TODO: use pagination
      },
    });

    return pageFromDto(response.data, movieFromDto);
  }
}
