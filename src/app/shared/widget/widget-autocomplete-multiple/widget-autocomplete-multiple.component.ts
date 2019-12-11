import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Changes } from 'ngx-reactivetoolkit';
import { ReplaySubject } from 'rxjs';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CustomSelectionModel } from '@app/core/base/customSelectionModel';
import { TitleCasePipe } from '@angular/common';
import { isNotNullOrUndefined } from '@app/core/util/check_functions.util';

@Component({
	selector: 'widget-autocomplete-multiple',
	templateUrl: './widget-autocomplete-multiple.component.html',
	styleUrls: ['./widget-autocomplete-multiple.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WidgetAutocompleteMultipleComponent),
			multi: true
		}
	]
})
export class WidgetAutocompleteMultipleComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
	/**
	 * Items sobre los que se aplicara el filtro, en caso de que se desee mostrar los resultados en el autocomplete se debe
	 * especificar
	 * */
	@Input('items') items: any[];
	@Changes('items') items$;


	/** Ancho del panel del Autocomplete*/
	@Input() panelWidth = '';

	/** Propiedades sobre las que se desea aplicar el filtro en los {@link #items} */
	@Input() keyFilters = [];

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
	 * Mat-Label que se mostrará en el mat-form-field del autocomplete
	 */
	@Input() placeHolder = 'Seleccione';

	/**
	 * Define si el campo de búsqueda tendra posicion sticky o no, por defecto es true
	 */

	@Input() stickSearch = true;

	/** Define el comportamiento del floatLabel en el matFormField, acepta los mismos valores que el atributo floatLabel del matFormField*/
	@Input() floatLabel = '';

	/**
	 * Define si se muestra el campo para filtrar
	 */
	@Input() searcheable = true;
	/** Define el atributo appearance del matFormField, permite los mismos valores */
	@Input() appearance = '';

	/** Define si se aplica la clase no-empty al matFormField*/
	@Input() noEmptyClass = true;

	/**  Define si se le aplica la case hide-theme-color al matFormField*/
	@Input() hideThemeColorClass = true;

	/**  Controla si el componenten debe mostrar un Skeleton */
	@Input() skeleton = false;
	/**
	 * Define si se muestra el icono en el campo de filtrar
	 */
	@Input() showIconSearch = true;

	/** Se utiliza como evento para reaccionar cuando cambia la seleccion*/
	@Output() onValueChange: EventEmitter<any[]> = new EventEmitter<any[]>();

	/** Emite cuando cambia la seleccion, se utiliza para reaccionar desde un componente externo a los cambios de seleccion */
	selectedChange$ = new ReplaySubject(1);

	/** Emite la configuracion del filtro cuando se desea filtrar en otro componente como widget-filtered-datatable */
	@Output() filter: EventEmitter<any> = new EventEmitter();

	/**
	 * FormControl que controla el campo sobre el que se realiza la busqueda
	 */
	searchFormCtrl = new FormControl('');

	/**
	 * FormControl que controla el valor que se le muestra al usuario al seleccionar un elemento
	 */
	inputFormControl = new FormControl('');


	/**  Controla el ultimo valor por el que se realizo la busqueda para mostrarlo en el input manualmente*/
	lastSearch = '';

	/** Controla internamente la seleccion de elementos */
	itemsSelected: CustomSelectionModel<any> = new CustomSelectionModel();

	/** Controla internamente los elementos filtrados para mostrar en el panel del autocomplete */
	filteredItems$ = new ReplaySubject<any[]>(1);

	/** Elementos resultantes de aplicar los filtros */
	filteredItems = [];

	/** Referencia al input de busqueda */
	@ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;

	/** Rererencia al panel del autocomplete*/

	filterPipe = new FilterPipe();

	filterConfig = {};
	_selectedValue: any[];

	constructor(private fb: FormBuilder) {

	}

	/**
	 * Establece configuracion inicial de filtro para el componente
	 *
	 * Si se deben mostrar los elementos en un autocomplete en el componente se valida qeu se hallan especificado
	 * las referencias a los templates para generar el nombre de las columnas y las filas de datos
	 *
	 * Se subscribe al cambio en los {@link items} para aplicar el filtro nuevamente sobre los elementos
	 *
	 * Se subscribe al cambio en el campo de busqueda para emitir filtro
	 *
	 * Se subscribe al cambio en los elementos seleccionados para emitir estos valores.
	 */
	ngOnInit() {


		this.filteredItems = this.items;
		this.filteredItems$.next(this.filteredItems.slice());
		this.items$
			.pipe(
				untilDestroyed(this),
				tap((items: any[]) => {
					this.items = items;
					if (isNotNullOrUndefined(this.items) && this.items.length > 0) {
						this.updateSelectedValues();
					}
					this.applyFilter(this.items, this.filterConfig);
				})
			)
			.subscribe();
		this.searchFormCtrl.valueChanges
			.pipe(
				untilDestroyed(this)

				, distinctUntilChanged()
				, debounceTime(300)
				, tap((value) => {
					this.filterConfig = {
						filter: {
							filter: value,
							keys: this.keyFilters
						}
					};
					this.applyFilter(this.items, this.filterConfig);
				})
			)
			.subscribe();

		this.itemsSelected.selectionChange
			.pipe(
				untilDestroyed(this),
				tap((curr: any[]) => {
					this.select(curr);
				})
			)
			.subscribe();

		this.filteredItems$
			.pipe(
				untilDestroyed(this),
				tap(val => this.itemsSelected.updateSelectedIfNotFound(val))
			)
			.subscribe();
	}

	select(items: any[]) {
		const values = [];
		const labels = [];
		const titleCase = new TitleCasePipe();
		items.forEach(item => {
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
			labels.push(label);
			values.push(value);
		});

		this.inputFormControl.setValue(titleCase.transform(labels.join(', ')));
		this._selectedValue = values;

		this.emit();
	}

	public emit() {
		this.onValueChange.emit(this._selectedValue);
		this.onChange(this._selectedValue);
		this.onTouch(this._selectedValue);
	}

	ngOnChanges(): void {
	}

	ngOnDestroy(): void {
	}

	/**
	 * Aplica los filtros { @param filter} sobre los elementos {@param  items} y emite el resultado de la busqueda.
	 *
	 * @param items
	 * @param filter
	 */
	applyFilter(items, filter) {
		const itemsFil = this.filterPipe.transform(items, filter);
		this.filteredItems = this.ordenarItemsSeleccionados(itemsFil);
		this.filteredItems$.next(this.filteredItems);
	}

	ordenarItemsSeleccionados(items: any[]) {
		const itemsFil = items.slice();
		const length = itemsFil.length;

		for (let i = 0; i < length; i++) {
			for (let j = i + 1; j < length; j++) {
				if (!this.itemsSelected.isSelected(itemsFil[i]) && this.itemsSelected.isSelected(itemsFil[j])) {
					const a = itemsFil[i];
					itemsFil[i] = itemsFil[j];
					itemsFil[j] = a;
				}
			}
		}
		return itemsFil;
	}

	/**
	 * Reacciona al cambio de seleccion de la lista que se muestra en el autocomplete
	 * */
	onItemsSelectionChange(event: MatAutocompleteSelectedEvent) {
		const { value } = event.option;
		this._updateSelected(value);
		this.searchInput.nativeElement.value = this.lastSearch;
	}

	/** Actualiza el estado de seleccion del item especificado */
	private _updateSelected(item) {
		this.itemsSelected.toggle(item);
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

	writeValue(obj: any[]): void {
		if (!obj || obj.length === 0) {
			this.inputFormControl.setValue('');
		} else {
			this._selectedValue = obj;
			this.updateSelectedValues();
		}
	}

	updateSelectedValues() {
		if (!this.items || !this._selectedValue || this.items.length === 0 || this._selectedValue.length === 0) {
			return;
		}

		this.itemsSelected.select(this._selectedValue.map(it => this.findItemByValue(it)).filter(it => !!it));
	}

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

	/**
	 * Limpia el campo de búsqueda, previeve la propagacion del evento para que no se cierre el panel del autocomplete
	 * @param event
	 */
	clearSearch(event) {
		this.inputFormControl.setValue('');
		this.searchFormCtrl.setValue('');
		event.preventDefault();
		event.stopPropagation();
	}

	cleanSelection() {
		this.itemsSelected.clear();
		this._selectedValue = [];
		this.filteredItems = [];
	}

	inputSearchFocus() {
		setTimeout(() => {
			this.searchInput.nativeElement.focus();
		}, 200);
	}
}
