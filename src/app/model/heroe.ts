import {alphaNumeric, propArray, required} from '@rxweb/reactive-form-validators';

export interface Heroe {
    id: number;
    name: string;
    skill: string;
}


export class SkillForm {
    @required()
    skill: string;
}

export class HeroeForm {

    @required()
    @alphaNumeric()
    name: string;

    @required()
    date: number;

    @required()
    periodo: any;

    @required()
    category: string;

    @propArray(SkillForm, {createBlank: true})
    skill: SkillForm[];
}

