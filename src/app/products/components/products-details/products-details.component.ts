import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  itemId: any;
  itemDetails: any = {};
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductsService) { 
    this.itemId = this.route.snapshot.paramMap.get("id");
    console.log(this.itemId);
  }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails() {
    this.loading = true;
    this.service.getSingleProductDetails(this.itemId).subscribe({
      next: (result: any) => {
        this.loading = false;
        this.itemDetails = result;
      },
      error: (error:any) => {
        alert(error);
        this.loading = false;
      }
    }
      

    )
  }

}
