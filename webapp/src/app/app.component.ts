import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  title(title: any): string{
    return "webapp";
  }

 constructor(private cartService: CartService) {}

ngOnInit(): void {
  this.cartService.cart.subscribe((_cart) => {
    this.cart = _cart;
  });
}
cart: Cart = { items: [] };

}
