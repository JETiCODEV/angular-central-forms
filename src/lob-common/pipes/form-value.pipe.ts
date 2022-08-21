import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { tap } from 'rxjs/operators';

//
// This pipe would mainly be used for debugging form values in a template
//

@Pipe({
  name: 'formValue',
})
export class FormValuePipe {
  transform(formGroup: Observable<Readonly<FormGroup>>) {
    const initialValue = new BehaviorSubject(null);

    return formGroup.pipe(
      tap((form) => {
        console.log('formValuePipe', form.getRawValue());
        initialValue.next(form.getRawValue());
      }),
      switchMap((form) =>
        form.valueChanges.pipe(startWith(initialValue.getValue()))
      )
    );
  }
}
