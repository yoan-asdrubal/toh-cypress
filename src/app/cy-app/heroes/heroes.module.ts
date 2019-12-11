import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeroesRoutingModule} from './heroes-routing.module';
import {HeroesListComponent} from './component/heroes-list/heroes-list.component';
import {HeroesFormComponent} from './component/heroes-form/heroes-form.component';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatButtonModule} from '@angular/material';

@NgModule({
    declarations: [HeroesListComponent, HeroesFormComponent],
  imports: [
    CommonModule,
    RxReactiveFormsModule,
    HeroesRoutingModule,
    MatButtonModule
  ]
})
export class HeroesModule {
}
