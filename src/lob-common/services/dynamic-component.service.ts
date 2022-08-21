import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor() {
    console.log('Dynamic Component Service');
  }
}
