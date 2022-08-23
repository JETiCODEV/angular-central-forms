import { Component } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PropertyFormService } from "src/lob-property/services/property-form.service";

@Component({
  selector: "app-perils-covered-container",
  templateUrl: "./perils-covered-container.component.html",
  styleUrls: ["./perils-covered-container.component.css"],
})
export class PerilsCoveredContainerComponent {
  public readonly perilsCovered: Observable<FormArray<FormControl<string>>>;
  constructor(private readonly formService: PropertyFormService) {
    this.perilsCovered = this.formService.forms$.pipe(
      map((form) => form.perilsCovered)
    );
  }

  public togglePeril(peril: string) {
    this.formService.togglePeril(peril);
  }
}
