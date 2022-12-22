export enum LoadingStatus {
    Loading,
    Success,
    Error
}

export interface ILoadable<T> {
    status: LoadingStatus;
    data?: T;
}
