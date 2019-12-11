import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './layout/components/error404/error404.component';
import {TohHomeComponent} from './layout/components/toh-home/toh-home.component';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./cy-app/dasboard/dasboard.module').then((m) => m.DasboardModule)
    },
    {
        path: 'heroes',
        loadChildren: () => import('./cy-app/heroes/heroes.module').then((m) => m.HeroesModule)
    },
    {
        path: 'pathNotFound', component: Error404Component
    },
    {
        path: '', pathMatch: 'full', component: TohHomeComponent
    },
    {
        path: '**', redirectTo: 'pathNotFound'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
