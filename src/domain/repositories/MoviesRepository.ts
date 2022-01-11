import { client } from "../../client";
import { Movie, MovieDto, movieFromDto } from "../models/Movie";
import { Page, PageDto, pageFromDto } from "../models/Page";

export interface IMoviesRepository {
  getAll(page: number): Promise<Page<Movie>>;
}

export class MoviesRepository implements IMoviesRepository {
  async getAll(page: number): Promise<Page<Movie>> {
    const path = "/discover/movie";
    const response = await client.get<PageDto<MovieDto>>(path, {
      params: {
        page: page,
      },
    });

    return pageFromDto(response.data, movieFromDto);
  }
}
