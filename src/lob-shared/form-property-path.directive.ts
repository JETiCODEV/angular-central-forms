import { Directive, ElementRef, HostListener, Input, Optional, Renderer2 } from "@angular/core";
import { FormControlName } from "@angular/forms";
import { MatTooltip } from "@angular/material/tooltip";
import { switchMap, tap } from "rxjs/operators";
import { PropertyFormService } from "src/lob-property/services/property-form.service";
import { FormControls } from "../lob-common/services/form.helpers";

@Directive({
    selector: "[appFormPropertyPath]",
    providers: [MatTooltip]
})
export class FormPropertyPathDirective {
    @Input() public appFormPropertyPath: FormControls;

    constructor(
        @Optional() private readonly formControl: FormControlName,
        private readonly formService: PropertyFormService,
        private readonly matToolTip: MatTooltip,
        private readonly renderer: Renderer2,
        private readonly element: ElementRef
    ) {
    }

    public ngAfterViewInit() {
        this.formService.diff.pipe(tap(diffs => {
            const controlToCheck = !this.appFormPropertyPath ? this.formControl.control : this.appFormPropertyPath;
            const changed = diffs.find(x => x.formControl === controlToCheck && x.type !== 'unchanged');
            this.matToolTip.message = changed?.previous ?? null;
            if (changed) {
                this.renderer.addClass(this.element.nativeElement, 'changed');
            } else {
                this.renderer.removeClass(this.element.nativeElement, 'changed');
            }
        }))
            .subscribe();
    }

    @HostListener('mouseover')
    public mouseOver() {
        this.matToolTip.show();
    }

    @HostListener('mouseleave')
    public mouseLeave() {
        this.matToolTip.hide();
    }
}
