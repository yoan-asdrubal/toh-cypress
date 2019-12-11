import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSubmitDirective} from '@app/shared/directives/form-error/form-submit.directive';
import {ControlErrorsDirective} from '@app/shared/directives/form-error/control-errors.directive';
import {ControlErrorContainerDirective} from '@app/shared/directives/form-error/control-error-container.directive';
import {ControlErrorComponent} from '@app/shared/directives/form-error/control-error/control-error.component';
import {DisableControlDirective} from '@app/shared/directives/disable-reactive-control.directive';
import {AddClassFieldEmptyDirective} from './add-class-field-empty.directive';
import {SpecialCharacterRestrictDirective} from './form-error/special-character-restrict.directive';

@NgModule({
    declarations: [FormSubmitDirective, ControlErrorsDirective, ControlErrorContainerDirective, ControlErrorComponent, DisableControlDirective, AddClassFieldEmptyDirective, SpecialCharacterRestrictDirective],
    exports: [FormSubmitDirective, ControlErrorsDirective, ControlErrorContainerDirective, ControlErrorComponent, DisableControlDirective, AddClassFieldEmptyDirective, SpecialCharacterRestrictDirective],
    entryComponents: [ControlErrorComponent],
    imports: [
        CommonModule
    ]
})
export class DirectivesModule {
}
