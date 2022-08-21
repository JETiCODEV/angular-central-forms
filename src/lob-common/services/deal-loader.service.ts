import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Deal } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DealLoaderService {
  public readonly deal = new BehaviorSubject<Deal | null>(null);

  public loadDeal(id: string) {
    console.log('Loading deal', id);
    this.deal.next({
      id: 'id - ' + id,
      reference: 'reference - ' + id,
    });
  }
}
