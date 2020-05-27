import { environment } from 'src/environments/environment';
import { ListService } from './service/list.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { GhostListComponent } from 'src/app/shared/controls/ghost-list/ghost-list.component';

@Component({
  selector: 'ons-page[list]',
  templateUrl: './list.component.html',
  providers: [ListService]
})
export class ListComponent implements OnInit {
  title = 'Thank You Note (65)';
  options = new LoadingParameter();
  componentRef: ComponentRef<any>;
  tempItemsComponent: ComponentFactory<any>;




  @ViewChild('loadListTemp', { static: true, read: ViewContainerRef }) loadListTemp: ViewContainerRef;
  @ViewChild('loadListGhost', { static: true, read: ViewContainerRef }) loadListGhost: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadMain();
  }

  ngOnDestroy() { }

  loadMain() {
    this.loadGhostListComponent();




  }










































  loadGhostListComponent() {
    const lstGhost = new Array(1);
    for (let i = 0; i < lstGhost.length; i++) {
      this.tempItemsComponent = this.componentFactoryResolver.resolveComponentFactory(GhostListComponent);
      this.componentRef = this.loadListGhost.createComponent(this.tempItemsComponent);
    }
  }
}

class LoadingParameter {
  constructor(
    public onScrolling: boolean = false,
    public Page: number = 0,
    public PageSize: number = environment.PageSize,
    public TotalSize: number = 0,
    public isFull: boolean = false,
  ) { }
}