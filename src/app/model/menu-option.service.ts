import {Injectable} from '@angular/core';
import {menuData as menuArrayData, MenuOption} from './menu-option';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuOptionService {
    menuData: MenuOption[] = menuArrayData;
    menuData$: BehaviorSubject<MenuOption[]> = new BehaviorSubject(this.menuData);

    constructor() {

    }

    getMenuDataAsObservable() {
        return this.menuData$.asObservable();
    }
}
