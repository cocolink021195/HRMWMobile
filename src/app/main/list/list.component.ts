import { SettingService } from './../../core/services/setting/setting.service';
import { environment } from 'src/environments/environment';
import { ListService } from './service/list.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { GhostListComponent } from 'src/app/shared/controls/ghost-list/ghost-list.component';
import { ItemListFeedbackComponent } from 'src/app/modules/feedback-system/common/item-list/item-list-feedback/item-list-feedback.component';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';
import { takeUntil } from 'rxjs/operators';

@Unsubscriber()
@Component({
  selector: 'ons-page[list]',
  templateUrl: './list.component.html',
  providers: [ListService]
})
export class ListComponent implements OnInit {
  env = environment;
  title = 'Thank You Note (65)';
  isDataNotFound = false;
  options = new LoadingParameter();
  componentRef: ComponentRef<any>;
  tempItemsComponent: ComponentFactory<any>;




  @ViewChild('loadListItem', { static: true, read: ViewContainerRef }) loadListItem: ViewContainerRef;
  @ViewChild('loadListGhost', { static: true, read: ViewContainerRef }) loadListGhost: ViewContainerRef;

  constructor(
    private listService: ListService,
    private settingService: SettingService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadMain();
  }

  ngOnDestroy() { }

  loadMain() {
    this.loadGhostListComponent();
    this.getList();



  }

  getList() {
    this.listService.getData()
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(data => {
        if (data && typeof data == 'object') {
          this.options.TotalSize = data.length;
          this.options.isFull =
            (this.options.Page + 1) * this.options.PageSize >= this.options.TotalSize;
          this.loadListItemComponent(data.splice(0, 10));
        } else {
          this.loadEmptyListItem();
        }
      })
  }

  loadEmptyListItem() {
    this.loadListGhost.clear();
    this.isDataNotFound = true;
  }

  loadListItemComponent(data) {
    if (this.options.TotalSize == 0) {
      this.loadEmptyListItem();
      return;
    }

    let count = 0;
    const _this = this;
    data.forEach(item => {
      _this.tempItemsComponent = this.componentFactoryResolver.resolveComponentFactory(ItemListFeedbackComponent);
      _this.componentRef = this.loadListItem.createComponent(this.tempItemsComponent);
      _this.componentRef.instance.data = item;
      count++;

      if (count == data.length) {
        this.loadListGhost.clear();
        this.options.onScrolling = false;
      }
    })
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