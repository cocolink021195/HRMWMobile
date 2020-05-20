import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ons-page[list]',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  title = 'Cho Thank You Note (9999999999)';
  @ViewChild('loadListTemp', { static: true, read: ViewContainerRef }) loadListTemp: ViewContainerRef;
  @ViewChild('loadListGhost', { static: true, read: ViewContainerRef }) loadListGhost: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }






}
