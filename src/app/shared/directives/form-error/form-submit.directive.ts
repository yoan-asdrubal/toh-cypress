import {ChangeDetectorRef, Directive, ElementRef, Optional} from '@angular/core';
import {fromEvent} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {FormGroup, FormGroupDirective} from '@angular/forms';

@Directive({
	selector: 'form'
})
export class FormSubmitDirective {
	submit$ = fromEvent(this.element, 'submit')
		.pipe(tap(() => {
			if (this.element.classList.contains('submitted') === false) {
				this.element.classList.add('submitted');
			}
			if (this.formGroup) {
				this.markFormGroupDirty(this.formGroup.control);
			}
			if (this.changeDef) {
				this.changeDef.markForCheck();
			}
		}), shareReplay(1));

	constructor(private host: ElementRef<HTMLFormElement>, @Optional() private formGroup: FormGroupDirective
		, @Optional() private changeDef: ChangeDetectorRef) {
	}

	get element() {
		return this.host.nativeElement;
	}

	/**
	 * Marks all controls in a form group as touched
	 * @param formGroup - The form group to touch
	 */
	private markFormGroupDirty(formGroup: FormGroup) {
		Object.keys(formGroup.controls).map(x => formGroup.controls[x]).forEach((control: any) => {
			control.markAsDirty();

			if (control.controls) {
				this.markFormGroupDirty(control);
			}
		});
	}
}
