import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent }
]


@NgModule({
  declarations: [
    CartComponent,
    HeaderComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [HeaderComponent, ProductsComponent, CartComponent]
})
export class ComponentsModule { }
