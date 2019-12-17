import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Heroe} from '@app/model/heroe';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private httpClient: HttpClient) {
    }

    addHero(hero) {
        return this.httpClient.post('http://localhost:8080/hero', hero);
    }
}
