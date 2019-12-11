import {Injectable} from '@angular/core';
import {menuData as menuArrayData} from './menu-option';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuOptionService {
    menuData = menuArrayData;
    menuData$ = new BehaviorSubject(this.menuData);

    constructor() {

    }

    getMenuDataAsObservable() {
        return this.menuData$.asObservable();
    }
}
