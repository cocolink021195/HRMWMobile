import { SettingService } from './../../core/services/setting/setting.service';
import { environment } from 'src/environments/environment';
import { ListService } from './service/list.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { GhostListComponent } from 'src/app/shared/controls/ghost-list/ghost-list.component';
import { ItemListFeedbackComponent } from 'src/app/modules/feedback-system/common/item-list/item-list-feedback/item-list-feedback.component';
import { Unsubscriber } from 'src/app/hocs/unsubscriber.hoc';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  isLoadingData = true;



  private subjectEventSearch: Subject<string> = new Subject();
  @ViewChild('loadListItem', { static: true, read: ViewContainerRef }) loadListItem: ViewContainerRef;
  @ViewChild('loadListGhost', { static: true, read: ViewContainerRef }) loadListGhost: ViewContainerRef;

  constructor(
    private listService: ListService,
    private settingService: SettingService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadMain();
    this.initEventOnSearch();
  }

  ngOnDestroy() { }

  loadMain() {
    this.loadGhostListComponent();
    this.getData();



  }

  getData() {
    this.listService.getData()
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(data => {
        if (data && typeof data == 'object') {
          this.options.TotalSize = data.length;
          this.options.isFull =
            (this.options.Page + 1) * this.options.PageSize >= this.options.TotalSize;
          this.loadListItemComponent(data.splice(0, 20));
        } else {
          this.loadEmptyListItem();
        }
        this.isLoadingData = false;
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

  //#region EVENT SEARCH
  initEventOnSearch() {
    this.subjectEventSearch.pipe(debounceTime(1000))
      .pipe(takeUntil((this as any).destroyed$))
      .subscribe(strSearch => {
        console.log('initEventOnSearch strSearch: ', strSearch);
        this.options = new LoadingParameter();
        this.loadListItem.clear();
        this.isLoadingData = true;
        this.getData();
      });
  }

  eventOnSearch(strSearch) {
    if (strSearch) this.subjectEventSearch.next(strSearch);
  }
  //#endregion









































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