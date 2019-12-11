import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[specialCharacterRestrict]'
})

export class SpecialCharacterRestrictDirective {
	@Input() specialCharacterRestrict : string;
	regexStr = '^[a-zA-Z0-9_]*$';
	@Input() isAlphaNumeric: boolean;

	constructor(private el: ElementRef) {
console.log(this.specialCharacterRestrict)
	}

	@HostListener('keypress', ['$event']) onKeyPress(event) {
		return new RegExp(this.specialCharacterRestrict).test(event.key);
	}

	@HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
		this.validateFields(event);
	}

	validateFields(event) {
		setTimeout(() => {
			this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
			event.preventDefault();

		}, 100);
	}

}