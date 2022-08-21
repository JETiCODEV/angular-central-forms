import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DealLoaderService } from '../services/deal-loader.service';
import { take, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DealLoadGuard implements CanActivate {
  constructor(private readonly dealLoadService: DealLoaderService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('DealLoadGuard', next.params['dealId']);
    this.dealLoadService.loadDeal(next.params['dealId']);
    return this.dealLoadService.deal.pipe(
      take(1),
      delay(1000),
      map(() => true)
    );
  }
}
