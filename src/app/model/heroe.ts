import {alphaNumeric, propArray, required} from '@rxweb/reactive-form-validators';

export interface Heroe {
    id: number;
    name: string;
    skill: string;
}

export class HeroeForm {
    @required()
    id: number;

    @required()
    @alphaNumeric()
    name: string;

    @propArray()
    skill: string[];
}
