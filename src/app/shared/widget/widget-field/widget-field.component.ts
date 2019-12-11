import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {tap} from 'rxjs/operators';

@Component({
	selector: 'widget-field',
	templateUrl: './widget-field.component.html',
	styleUrls: ['./widget-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WidgetFieldComponent),
			multi: true
		}
	]
})
export class WidgetFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
	@Input() type = 'text';

	@Input() placeHolder = '';

	@Input() floatLabel = '';

	/** Define el atributo appearance del matFormField, permite los mismos valores */
	@Input() appearance = 'outline';

	/** Define si se aplica la clase no-empty al matFormField*/
	@Input() outlineAlways: boolean = false;

	/**  Define si se le aplica la case hide-theme-color al matFormField*/
	@Input() hideThemeColorClass = true;

	@Input() hideOutlineWhenValue = true;
	/**  Controla si el componenten debe mostrar un Skeleton */
	@Input() skeleton = false;

	/**  Define si el componente estara deshabilitado*/
	@Input() disabled = false;

	@Input() noPadding = false;

	@Input() iconPreffix: string;

	@Input() iconSuffix: string;

	@Input() autocomplete = 'on';
	_value: any;

	inputControl = new FormControl();

	constructor() {
	}

	ngOnInit() {
		this.inputControl.valueChanges
			.pipe(
				untilDestroyed(this),
				tap(val => {
					this._value = val;
					this.onChange(this._value);
					this.onTouch(this._value);
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
	}

	onChange: any = () => {
	};
	onTouch: any = () => {
	};

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
	}

	writeValue(obj: string): void {
		this._value = obj;
		this.inputControl.setValue(this._value);
	}

}
