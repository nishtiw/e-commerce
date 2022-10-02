import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  //upon calling this method getProducts(), data will be emitted from productList as it is now an observable
  getProducts() {
    return this.productList.asObservable(); 
  }

  // did not use this method
  setProduct(product : any) {
    this.cartItemList.push(...product);
    this.productList.next(product); //52:17 timestamp
  }

  // check : if item already exists, don't add to cartItemList, instead increase its quantity
  addToCart(product : any) {
    const index = this.cartItemList.findIndex((item : any) => item.id == product.id)
    if(index == -1) {
      this.cartItemList.push(product);
    } 
    else {
      this.cartItemList.forEach((item : any) => {
        if(item.id == product.id) {
          var qty = product.quantity;
          console.log("qty",qty);
          var newQty = qty + 1;
          product.quantity = newQty;
          var total = product.total;
          console.log("total", total);
          var newTotal = newQty * total;
          product.total = newTotal;
        }
      });
    }
    // save in observable
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.saveInfoToLocalStorage();
    console.log(this.cartItemList);
  }

  getTotalPrice() : number {
    let grandTotal = 0;
    this.cartItemList.map((data : any) => {
      grandTotal += data.total;
    })
    return grandTotal;
  }

  removeCartItem(product : any) {
    this.cartItemList.map((data : any, index : any) => {
      if(product.id == data.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.saveInfoToLocalStorage();
    this.productList.next(this.cartItemList);
  }

  removeAllFromCart() {
    this.cartItemList = [];
    this.saveInfoToLocalStorage();
    this.productList.next(this.cartItemList);
  }

  saveInfoToLocalStorage() {
    localStorage.setItem("cartItems",JSON.stringify(this.cartItemList));
  }

  removeInfoFromLocalStorage() {
    localStorage.removeItem("cartItems");
  }

}
