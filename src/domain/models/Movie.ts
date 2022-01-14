import { API_IMAGE_URL } from "@env";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl?: string;
  date: Date;
}

export interface MovieDto {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
}

export const movieFromDto = (dto: MovieDto): Movie => ({
  id: dto.id,
  title: dto.title,
  overview: dto.overview,
  date: new Date(dto.release_date),
  posterUrl: dto.poster_path ? `${API_IMAGE_URL}/${dto.poster_path}` : undefined,
});
