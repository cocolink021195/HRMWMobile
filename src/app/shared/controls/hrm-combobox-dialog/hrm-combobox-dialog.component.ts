import { environment } from './../../../../environments/environment';
import { HrmApiService } from './../../../core/services/hrm-api/hrm-api.service';
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import * as $ from 'jquery';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'hrm-combobox-dialog',
  templateUrl: './hrm-combobox-dialog.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HrmComboboxDialogComponent),
      multi: true
    }
  ]
})
export class HrmComboboxDialogComponent implements OnInit {
  env = environment;
  @Input() id: string;
  @Input() value: any;
  @Input() multi: any;
  @Input() keyname: string;
  @Input() keyvalue: string;
  @Input() placeholder: string;
  @Output() valueChange = new EventEmitter();
  data: any;
  chooseValue: any;
  tmpChooseValue: any;
  displayValue: string;
  uniqueID = Date.now();
  isLoadingData = false;
  options = new LoadingParameter();


  private subscription: Subscription = new Subscription();
  private subjectEventSearch: Subject<string> = new Subject();

  constructor(
    private hrmApi: HrmApiService
  ) { }

  ngOnInit() {
    this.initControl();
    this.initEventOnSearch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initControl() {
    if ('true' == this.multi) this.multi = true; else this.multi = false;

    console.log('this.value: ', this.value);

    this.getData();
  }

  getData() {
    const unsubscribe = this.hrmApi.testingPost().subscribe(data => {
      console.log(`testingPost: ${this.id} - ${this.keyvalue} - ${this.keyname} - ${this.multi} - ${this.value}`, data);
      this.isLoadingData = true;
      this.data = data.splice(0, 20);
    })

    this.subscription.add(unsubscribe);
  }

  eventOKHandler() {
    console.log('[this.id, this.chooseValue]: ', [this.id, this.chooseValue]);

    this.displayValue = this.handleDisplayValue(this.chooseValue, this.keyname);
    this.eventSendValue([this.id, this.chooseValue]);
  }

  eventRadioHandler(value, item) {
    console.log('eventRadioHandler: ', value, item);
    this.chooseValue = [item];
  }

  eventCheckboxHandler(value, item) {
    this.tmpChooseValue = this.validationChecked(this.tmpChooseValue, value, item, this.keyvalue);
    console.log('eventCheckboxHandler: ', value, item);
    console.log('this.tmpChooseValue: ', this.tmpChooseValue);
  }

  validationChecked(listValue, value, item, keyvalue) {
    if (typeof listValue != 'object' || false == Array.isArray(listValue) || listValue.length == 0)
      listValue = [];

    if (value && item && typeof item == 'object') {
      const isDuplicate = listValue.some(item =>
        (item[keyvalue] + '').toLocaleLowerCase() == (value + '').toLocaleLowerCase());
      if (isDuplicate) {
        listValue = listValue.filter(item =>
          (item[keyvalue] + '').toLocaleLowerCase() != (value + '').toLocaleLowerCase());
      } else {
        listValue = [...listValue, item];
      }
    }

    return listValue;
  }

  checkedRadioOrCheckbox(arrValue) {
    if (arrValue) {
      const suffixTagName = true == this.multi ? 'ons-checkbox' : 'ons-radio';
      const tagName = `#${this.id} ${suffixTagName}`;

      const lstSelector = $(tagName);
      if (lstSelector) {
        $.each(lstSelector, (index, element) => {
          element.checked = arrValue.includes(element.value);
        });
      }
    }
  }

  //#region EVENT SCROLL
  eventOnScroll(event) {
    const dcScroll = event.srcElement;
    if (!dcScroll) return;

    if (dcScroll.scrollTop + dcScroll.clientHeight >= dcScroll.scrollHeight - 150 && !this.options.isFull && !this.options.onScrolling) {
      this.options.onScrolling = true;
      this.options.Page++;
      this.options.isFull = (this.options.Page + 1) * this.options.PageSize >= this.options.TotalSize;

      if ((0 == (this.options.Page * this.options.PageSize) % 40) && false == this.options.isFull) {
        this.isLoadingData = false;
      }

      console.log('getDataTable: ');
    }
  }
  //#endregion

  //#region EVENT SEARCH
  initEventOnSearch() {
    const unsubscribe = this.subjectEventSearch.pipe(debounceTime(1000))
      .subscribe(strSearch => {
        console.log('initEventOnSearch strSearch: ', strSearch);

      });

    this.subscription.add(unsubscribe);
  }

  eventOnSearch(strSearch) {
    if (strSearch) this.subjectEventSearch.next(strSearch);
  }
  //#endregion










































  handleDisplayValue(data, keyname) {
    let strDisplay = '';
    if (typeof data == 'object' && data.length > 0)
      strDisplay = data.map(item => item[keyname]).toString();

    return strDisplay;
  }

  trackByFn(index) {
    return 'tbfn-' + this.uniqueID + '-' + index;
  }

  writeValue(value: any) { }

  eventSendValue([id, chooseValue]) {
    const data = [id, chooseValue];
    this.propagateChange(data);
  }

  propagateChange = (v: any) => this.valueChange.emit(v);

  registerOnChange = (fn) => this.propagateChange = fn;

  registerOnTouched() { }
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