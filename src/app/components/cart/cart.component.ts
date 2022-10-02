import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTotalPrice();
  }

  public products : any = [];
  public grandTotal : number = 0;

  getProducts() {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  getTotalPrice() {
    this.grandTotal = this.cartService.getTotalPrice();
  }

  removeItem(item : any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllFromCart();
  }

}
