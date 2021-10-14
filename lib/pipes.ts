import {MonoTypeOperatorFunction, Observable, of, pipe} from 'rxjs';
import {ListObjectManager} from '@core/models/list-object-manager.model';
import {tap} from 'rxjs/operators';

/*** RxJs pipes **/
export const debug = <T>(title: string = 'RESPONSE'): MonoTypeOperatorFunction<T> => {
    return pipe(tap((response) => console.log(`${title} => `, response)));
};

export function loadMorePaginatorData<T>(
    list: ListObjectManager<T>,
    paginator: ListObjectManager<T>
): Observable<ListObjectManager<T>> {
    if (!!!list) {
        return of(null);
    }
    return of(list).pipe(
        tap(() => (paginator.paginator.offset = list.paginator.offset)),
        tap(() => (paginator.paginator.size = list.paginator.size)),
        tap(() => (paginator.paginator.total = list.paginator.total)),
        tap(() => {
            if (list.offset === 0) {
                paginator.objects = list.objects;
            } else {
                paginator.objects = [...paginator.objects, ...list.objects];
            }
        })
    );
}
