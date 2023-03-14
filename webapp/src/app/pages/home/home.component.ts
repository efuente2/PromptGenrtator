import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HIGH : { [id:number]: number} = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
    cols = 3;
    rowHeight = ROW_HIGH[this.cols];
    catagory: string | undefined;
    products: Array<Product> | undefined;
    sort = 'desc';
    count = '12';
    productSubscriptions: Subscription | undefined;

  
    
    constructor(private cartService: CartService ,private storeService: StoreService ) { }
  
    ngOnInit(): void {
      this.getProducts();
    }

    getProducts(): void{
      this.productSubscriptions = this.storeService.getAllProducts(this.count,this.sort,
        this.catagory)
      .subscribe((_products) => {
        this.products = _products;
      });
    }

    onColumnsCountChange(coslsNumber: number){
      this.cols = coslsNumber;
      this.rowHeight = ROW_HIGH[this.cols];

    }

    onShowCategory(catagory: string): void{
      this.catagory = catagory;
      this.getProducts();
    }

    onAddToCart(product: Product): void{
        this.cartService.addToCart({
          product: product.image,
          name: product.title,
          price: product.price,
          quantity: 1,
          id: product.id});
    }

    onItemsCountChange(count: number): void{
      this.count = count.toString();
      this.getProducts();
    }

    onSortChange(sort: string): void{
      this.sort = sort;
      this.getProducts();
    }

    ngOnDestroy(): void {
    if(this.productSubscriptions){
      this.productSubscriptions.unsubscribe();
    }
    }

}
