import { Directive, Optional } from "@angular/core";
import { FormControlName, FormGroupDirective } from "@angular/forms";
import { map } from "rxjs/operators";
import { Deal, DealForm } from "src/lob-common/models";
import { BaseForms, FormService } from "src/lob-common/services/form.service";
import { PropertyFormService } from "src/lob-property/services/property-form.service";
import { getControlPath } from "./helpers";

@Directive({
  selector: "[appFormPropertyPath]",
})
export class FormPropertyPathDirective {
  constructor(
    private readonly formControl: FormControlName,
    private readonly formService: PropertyFormService,
    @Optional() private readonly formGroup: FormGroupDirective
  ) {}

  public ngAfterViewInit() {
    const path = getControlPath(this.formControl.control);
    this.formService.diff.pipe().subscribe((diffs) => {
      const changedRoot = Object.entries(this.formService.forms).find(
        ([key, value]) => value === this.formGroup.form
      )?.[0];
      // console.log(diffs[path]);
      debugger;
    });
  }
}
