import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  ADMINLOGIN: boolean = this.cartService.getAdminLoginStatus();

  @Input() 
  get cart(): Cart{
    return this._cart;
  }

  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }


  constructor(private cartService: CartService, private router:Router) { }

  ngOnInit(): void {
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  logout(){
    localStorage.removeItem('Admin');
    this.router.navigate(["/login"]);
  }
  

}
