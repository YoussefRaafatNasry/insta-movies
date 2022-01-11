export interface Page<T> {
  page: number;
  items: T[];
}

export interface PageDto<T> {
  page: number;
  results: T[];
}

export const pageFromDto = <TDto, TItem>(
  dto: PageDto<TDto>,
  itemFromDto: (dto: TDto) => TItem
): Page<TItem> => ({
  page: dto.page,
  items: dto.results.map(itemFromDto),
});
