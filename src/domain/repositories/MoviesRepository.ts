import { client } from "../../util/client";
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

export class MoviesMockRepository implements IMoviesRepository {
  constructor(public pages: number, public pageSize: number) {}

  async getAll(page: number): Promise<Page<Movie>> {
    const count = this.pageSize * this.pages;
    const ids = [...Array(count).keys()];
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const movies = ids.map<Movie>((i) => ({
      id: i,
      title: `Movie ${i}`,
      overview: "",
      date: new Date(),
    }));

    return {
      page,
      items: movies.slice(start, end < movies.length ? end : undefined),
      totalPages: Math.ceil(this.pages),
    };
  }
}
