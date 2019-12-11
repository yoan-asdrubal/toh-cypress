import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetAutocompleteComponent} from './widget-autocomplete/widget-autocomplete.component';
import {FilterConfigDirective} from './filter-config.directive';
import {

	MatAutocompleteModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatPaginatorModule,
	MatSelectModule,
	MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSkeletonManModule} from 'ng-skeleton-man';
import {WidgetFilterComponent} from '@app/shared/widget/widged-filter/widget-filter.component';
import {WidgetFilteredDatatableComponent} from './widget-datatable/widget-filtered-datatable.component';
import {WidgetPeriodPickerComponent} from './widget-period-picker/widget-period-picker.component';
import {WidgetDatePickerComponent} from '@app/shared/widget/widget-date-picker/widget-date-picker.component';
import {WidgetAutocompleteMultipleComponent} from '@app/shared/widget/widget-autocomplete-multiple/widget-autocomplete-multiple.component';
import {WidgetFieldComponent} from '@app/shared/widget/widget-field/widget-field.component';
import {DirectivesModule} from '@app/shared/directives/directives.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
	declarations: [WidgetAutocompleteComponent, FilterConfigDirective, WidgetFilterComponent, WidgetAutocompleteMultipleComponent,
		WidgetFilteredDatatableComponent, WidgetPeriodPickerComponent, WidgetDatePickerComponent, WidgetFieldComponent],
	exports: [WidgetAutocompleteComponent, WidgetFilteredDatatableComponent, WidgetAutocompleteMultipleComponent,
		WidgetFilterComponent, WidgetPeriodPickerComponent, FilterConfigDirective, WidgetDatePickerComponent, WidgetFieldComponent],
	imports: [
		CommonModule,
		NgSkeletonManModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatListModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatIconModule,
		MatTableModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatDatepickerModule,
		FlexLayoutModule,
		DirectivesModule
	]
})
export class WidgetModule {
}
