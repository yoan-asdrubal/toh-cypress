import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeroesRoutingModule} from './heroes-routing.module';
import {HeroesListComponent} from './component/heroes-list/heroes-list.component';
import {HeroesFormComponent} from './component/heroes-form/heroes-form.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {SharedModule} from '../../shared/shared.module';
import {WidgetModule} from '@app/shared/widget/widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [HeroesListComponent, HeroesFormComponent],
    imports: [
        CommonModule,
        RxReactiveFormsModule,
        HeroesRoutingModule,
        SharedModule,
        WidgetModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class HeroesModule {
}
