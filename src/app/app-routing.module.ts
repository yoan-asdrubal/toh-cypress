import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './layout/components/error404/error404.component';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./cy-app/dasboard/dasboard.module').then((m) => m.DasboardModule)
    },
    {
        path: 'pathNotFound', component: Error404Component
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
