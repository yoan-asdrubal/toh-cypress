import {Directive, ElementRef, Input, OnInit, ViewContainerRef} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {fromEvent, Observable, ReplaySubject} from 'rxjs';

export interface FilterConfigValue {
	name: string;
	keys: any;
}

@Directive({
	selector: '[filterConfig]'
})
export class FilterConfigDirective implements OnInit {
	@Input() filterConfig: FilterConfigValue;
	@Input() name: string;
	@Input() keys: any;

	filter = new ReplaySubject(1);

	emitter: Observable<any>;
	value = '';

	constructor(private host: ElementRef, private vcRef: ViewContainerRef) {
		if (host.nativeElement['type'] === 'text' || host.nativeElement['type'] === 'textarea') {
			this.emitter = fromEvent(host.nativeElement, 'keyup')
				.pipe(
					map((ele: any) => ele.target.value)
				);
			this.value = host.nativeElement.value;
		} else {
			const component = vcRef['_data']['componentView']['component'];
			if (component.hasOwnProperty('onValueChange')) {
				this.emitter = component['onValueChange'];
			}
			if (component.hasOwnProperty('value')) {
				this.value = component['value'];
			}
		}
	}

	ngOnInit(): void {
		const keys = this.keys || this.filterConfig.keys;
		if (!keys) {
			throw new Error(this.name + ' debe tener especificado los campos donde aplicara el filtro');
		}
		const name = this.name || this.filterConfig.name || (typeof keys === 'string' ? keys : keys.join('-'));
		if (!this.emitter) {
			throw new Error(this.name + ' debe estar asociado a  Input o TextArea, o algun componente con el evento onValueChange');
		}
		this.emitter
			.pipe(
				distinctUntilChanged(),
				debounceTime(300),
				tap(value => {
					const localFilter = {};
					localFilter[name] = {
						filter: value,
						keys: typeof keys === 'string' ? keys.split(',') : keys
					};
					this.filter.next(localFilter);
				})
			)
			.subscribe();
		const localFilter = {};
		localFilter[name] = {
			filter: this.value,
			keys: typeof keys === 'string' ? keys.split(',') : keys
		};
		this.filter.next(localFilter);
	}
}
