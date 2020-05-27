import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListService {


  constructor(
    private http: HttpClient
  ) { }

  getData(api = '') {
    api = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner';
    return this.http.get<any>(api)
      .pipe(map(result => result));
  }


}
