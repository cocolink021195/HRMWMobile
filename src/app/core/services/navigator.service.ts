import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NavigatorService {
  private menu = new Subject();
  private valueShowModal = new Subject();
  private valueHideModal = new Subject();

  constructor() { }

  get menu$(): Observable<any> {
    return this.menu.asObservable();
  }

  get getShowModal$(): Observable<any> {
    return this.valueShowModal.asObservable();
  }

  get getHideModal$(): Observable<any> {
    return this.valueHideModal.asObservable();
  }


  myMenu() {
    this.menu.next();
  }

  showScreenLoading() {
    this.valueShowModal.next();
  }

  hideScreenLoading() {
    this.valueHideModal.next();
  }
}
