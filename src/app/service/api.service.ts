import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // fetch data of all the products
  getProduct() {
    return this.http.get("https://fakestoreapi.com/products").pipe(map((data: any) => {
      return data;
    }))
  }
}
