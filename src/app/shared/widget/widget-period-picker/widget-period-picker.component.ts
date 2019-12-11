import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {Changes} from 'ngx-reactivetoolkit';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {tap} from 'rxjs/operators';


const MONTH_MODE_FORMATS = {
	parse: {
		dateInput: 'MM/YYYY',
	},
	display: {
		dateInput: 'MMMM - YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'widget-period-picker',
	templateUrl: './widget-period-picker.component.html',
	styleUrls: ['./widget-period-picker.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WidgetPeriodPickerComponent),
			multi: true
		},
		{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{provide: MAT_DATE_FORMATS, useValue: MONTH_MODE_FORMATS}
	]
})
export class WidgetPeriodPickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

	rangeDateCtrl = new FormControl();
	/**
	 * Mat-Label que se mostrará en el mat-form-field del autocomplete
	 */
	@Input() placeHolder = 'Período';

	/** Define el atributo appearance del matFormField, permite los mismos valores */
	@Input() appearance = 'outline';

	/** Define si se aplica la clase no-empty al matFormField*/
	@Input() noEmptyClass = true;

	/**  Define si se le aplica la case hide-theme-color al matFormField*/
	@Input() hideThemeColorClass = true;

	@Input() color = 'accent';

	@Input() skeleton = false;

	@Input() useAsFilter = false;

	_value: { anno: number, mes: number };

	/** Maneja valor minimo a seleccionar por el periodo,
	 *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha */
	@Input() min: any;
	@Changes('min') min$;
	_min: Date;

	/** Maneja valor maximo a seleccionar por el periodo,
	 *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha */
	@Input() max: any;
	@Changes('max') max$;
	_max: Date;

	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
		this.min$
			.pipe(
				untilDestroyed(this),
				tap(val => this.procesarPeriodoMinimo(val))
			)
			.subscribe();
		this.max$
			.pipe(
				untilDestroyed(this),
				tap(val => this.procesarPeriodoMaximo(val))
			)
			.subscribe();
	}

	procesarPeriodoMinimo(obj) {
		if (!!obj) {

			if (typeof obj === 'string') {
				const values: any[] = obj.split('#');
				if (values.length >= 2) {
					this._min = new Date(values[0], values[1] - 1, 1);
				}
			} else if (obj instanceof Date) {
				this._min = obj;
			} else {
				this._min = new Date(obj.anno, obj.mes - 1, 1);
			}
		} else {
			const date = new Date();
			this._min = new Date(date.getFullYear() - 10, date.getMonth() + 1, 1);
		}

	}

	procesarPeriodoMaximo(obj) {
		if (!!obj) {

			if (typeof obj === 'string') {
				const values: any[] = obj.split('#');
				if (values.length >= 2) {
					this._max = new Date(values[0], values[1], 0);
				}
			} else if (obj instanceof Date) {
				this._max = obj;
			} else {
				this._max = new Date(obj.anno, obj.mes - 1, 0);
			}
		} else {
			const date = new Date();
			this._max = new Date(date.getFullYear() - 10, date.getMonth() + 1, 0);
		}

	}

	dateInput(date: Moment, picker) {
		picker.close();
		this.rangeDateCtrl.setValue(date);
		const fecha = new Date(this.rangeDateCtrl.value);
		const newValue = {anno: fecha.getFullYear(), mes: fecha.getMonth() + 1};
		this._value = newValue;
		this.onChange(newValue);
		this.onTouch(newValue);
	}

	ngOnDestroy(): void {
	}

	ngOnChanges(): void {
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

	writeValue(obj: Date | { anno: number, mes: number }): void {
		if (!!obj) {
			if (obj instanceof Date) {
				const newValue = {anno: obj.getFullYear(), mes: obj.getMonth() + 1};
				this._value = newValue;
				this.rangeDateCtrl.setValue(obj);
				this.onChange(newValue);
				this.onTouch(newValue);
			} else {

				this._value = obj;
				this.rangeDateCtrl.setValue(new Date(obj.anno, obj.mes - 1, 1));
			}
		} else {
			const date = new Date();
			const newValue = {anno: date.getFullYear(), mes: date.getMonth() + 1};
			this._value = newValue;
			this.rangeDateCtrl.setValue(date);
			this.onChange(newValue);
			this.onTouch(newValue);
		}
	}

	open() {
		this.opened.emit(true);
	}

	close() {
		this.closed.emit(true);
	}

}
