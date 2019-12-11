import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesListComponent} from './component/heroes-list/heroes-list.component';
import {HeroesFormComponent} from './component/heroes-form/heroes-form.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HeroesListComponent},
    {path: 'nuevo', component: HeroesFormComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeroesRoutingModule {
}
