import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy{
    @Output() showCatagory = new EventEmitter<string>();

    catagories: Array<string> | undefined;
    catagoriesSubscription: Subscription | undefined;

    constructor(private storeService: StoreService) { }
  
    ngOnInit(): void {
      this.catagoriesSubscription = this.storeService.getAllCategories()
      .subscribe((response) => 
      this.catagories = response);
    }

    onShowCatagory(catagory: string): void{
      this.showCatagory.emit(catagory);    
    }

      ngOnDestroy(): void {
        if(this.catagoriesSubscription){
          this.catagoriesSubscription.unsubscribe();
        }
      }


}
