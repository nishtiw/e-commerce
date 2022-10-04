import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService, private cartService: CartService) { 
    
  }

  ngOnInit(): void {

    this.getProducts();
  }

  public productList: any;

  // fetch all data of products
  getProducts() {
    this.api.getProduct().subscribe(data => {
      this.productList = data;
      if(this.cartService.cartItemList.length == 0) {

        this.productList.forEach((data : any) => {
          Object.assign(data, {quantity : 1, total : data.price})
        });
      } else {
        debugger;
        this.productList.forEach((data : any) => { 
          this.cartService.cartItemList.forEach((item : any) => {
            if(data.id == item.id) {
              var qty = item.quantity;
              Object.assign(data, {quantity : qty, total : qty*data.price})
              console.log(data);
            }
          })
          var cartComponent : CartComponent = new CartComponent(this.cartService);
          this.cartService.productList.next(this.cartService.cartItemList);
          cartComponent.getProducts();
        });
      }
      // append quantity and sub total to the product object
    })
  }

  // add items to cart
  addToCart(item: any) {
    this.cartService.addToCart(item);
  }



}
