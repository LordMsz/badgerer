import { catchError, combineLatest, map, Observable, of, OperatorFunction, shareReplay, startWith, tap, throwError } from "rxjs";
import { ILoadable, LoadingStatus } from "./ILoadable";

export class LoadingContext {
    public observables?: Observable<any>[];
    public status?: Observable<LoadingStatus> = of(LoadingStatus.Loading);
}

/**
 * Operator is a wrapper for HTTP requests that returns the data itself plus async operation status.
 * For switchmaps (http calls) based on non-completing hot observables (e.g. route.params or stores) use this directly INSIDE switchMap
 * @param callback should be passed if we want to catch the ettot, if there is no callback, error will be thrown
 * @param loadingContext an instance of tracking object for multiple loadables
 * @example
 * // simple example
 * this.data$ = this.httpservice.getsomethin().pipe(
 *  withLoading()
 * );
 * 
 * // for multiple loadables
 * this.data$ = this.route.params.pipe(
 *  map(p => p.code),
 *  switchmap(c => this.httpService.getSomethin(c) .pipe(
 *  // putting loadable here makes sure we re-register it when route.params triggers
 *  // and http call starts over (because whole observable already started once with "loading" status)
 *  withLoading(this.loadingContext)
 *  ))
 * );
 */
export function withLoading<G>(callback?: (e: any) => void): OperatorFunction<G, ILoadable<G>>;
export function withLoading<G>(loadingContext?: LoadingContext): OperatorFunction<G, ILoadable<G>>;
export function withLoading<G>(callback?: (e: any) => void, loadingContext?: LoadingContext): OperatorFunction<G, ILoadable<G>>;

// implementation for oveerloads above
export function withLoading<G>(
    param1?: ((e: any) => void) | LoadingContext,
    loadingContextParam?: LoadingContext
): OperatorFunction<G, ILoadable<G>> {
    // we need to use union type above to allow the overrides of the method; so first we find out what parameters we really received
    const callback: (e: any) => void = param1 instanceof LoadingContext ? null : param1;
    const loadingContext: LoadingContext = loadingContextParam ?? (param1 instanceof LoadingContext ? param1 : null);

    return <T>(obs$: Observable<T>): Observable<ILoadable<T>> => {
        // when we have loading context (expecting multiple loadables), we need to have shareReplay to avoid duplicate calls
        const baseObs$ = loadingContext ? obs$.pipe(shareReplay({ bufferSize: 1, refCount: true })) : obs$;

        // this is the observable we return out; it will startWith loading and error handling
        const result$ = baseObs$.pipe(
            map((data: T) => ({ status: LoadingStatus.Success, data })),
            startWith({ status: LoadingStatus.Loading }),
            catchError((e) => {
                if (callback) {
                    callback(e);

                    return of({ status: LoadingStatus.Error });
                } else {
                    return throwError(() => e).pipe(
                        startWith({ status: LoadingStatus.Error })
                    );
                }
            })
        );

        if (loadingContext) {
            // if we gather loading context we add base observable (without loading!) into list
            if (!loadingContext.observables) {
                loadingContext.observables = [baseObs$];
            } else {
                loadingContext.observables = [...loadingContext.observables, baseObs$];
            }

            // and make a combined observable from all currently known "loading" observables
            loadingContext.status = combineLatest(loadingContext.observables).pipe(
                catchError(_ => of({ status: LoadingStatus.Error })),
                tap(() => loadingContext.observables = []), // this is a reset of context since we know all known observables ticked
                withLoading(),
                map(d => d.status)
            );
        }

        return result$;
    }
}
