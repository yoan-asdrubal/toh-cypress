import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	QueryList,
	TemplateRef,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {Changes} from 'ngx-reactivetoolkit';
import {FormBuilder, FormControl} from '@angular/forms';
import {merge, ReplaySubject} from 'rxjs';
import {MatAutocompleteOrigin, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {filter, pairwise, skip, tap} from 'rxjs/operators';
import {FilterConfigDirective} from '../filter-config.directive';
import {FilterPipe} from '@app/shared/pipes/filter.pipe';
import {CustomSelectionModel} from '@app/core/base/customSelectionModel';
import {FichaEmpleadoModel} from '@app/core/model/domain';

@Component({
	selector: 'widget-filter',
	templateUrl: './widget-filter.component.html',
	styleUrls: ['./widget-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class WidgetFilterComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, AfterContentInit {
	/**
	 * Items sobre los que se aplicara el filtro, en caso de que se desee mostrar los resultados en el autocomplete se debe
	 * especificar
	 * */
	@Input('items') items: any[] = [];
	@Changes('items') items$;

	/**
	 * Especifica la configuracion para renderizar las columnas en el autocomplete.
	 *
	 * @example
	 * templateConfig = [
	 *              {
	 *			column: 'rut',
	 *			label: 'Rut',
	 *			value: 'id',
	 *			width: '140px'
	 *		    },
	 *              {
	 *			column: 'nombre',
	 *			label: 'Nombre y Apellidos',
	 *			valueFn: (item: EmpleadoModel) => {
	 *				return `${item.nombre} ${item.appaterno} ${item.apmaterno}`;
	 *			    },
	 *			width: '300px'
	 *		    },
	 *        {
	 *			column: 'area',
	 *			label: 'Área',
	 *			valueFn: (item: EmpleadoModel) => {
	 *				return `${item.cnegocio.descripcion}`;
	 *			},
	 *			width: '160px'
	 *		}
	 *]
	 */
	@Input() templateConfig: any[];
	/** Controla si se filtra internamente o se exporta el filtro
	 * Para filtrar desde el widget-filtered-databatle se usa con valor true, para filtrar internamente se usa valor false
	 * */
	@Input() exportFilter = true;

	/** Referencia a un elemento para utilizar como matAutocompleteOrigin */
	@Input() origin: MatAutocompleteOrigin = null;

	/** Referencia al template utilizado para mostrar los elementos en el autocomplete, en caso de utilizarse el autocomplete para mostrar
	 * los datos es obligatorio especificarlo
	 *
	 * @example
	 * <ng-template #itemTemplate let-item="item" let-search="search">
	 *    <div class="search-result-data">
	 *     <div class="column-value">
	 *          <ng-skeleton [isLoading]="search===true" width="75%" height="15px">
	 *              <span>{{item?.id }}</span>
	 *          </ng-skeleton>
	 *     </div>
	 *     <div class="column-value">
	 *          <ng-skeleton [isLoading]="search===true" width="75%" height="15px">
	 *                   <span>{{item?.nombre + ' ' + item?.appaterno + ' ' + item?.apmaterno}}</span>
	 *           </ng-skeleton>
	 *     </div>
	 *     </div>
	 *  </ng-template>
	 * */
	@Input() itemTemplate: TemplateRef<any>;

	/** Referencia al template utilizado para mostrar los nombres de las columnas en el autocomplete
	 *
	 * @example
	 * <ng-template #headerTemplate>
	 <span class="column-title">Rut</span>
	 <span class="column-title">Nombre</span>
	 <span class="column-title">Área</span>
	 </ng-template>
	 * */
	@Input() headerTemplate: TemplateRef<any>;

	/** Ancho del componente*/
	@Input() filterWidth = '100%';

	/** Ancho del campo de busqueda, si no se especifica tomara todo el tamaño disponible en el componente*/
	@Input() searchWidth = '';

	/** Ancho del panel del Autocomplete*/
	@Input() panelWidth = '';

	/** Propiedades sobre las que se desea aplicar el filtro en los {@link #items} */
	@Input() keyFilters = [];

	/** Especifica si se desea que solo emita cuando se adicione elementos*/
	@Input() emitWhenAdd = false;

	/** Se utiliza como evento para reaccionar cuando cambia la seleccion*/
	@Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

	/** Emite cuando cambia la seleccion, se utiliza para reaccionar desde un componente externo a los cambios de seleccion */
	selectedChange$ = new ReplaySubject(1);

	/** Emite la configuracion del filtro cuando se desea filtrar en otro componente como widget-filtered-datatable */
	@Output() filter: EventEmitter<any> = new EventEmitter();

	/** Emite cuando se desea utilizar el filtro desde un componente externo*/
	filter$ = new ReplaySubject(1);
	/** Control para reaccionar al cambio en el campo de busqueda */
	filterControl: FormControl = new FormControl('');

	/** Controla si se esta realizando la busqueda, tiene un campo de entrada y tambien su correpsondiente campo de salida */
	@Input() searching;
	@Changes('searching') searching$;
	@Output() searchingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**  Controla el ultimo valor por el que se realizo la busqueda para mostrarlo en el input manualmente*/
	lastSearch = '';

	/** Controla internamente la seleccion de elementos */
	itemsSelected: CustomSelectionModel<any> = new CustomSelectionModel();

	/** Controla internamente los elementos filtrados para mostrar en el panel del autocomplete */
	filteredItems$ = new ReplaySubject<any[]>(1);

	/** Elementos resultantes de aplicar los filtros */
	filteredItems = [];

	/** Referencia al input de busqueda */
	@ViewChild('searchInput', {static: false}) searchInput: ElementRef<HTMLInputElement>;

	/** Rererencia al panel del autocomplete*/
	@ViewChild('searchInput', {read: MatAutocompleteTrigger, static: false}) searchAutoCompletePanel;

	filterPipe = new FilterPipe();

	/** Controla la configuracion de filtros del componente  */
	filterConfig = {};

	filterCounter = 1;

	private skeletonValues = [null, null, null, null, null];

	@ContentChildren(FilterConfigDirective) filters: QueryList<FilterConfigDirective>;

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

		if (this.exportFilter !== true) {
			this.filteredItems = this.items;
			if (!!this.items) {
				this.filteredItems$.next(this.filteredItems.slice());
			}
			this.items$
				.pipe(
					untilDestroyed(this),
					tap((items: FichaEmpleadoModel[]) => {
						this.searching = false;
						this.searchingChange.emit(false);
						this.applyFilter(items, this.filterConfig);
					})
				)
				.subscribe();
		}

		this.itemsSelected.selectionChange
			.pipe(
				untilDestroyed(this),
				pairwise(),
				tap(([prev, curr]: [any[], any[]]) => {
					if (this.emitWhenAdd !== false) {
						if (prev.length < curr.length) {
							this.selectedChange$.next(curr);
							this.selectedChange.emit(curr);
						}
					} else {
						this.selectedChange$.next(curr);
						this.selectedChange.emit(curr);
					}
				})
			)
			.subscribe();

		this.filteredItems$
			.pipe(
				untilDestroyed(this),
				tap(val => this.itemsSelected.updateSelectedIfNotFound(val))
			)
			.subscribe();

		this.searching$.pipe(
			untilDestroyed(this),
			filter(val => !!val),
			tap(val => this.filteredItems$.next(this.skeletonValues))
			)
			.subscribe();
	}

	ngOnChanges(): void {
	}

	ngOnDestroy(): void {
	}

	/**
	 * Adiciona una nueva configuracion de filtro al {@link filterConfig}
	 */
	keyEnterInputFilter() {
		const value = this.filterControl.value;
		if (!!value) {
			this.filterConfig[`widget_search${this.filterCounter}`] = {
				filter: value,
				keys: this.keyFilters
			};
			this.filterControl.setValue('');
			this.filterCounter++;
			if (this.exportFilter === true) {
				this.filter$.next(this.filterConfig);
				this.filter.emit(this.filterConfig);
			} else {
				this.applyFilter(this.items, this.filterConfig);
			}
		}
	}

	getWidgetConfigValues(): { key: string, filter: string, keys: any[] }[] {
		return Object.keys(this.filterConfig)
			.filter((key: string) => key.startsWith('widget_search'))
			.map(key => ({
				key: key, ...this.filterConfig[key]
			}));
	}


	removeFilter(filter) {
		if (!!this.filterConfig[filter]) {
			delete this.filterConfig[filter];
			if (this.exportFilter !== true) {
				this.applyFilter(this.items, this.filterConfig);
			} else {
				this.filter$.next(this.filterConfig);
				this.filter.emit(this.filterConfig);
			}
		}
	}

	/**
	 * Aplica los filtros { @param filter} sobre los elementos {@param  items} y emite el resultado de la busqueda.
	 *
	 * Modifica el valor de searching a false, y emite el valor para reaccionar con los componentes externos
	 * que necesitan saber el estado de la busqueda.
	 *
	 * @param items
	 * @param filter
	 */
	applyFilter(items, filter) {
		console.log('applyFilter', items, filter);
		this.filteredItems = this.filterPipe.transform(items, filter);
		this.filteredItems$.next(this.filteredItems);
		this.searching = false;
		this.searchingChange.emit(false);
		if (this.searchAutoCompletePanel) {
			this.searchAutoCompletePanel.openPanel();
		}
	}

	ngAfterViewInit(): void {
	}

	/**
	 *  Accede a todas las configuraciones de filtros que se hallan especificado en el contenido del componente.
	 *
	 *  Se suscribe a todas las emisiones de filtros y cada vez que alguna emite actualiza la configuracion del
	 *  filtro {@linl filterConfig}, si se debe exportar el filtro emite {@link filter} y {@link filter$},
	 *  si no debe exportarse y debe aplicarse internamente se aplica el filtro con {@link applyFilter}
	 */
	ngAfterContentInit(): void {
		const localFilters = merge(...this.filters.map(item => item.filter.pipe(skip(1))));
		localFilters
			.pipe(
				tap(value => {
						this.filterConfig = Object.assign({}, this.filterConfig, value);
					}
				),
				tap(() => {
					if (this.exportFilter !== true) {
						this.applyFilter(this.items, this.filterConfig);
					} else {
						this.filter$.next(this.filterConfig);
						this.filter.emit(this.filterConfig);
					}
				})
			)
			.subscribe();
	}

	/**
	 * Reacciona al cambio de seleccion de la lista que se muestra en el autocomplete
	 * */
	onItemsSelectionChange(event: MatAutocompleteSelectedEvent) {
		const {value} = event.option;
		this._updateSelected(value);
		this.searchInput.nativeElement.value = this.lastSearch;
	}

	/** Actualiza el estado de seleccion del item especificado */
	private _updateSelected(item) {
		this.itemsSelected.toggle(item);
	}

	/**
	 *  Cambia el estado general de la seleccion,si hay algun elemento seleccionado limpia la seleccion,
	 *  se hace de esta forma porque si se seleccionan todos los elementos se emitiran como cambio y en muchos casos no es el comportamiento
	 *  deseado, luego si no hay ninguno seleccionado se seleccionan todos.
	 */
	masterToggle() {

		if (this.itemsSelected.hasValue()) {
			this.itemsSelected.clear();
		} else {
			this.itemsSelected.select(this.filteredItems);
		}
	}

	flexGrowToSearchInput() {
		if (this.searchWidth === '') {
			return '1 1';
		}
		return '';
	}
}
