import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
	selector: '[fieldEmpty]'
})
export class AddClassFieldEmptyDirective implements OnChanges {
	@Input() public fieldEmpty: any;

	constructor(private hostElement: ElementRef, private render2: Renderer2) {
	}


	ngOnChanges(changes: SimpleChanges): void {
		if (changes.fieldEmpty) {
			if (!!this.fieldEmpty) {
				this.render2.removeClass(this.hostElement.nativeElement, 'field-empty');
			} else {
				this.render2.addClass(this.hostElement.nativeElement, 'field-empty');
			}
		}
	}
}
