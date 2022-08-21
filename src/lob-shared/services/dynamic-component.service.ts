import { Injectable } from '@angular/core';

//
// Would be responsible to load the correct components
//

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor() {
    console.log('Dynamic Component Service');
  }
}
