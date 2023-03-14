import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  ADMINLOGIN = false;

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) { }

  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart){
      itemInCart.quantity ++;
    }
    else{
      items.push(item);
    }

    this.cart.next({items});
    this._snackbar.open('Item added to cart', 'Close', { duration: 3000 });
  }

  onRemoveQuantity(item: CartItem): void{
    let itemsForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id){
        _item.quantity --;
        if(_item.quantity === 0){
          this.removeFromCart(item);
        }
      }

      return _item;
    });

    if(itemsForRemoval){
      filteredItems = this.removeFromCart(itemsForRemoval, false);
    }
  }

    getTotal(items: Array<CartItem>): number {
    return items.
    map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void{
    this.cart.next({ items: [] });
    this._snackbar.open('Cart cleared', 'Close', { duration: 3000 });
  }

    removeFromCart(item: CartItem, update = true ): Array<CartItem> {
    const filteredItems  = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if(update){
    this.cart.next({ items: filteredItems });
    this._snackbar.open('Item removed from cart', 'Close', {
       duration: 3000 
      });
  }

  return filteredItems;
}

setLoginStatus(status: boolean): void{
    this.ADMINLOGIN = status;
}

getAdminLoginStatus(): boolean{
    return this.ADMINLOGIN;
}         

}
