import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isMenuEnabled = new Subject<boolean>();

  constructor() { }

  // Creation de la method pour voire l'etat de side menus
  setMenuState(enabled) {
    this.isMenuEnabled.next(enabled);
  }

  // methode pour get l'etat
  getMenuState(): Subject<boolean> {
    return this.isMenuEnabled;
  }
}
