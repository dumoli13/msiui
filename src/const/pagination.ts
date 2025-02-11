export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ITEMS_PER_PAGE = [5, 10, 20, 30, 40, 50, 100];

export type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
