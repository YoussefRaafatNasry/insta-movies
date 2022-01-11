export interface Page<T> {
  page: number;
  items: T[];
  totalPages: number;
}

export interface PageDto<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export const pageFromDto = <TDto, TItem>(
  dto: PageDto<TDto>,
  itemFromDto: (dto: TDto) => TItem,
): Page<TItem> => ({
  page: dto.page,
  items: dto.results.map(itemFromDto),
  totalPages: dto.total_pages,
});
