import {Component, OnInit} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {FormArray, FormGroup} from '@angular/forms';
import {HeroeForm, SkillForm} from '@app/model/heroe';
import {HeroService} from '@app/model/hero.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-heroes-form',
    templateUrl: './heroes-form.component.html',
    styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent implements OnInit {
    form: FormGroup;
    category: Observable<any>;

    constructor(private formB: RxFormBuilder, private heroS: HeroService) {
    }

    ngOnInit() {
        this.category = this.heroS.getCategory();
        const heroe = new HeroeForm();
        heroe.skill = new Array<SkillForm>();
        this.form = this.formB.formGroup(heroe);
    }

    addSkill() {
        const skills = this.form.controls.skill as FormArray;
        skills.push(this.formB.formGroup(SkillForm));
    }

    saveHero() {
        if (this.form.valid) {
            const value = this.form.value;
            value.skill = (this.form.value.skill as Array<any>).map(skill => skill.skill);
            this.heroS.addHero(value)
                .pipe(
                    tap(() => this.form.reset())
                ).subscribe();
        }
    }

}
