import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {MenuOptionService} from '../../../model/menu-option.service';
import {MenuOption} from '../../../model/menu-option';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    menuData: Observable<MenuOption[]> = this.menuS.getMenuDataAsObservable();

    constructor(private breakpointObserver: BreakpointObserver, private menuS: MenuOptionService) {
    }

}
