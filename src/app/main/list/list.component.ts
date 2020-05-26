import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ons-page[list]',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  title = 'Thank You Note (65)';
  @ViewChild('loadListTemp', { static: true, read: ViewContainerRef }) loadListTemp: ViewContainerRef;
  @ViewChild('loadListGhost', { static: true, read: ViewContainerRef }) loadListGhost: ViewContainerRef;

  constructor() { }

  ngOnInit() {
  }






}
