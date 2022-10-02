import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.getNumberOfItemsInCart();
  }

  public totalItems : number = 0;
  public items : any = [];

  getNumberOfItemsInCart() {
    this.cartService.getProducts().subscribe(data => {
      this.items = data;
      this.totalItems = data.length;
    })
  }

  getTotalNumberOfItems() {
    this.items.forEach((item : any) => {
      this.totalItems += item.quantity;
    });
  }

}
