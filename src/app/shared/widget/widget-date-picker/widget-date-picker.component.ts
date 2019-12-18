/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  8/7/2019
 *
 */

import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {Moment} from 'moment';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

const DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'widget-date-picker',
    templateUrl: './widget-date-picker.component.html',
    styleUrls: ['./widget-date-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WidgetDatePickerComponent),
            multi: true
        },
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
    ]
})
export class WidgetDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() type = 'text';

    @Input() placeHolder = '';

    @Input() floatLabel = '';

    /** Define el atributo appearance del matFormField, permite los mismos valores */
    @Input() appearance = 'outline';

    /** Define si se aplica la clase no-empty al matFormField*/
    @Input() outlineAlways = false;

    /**  Define si se le aplica la case hide-theme-color al matFormField*/
    @Input() hideThemeColorClass = true;

    /**  Controla si el componenten debe mostrar un Skeleton */
    @Input() skeleton = false;

    @Input() exportMilliseconds = true;
    _value;

    inputControl = new FormControl();

    constructor() {
    }

    ngOnInit() {
        this.inputControl.valueChanges
            .pipe(
                untilDestroyed(this),
                tap(val => {
                    try {
                        const date = (val as Moment).toDate();
                        if (this.exportMilliseconds === true) {
                            this._value = date.getTime();
                        } else {
                            this._value = date;
                        }
                        this.onChange(this._value);
                        this.onTouch(this._value);
                    } catch (e) {

                        this._value = null;

                        this.onChange(this._value);
                        this.onTouch(this._value);
                    }

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
        if (!obj) {
            this.inputControl.setValue('');
        } else {
            try {
                let date;
                if (typeof obj === 'string' && obj.trim().length > 0) {
                    date = new Date(obj);
                }
                if (typeof obj === 'number') {
                    date = new Date(obj);
                }
                if (!!date) {
                    this._value = date;
                    this.inputControl.setValue(this._value);
                }
            } catch (e) {
                console.warn('Error en la entrada de la fecha ', obj, e);
            }
        }

    }
}
