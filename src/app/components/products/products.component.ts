import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {

    this.getProducts();
  }

  public productList: any;

  // fetch all data of products
  getProducts() {
    this.api.getProduct().subscribe(data => {
      this.productList = data;

      // append quantity and sub total to the product object
      this.productList.forEach((data : any) => {
        Object.assign(data, {quantity : 1, total : data.price})
      });
    })
  }

  // add items to cart
  addToCart(item: any) {
    this.cartService.addToCart(item)
  }

}
