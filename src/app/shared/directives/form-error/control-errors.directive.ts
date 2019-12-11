/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  3/4/2019
 *
 */

import {
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Host,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	ViewContainerRef
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FORM_ERRORS} from './form-errors';
import {ControlErrorComponent} from './control-error/control-error.component';
import {ControlErrorContainerDirective} from './control-error-container.directive';
import {FormSubmitDirective} from './form-submit.directive';
import {EMPTY, merge, Observable} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DisableControlDirective} from '@app/shared/directives/disable-reactive-control.directive';

@Directive({
	selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
	ref: ComponentRef<ControlErrorComponent>;
	container: ViewContainerRef;
	submit$: Observable<Event>;
	state$: Observable<any>;
	@Input() customErrors = {};
	@Input() force = false;

	constructor(
		private vcr: ViewContainerRef,
		private resolver: ComponentFactoryResolver,
		@Optional() controlErrorContainer: ControlErrorContainerDirective,
		@Optional() state: DisableControlDirective,
		@Inject(FORM_ERRORS) private errors,
		@Optional() @Host() private form: FormSubmitDirective,
		private controlDir: NgControl) {

		this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
		this.submit$ = this.form ? this.form.submit$ : EMPTY;
		this.state$ = state ? state.stateChange.asObservable() : EMPTY;
	}

	ngOnInit() {
		if (this.control) {
			merge(
				this.submit$,
				this.control.valueChanges,
				this.state$
			).pipe(
				untilDestroyed(this)
			).subscribe((v) => {
				const controlErrors = this.control.errors;
				// console.log('ControlErrorsDirective', this.controlDir.name, controlErrors);

				if (controlErrors && (this.force || this.control.dirty) && this.control.enabled) {
					const firstKey = Object.keys(controlErrors)[0];
					const getError = this.errors[firstKey];
					const text = this.customErrors[firstKey] || (getError && getError(controlErrors[firstKey])) || 'Campo No Válido';
					this.setError(text);
				} else if (this.ref) {
					this.setError(null);
				}
			});
		}
	}

	get control() {
		return this.controlDir.control;
	}

	setError(text: string) {
		if (!this.ref) {
			const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
			this.ref = this.container.createComponent(factory);
		}

		this.ref.instance.text = text;
	}

	ngOnDestroy() {
	}

}
