import {NgControl} from '@angular/forms';
import {Directive, Input, Optional, Output} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Directive({
	selector: '[disableControl]'
})
export class DisableControlDirective {
	@Output() stateChange = new ReplaySubject(1);

	@Input() set disableControl(condition: boolean) {
		const action = condition ? 'disable' : 'enable';
		if (this.ngControl)
			this.ngControl.control[action]();
		this.stateChange.next(condition);
	}

	constructor(@Optional() private ngControl: NgControl) {
	}

}
