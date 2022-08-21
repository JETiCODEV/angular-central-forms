import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  BaseForms,
  FormService,
} from '../../../lob-common/services/form.service';
import { DealLoaderService } from '../../../lob-common/services/deal-loader.service';
import {
  PropertyForms,
  PropertyFormService,
} from '../../services/property-form.service';
import { PerilsCoveredComponent } from '../../components/perils-covered/perils-covered.component';
import { HeaderContainerComponent } from '../../../lob-common/containers/header-container/header-container.component';
import { DynamicComponentService } from '../../../lob-common/services/dynamic-component.service';

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
export class LobPropertyContainerComponent implements OnDestroy {
  public readonly forms: Observable<PropertyForms>;
  private readonly destroy = new BehaviorSubject<void>(null);

  constructor(
    private readonly dealLoaderService: DealLoaderService,
    private readonly formService: PropertyFormService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly dynamicComponentService: DynamicComponentService
  ) {
    // this.dealLoaderService.loadDeal('test' + Guid.newGuid());
    this.formService.initializeForm();
    this.forms = this.formService.forms$;

    this.formService.formChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((result) =>
        console.log('Container valueChanges', result.base.id)
      );

    // Here we are currently loading the components that we dynamically want to render on the view > but should be handled by the `dynamic-component.service`
    // Also need to double check that this doesn't mess up the lazy loading of the modules
    // Dynamically build up the components for this view
    [PerilsCoveredComponent, HeaderContainerComponent].forEach((component) =>
      this.viewContainerRef.createComponent(component)
    );
  }

  public reloadDeal() {
    this.dealLoaderService.loadDeal(Guid.newGuid());
    this.formService.initializeForm();
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
