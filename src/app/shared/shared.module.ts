import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {HttpClientModule} from '@angular/common/http';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DirectivesModule} from '@app/shared/directives/directives.module';
import {LoadingComponent} from './components/loading/loading.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgSkeletonManModule} from 'ng-skeleton-man';
import {ShContextMenuModule} from 'ng2-right-click-menu';
import {NoResultComponent} from './components/no-result/no-result.component';
import {BlankComponent} from './blank/blank.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        MatBadgeModule,
        HttpClientModule,
        SatDatepickerModule,
        SatNativeDateModule,
        DirectivesModule,
        SweetAlert2Module,
        NgSkeletonManModule,
        ShContextMenuModule,
    ],
    exports: [
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        MatBadgeModule,
        ContentHeaderComponent,
        BreadcrumbComponent,
        HttpClientModule,
        SatDatepickerModule,
        SatNativeDateModule,
        DirectivesModule,
        SweetAlert2Module,
        LoadingComponent,
        NgSkeletonManModule,
        ShContextMenuModule,
        NoResultComponent,
    ],
    declarations: [
        ContentHeaderComponent,
        BreadcrumbComponent,
        LoadingComponent,
        NoResultComponent,
        BlankComponent
    ],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ]
})
export class SharedModule {
}
