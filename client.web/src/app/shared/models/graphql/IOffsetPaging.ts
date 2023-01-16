/** EntityGraphQL offset paging schema model */
export interface IOffsetPaging<T> {
    items: T[];

    totalItems: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}