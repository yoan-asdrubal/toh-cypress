/*
 *
 * Yoan Asdrubal Quintana Ramirez.
 *  11/6/2019
 *
 */

import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation
} from '@angular/core';
import {Changes} from 'ngx-reactivetoolkit';
import {ReplaySubject} from 'rxjs';
import {MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {filter, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {WidgetFilterComponent} from '@app/shared/widget/widged-filter/widget-filter.component';
import {FilterPipe} from '@app/shared/pipes/filter.pipe';

@Component({
	selector: 'widget-filtered-datatable',
	templateUrl: './widget-filtered-datatable.component.html',
	styleUrls: ['./widget-filtered-datatable.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class WidgetFilteredDatatableComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
	@Input() items: any[];
	@Changes('items') items$;

	filterConfig = {};
	filterConfig$ = new ReplaySubject(1);
	filteredItem$ = new ReplaySubject(1);

	@ContentChild(WidgetFilterComponent, {static: true}) widgetFilterArea: WidgetFilterComponent;
	@ContentChild(MatTable, {static: true}) matTable: MatTable<any>;
	@ContentChild(MatPaginator, {static: true}) matPaginator: MatPaginator;
	dataSource = new MatTableDataSource<any>([null, null, null, null, null, null, null, null, null, null]);
	filterPipe = new FilterPipe();


	@Input() searching;
	@Changes('searching') searching$;
	@Output() searchingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() itemFilteredChange: EventEmitter<any[]> = new EventEmitter<any[]>();

	@Input() showSkeleton = true;
	private firstLoad = true;
	private skeletonValues = [null, null, null, null, null, null, null, null, null, null];

	/** Especifica la configuracion del pageSize para el paginator en caso de existir, por defecto es 10*/
	@Input() pageSize = 10;

	/** Especifica la configuracion del pageSizeOptions para el paginator en caso de existir, por defecto es  [5, 10, 20, 50]*/
	@Input() pageSizeOptions = [5, 10, 20, 50];

	constructor() {
	}

	ngOnInit() {
		if (this.showSkeleton !== true) {
			this.initDatasource([]);
		} else if (this.matTable) {
			this.matTable.dataSource = this.dataSource;
		}
		if (this.widgetFilterArea) {
			if (this.widgetFilterArea.exportFilter === true) {
				this.widgetFilterArea.filter$
					.pipe(
						untilDestroyed(this),
						tap((fil) => {
							this.searching = true;
							this.searchingChange.emit(true);
							this.filterConfig$.next(fil);
						})
					)
					.subscribe();
			} else {
				this.filterConfig$.next({});
				this.widgetFilterArea.selectedChange$
					.pipe(
						untilDestroyed(this)
						, tap(data => {
							this.filteredItem$.next(data);
						})
					)
					.subscribe();
			}
		}

		this.searching$
			.pipe(
				untilDestroyed(this),
				filter(value => value === true),
				tap(() => {
					if (this.showSkeleton !== true) {
						this.initDatasource([]);
					} else {
						this.initDatasource(this.skeletonValues);
					}
				})
			)
			.subscribe();

		this.filteredItem$
			.pipe(
				untilDestroyed(this),
				tap((data: any[]) => {
					if (this.matTable) {
						if (!this.firstLoad) {
							this.initDatasource(data);
							this.searching = false;
							this.searchingChange.emit(false);
							this.itemFilteredChange.emit(data);
						} else {
							this.firstLoad = false;
						}

					}
				})
			)
			.subscribe();

		this.filterConfig$
			.pipe(
				untilDestroyed(this)
				, tap((filt: any) => {
					this.filterConfig = filt;
					const result = this.filterPipe.transform(this.items, filt);
					this.filteredItem$.next(result);
				})
			)
			.subscribe();
		this.items$
			.pipe(
				untilDestroyed(this),
				tap(() => {
					const result = this.filterPipe.transform(this.items, this.filterConfig);
					this.filteredItem$.next(result);
				})
			)
			.subscribe();
	}

	initDatasource(items: any[]) {
		this.dataSource = new MatTableDataSource(items);
		this.dataSource.paginator = this.matPaginator;
		if (this.dataSource.paginator) {
			this.dataSource.paginator.length = items.length;
			this.dataSource.paginator.pageSize = this.pageSize;
			this.dataSource.paginator.pageSizeOptions = this.pageSizeOptions;
			this.dataSource.paginator.firstPage();
		}
		if (this.matTable) {
			this.matTable.dataSource = this.dataSource;
		}
	}

	ngOnDestroy(): void {
	}

	ngOnChanges(): void {
	}

	ngAfterContentInit(): void {

	}
}
