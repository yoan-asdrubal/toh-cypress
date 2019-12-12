import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './layout/components/error404/error404.component';
import {NavigationComponent} from '@app/layout/components/navigation/navigation.component';
import {TohHomeComponent} from '@app/layout/components/toh-home/toh-home.component';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
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
            {path: '', component: TohHomeComponent},
            {
                path: '**', redirectTo: 'pathNotFound'
            }]
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
