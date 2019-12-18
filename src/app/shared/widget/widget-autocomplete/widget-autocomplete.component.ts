import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {FilterPipe} from '@app/shared/pipes/filter.pipe';
import {Changes} from 'ngx-reactivetoolkit';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {isNotNullOrUndefined} from '@app/core/util/check_functions.util';

/**
 * Se comporta como un select, permite realizar busqueda sobre las opciones en el frontend
 * Es compatible con los formularios de angular, se puede utilizar con [(ngModel)] o [formControl]
 */
@Component({
	selector: 'widget-autocomplete',
	templateUrl: './widget-autocomplete.component.html',
	styleUrls: ['./widget-autocomplete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WidgetAutocompleteComponent),
			multi: true
		}
	]
})
export class WidgetAutocompleteComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
	/** Conjunto de elementos que se mostrara en las opciones del Select */
	@Input() items: any[] = [];

	@Changes('items') items$;
	/**
	 *  Si es un arreglo de objectos define la propiedad dentro del objeto que se manejara como valor , en caso de ser un
	 * arreglo de objetos y no ser especificada se tomará como value el item completo
	 * */
	@Input() propValue = undefined;

	/** Si es un arreglo de objetos define la propiedad dentro del objeto que se mostrara como label en la opción , en caso de ser
	 * una cadena de string se mostrara el valor de cada objeto
	 * Por defecto se toma la propiedad descripcion
	 * */
	@Input() propLabel = 'descripcion';

	/**
	 * Funcion para generar el label de cada opción, en caso de ser especificada tiene prioridad sobre {@link label}
	 */
	@Input() labelFn: Function = undefined;

	/**
	 * Define las propiedades del objeto sobre las que se aplicará el filtro,
	 * en caso de no especificarse se tomara por defecto el key descripcion
	 */
	@Input() filterKeys = [];

	/**
	 * Template para mostrar cuando no existan resultados en la búsqueda, es opcional.
	 */
	@Input() noResultTemplate: TemplateRef<any>;

	/**
	 * Conjunto de clases que se aplicaran al mat-form-field de la vista
	 */
	@Input() classes = '';

	/**
	 * Define el ancho del panel del Autocomplete, por defecto 100% del elemento sobre el que se muestra
	 */
	@Input() panelWidth = '';
	/**
	 * Mat-Label que se mostrará en el mat-form-field del autocomplete
	 */
	@Input() placeHolder = 'Seleccione';
	/**
	 *  Especifica el texto que se mostrara en la opcion vacia
	 */
	@Input() cleanOptionLabel = 'TODOS';

	/** Define el comportamiento del floatLabel en el matFormField, acepta los mismos valores que el atributo floatLabel del matFormField*/
	@Input() floatLabel = '';
	/**
	 * Define si el campo de búsqueda tendra posicion sticky o no, por defecto es true
	 */
	@Input() stickSearch = true;

	/**
	 * Define si se muestra el campo para filtrar
	 */
	@Input() searcheable = true;

	/** Define si se muestra la opcion TODOS, en la mayoria de los formularios de creacion no se utilizara esta opcion por lo
	 * que se puede especificar este atributo como showAllOption=false
	 * */
	@Input() showAllOption = true;

	/** Define el atributo appearance del matFormField, permite los mismos valores */
	@Input() appearance = 'outline';

	/** Define si se aplica la clase no-empty al matFormField*/
	@Input() outlineAlways = false;


	/**  Controla si el componenten debe mostrar un Skeleton */
	@Input() skeleton = false;

	/**
	 * Define si se muestra el icono en el campo de filtrar
	 */
	@Input() showIconSearch = true;

	/**  Define si el componente estara deshabilitado*/
	@Input() disabled = false;

	@Input() noPadding = false;
	/**
	 * Emite cuando cambia el valor seleccionado
	 */
	@Output() onValueChange = new EventEmitter();

	/**
	 * Controla el valor que está seleccionado
	 */
	_selectedValue: any;


	@Input() useAsFilter = false;

	/**
	 * Input para modificar el valor seleccionado, se llama internamente a la funcion writeValue para que actualize todas las
	 * propiedades correspondientes en el componente {@link _selectedValue} {@link searchFormCtrl} {@link inputFormControl}
	 * y {@link filteredItems$}
	 * @param newValue
	 */
	@Input() set selectedValue(newValue) {
		this.writeValue(newValue);
	}

	/**
	 * Emite los valores filtrados en el componente
	 */
	filteredItems$ = new ReplaySubject<any[]>(1);

	/**
	 * FormControl que controla el campo sobre el que se realiza la busqueda
	 */
	searchFormCtrl = new FormControl('');

	/**
	 * FormControl que controla el valor que se le muestra al usuario al seleccionar un elemento
	 */
	inputFormControl = new FormControl('');

	filterConfig = {};
	/**
	 * Pipe utilizar para realizar la búsqueda
	 */
	filterPipe = new FilterPipe();

	/**
	 *Referencia al panel del autocomplete , se utiliza para abrir o cerrar el mismo segun corresponda
	 */
	@ViewChild('customInput', {read: MatAutocompleteTrigger, static: false}) searchAutoCompletePanel;
	@ViewChild('searchInput', {static: false}) searchInput;

	constructor() {
	}

	/** Parte 1
	 * Emite como valor inicial para {@link filteredItems$} todos los items especificados
	 *
	 * Parte 2
	 * Se subscribe a los cambios en {@link searchFormCtrl} para realizar la búsqueda,
	 * si no es especificado un valor se emite el arreglo de elementos
	 * Si se especifica un valor se configura un filtro en el formato correspondiente para utilizar {@link filterPipe}
	 */
	ngOnInit() {
		// Parte 1
		this.items$
			.pipe(
				untilDestroyed(this),
				tap((items: any[]) => {
					this.items = items;
					if (isNotNullOrUndefined(this.items) && this.items.length > 0) {
						const item = this.findItemByValue(this._selectedValue);
						this.select(item);
					}

					this.applyFilter(this.items, this.filterConfig);
				})
			)
			.subscribe();

		// Parte 2
		this.searchFormCtrl.valueChanges.pipe(
			debounceTime(300)

			, distinctUntilChanged()

			, tap((value: string) => {
					if (!!value && value.trim().length === 0) {
						this.filteredItems$.next(this.items);
					} else {
						this.filterConfig = {
							filter: {
								filter: value,
								keys: this.filterKeys
							}
						};
						this.applyFilter(this.items, this.filterConfig);
					}
				}
			)
		).subscribe();

	}

	ngAfterViewInit(): void {

	}

	ngOnChanges(): void {
	}

	ngOnDestroy(): void {
	}

	selectItem(item) {
		return this.select(item) ? this.emit() : '';
	}

	/**
	 * Selecciona un elemento
	 * Si no se especifica un elemento las variables value y label seran vacias
	 * Si se especifica un elemento, se se la asigna los valores correspondientes en funcion de
	 * {@link labelFn}, {@link propLabel} y {@link propValue}
	 * Se cierra el panel del autocomplete
	 * Se actualizan los valores correspondientes en {@link inputFormControl} y {@link onValueChange}
	 *
	 * Se ejecutan {@link onchange} y {@link onTouch} para comportamiento de ControlValueAccessor
	 * @param item Objeto a seleccionar
	 */
	select(item) {

		let label = item;
		let value = item;
		if (!item) {
			label = '';
			value = '';
		} else {
			if (label !== '') {
				label = this.labelFn ? this.labelFn(item) : item[this.propLabel] || item;
			}
			if (value !== '') {
				value = this.propValue ? item[this.propValue] : item;
			}
		}
		if (this.searchAutoCompletePanel) {
			this.searchAutoCompletePanel.closePanel();
		}
		this.inputFormControl.setValue(label);
		if (this._selectedValue !== value) {
			this._selectedValue = value;
			return true;
		}
		return false;
	}

	public emit() {
		this.onValueChange.emit(this._selectedValue);
		this.onChange(this._selectedValue);
		this.onTouch(this._selectedValue);
	}

	/**
	 * Limpia el campo de búsqueda, previeve la propagacion del evento para que no se cierre el panel del autocomplete
	 * @param event
	 */
	clearSearch(event) {
		event.preventDefault();
		event.stopPropagation();
		this.searchFormCtrl.setValue('');
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

	writeValue(obj: any): void {

		const item = this.findItemByValue(obj);
		let label = item;
		let value = item;
		if (!item) {
			this.inputFormControl.setValue('');
			this._selectedValue = obj;
		} else {
			if (label !== '') {
				label = this.labelFn ? this.labelFn(item) : item[this.propLabel] || item;
			}
			if (value !== '') {
				value = this.propValue ? item[this.propValue] : item;
			}
			this.inputFormControl.setValue(label);
			this._selectedValue = value;
		}
	}

	applyFilter(items, filter) {
		this.stickSearch = false;
		this.filteredItems$.next(this.filterPipe.transform(items, filter));
		this.stickSearch = true;
	}

	/**
	 * Realiza la busqueda de un item dado un valor
	 * Si {@link propValue} es especificado , se compara el valor con item[this.propValue] accediendo a la propiedad del objeto
	 * Si {@link propValue} no es especificado se compara el item completo con el valor
	 *
	 * @param value
	 */
	findItemByValue(value: any) {
		if (!value || !this.items) {
			return null;
		}
		return this.items.find(item => {
			let result = false;
			if (!!this.propValue) {
				result = item[this.propValue].toString() === value.toString();
			} else if (typeof value === typeof item && typeof item === 'string') {
				result = value.toString().trim().toLowerCase() === item.toString().trim().toLowerCase();
			} else if (typeof value === typeof item && typeof item === 'object') {
				const keys = Object.keys(item);
				result = keys.filter(key => value[key] !== item[key]).length === 0 && keys.length === Object.keys(value).length;
			}

			return result;

		});
	}

	inputSearchFocus() {
		setTimeout(() => {
			if (!!this.searchInput) {
				this.searchInput.nativeElement.focus();
			}
		}, 200);
	}
}
