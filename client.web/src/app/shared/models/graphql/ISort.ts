export enum SortDirection {
  ASC,
  DESC
}

export type ISort<T> = Partial<Record<keyof T, SortDirection>>;