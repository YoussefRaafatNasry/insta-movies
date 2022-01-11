export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  date: Date;
}

export interface MovieDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const movieFromDto = (dto: MovieDto): Movie => ({
  id: dto.id,
  title: dto.title,
  overview: dto.overview,
  date: new Date(dto.release_date),
  posterUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face/${dto.poster_path}`,
});
