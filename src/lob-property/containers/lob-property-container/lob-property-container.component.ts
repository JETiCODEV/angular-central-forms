import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { BaseForms, FormService } from 'src/lob-common/services/form.service';
import { DealLoaderService } from '../../../lob-common/services/deal-loader.service';

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

@Component({
  selector: 'app-lob-property-container',
  templateUrl: './lob-property-container.component.html',
  styleUrls: ['./lob-property-container.component.css'],
})
export class LobPropertyContainerComponent {
  public readonly form: Observable<FormGroup>;

  constructor(
    private readonly dealLoaderService: DealLoaderService,
    private readonly formService: FormService<BaseForms>
  ) {
    this.dealLoaderService.loadDeal('test' + Guid.newGuid());
    this.formService.initializeForm();
    this.form = this.formService.form$.pipe(map((forms) => forms.base));
  }

  public reloadDeal() {
    this.dealLoaderService.loadDeal(Guid.newGuid());
    this.formService.initializeForm();
  }
}
