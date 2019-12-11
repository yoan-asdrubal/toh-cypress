import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {Error404Component} from './components/error404/error404.component';

@NgModule({
    declarations: [NavigationComponent, Error404Component],
    exports: [
        NavigationComponent, Error404Component
    ],
    imports: [
        CommonModule,
        LayoutModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule
    ]
})
export class LayoutAppModule {
}
