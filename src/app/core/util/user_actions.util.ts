import {Observable, of} from 'rxjs';
import {catchError, skip, tap} from 'rxjs/operators';


// import * as $ from 'jquery';
declare let $: any;

export class UserActions {

	static stopUntil(source: Observable<any>, obs: Observable<any> = null, show = true, dismiss = true, skipValue = 1): Observable<any> {

		const elem = $('#loader-parent');
		// $(elem).show();
		if (show) {
			$(elem).show();
		}

		const destroyElem = () => $(elem).hide();

		if (obs) {
			const subscription = obs.pipe(
				skip(skipValue)
				, tap(destroyElem)
				).subscribe(() => {
					if (subscription) {
						subscription.unsubscribe();
					}
				}
				)
			;
		}

		return source.pipe(
			tap(() => {
				if (dismiss) {
					destroyElem();
				}
			}),
			catchError((error) => {
				destroyElem();
				return of(error);
			})
		);
	}

	static showLoading() {
		const elem = $('#loader-parent');
		$(elem).show();
	}
}

