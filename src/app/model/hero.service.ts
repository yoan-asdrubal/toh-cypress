import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private httpClient: HttpClient) {
    }

    addHero(hero) {
        return this.httpClient.post('http://localhost:8080/hero', hero);
    }

    getCategory() {
        return this.httpClient.get('http://localhost:8080/category');
    }

}
