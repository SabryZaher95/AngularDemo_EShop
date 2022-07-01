import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  title: string = 'Categories: ';
  cartProducts: any[] = [];
  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.loading = true;
    this.service.getAllProducts().subscribe({
      next: (result: any) => {
        this.products = result
        this.loading = false
      },
      error: (error: any) => {
        //alert(error)
        this.loading = false
      }
    })
  }

  getCategories(){
    this.loading = true;
    this.service.getAllCategories().subscribe({
      next: (result: any) => {
        this.loading = false;
        this.categories = result;
        console.log(result);
      },
      error: (error: any) => {
        alert(error)
        this.loading = false
      }
    })
  }

  filterProducts(event: any){
    let value = event.target.value;
    /*if (value == 'all'){
      this.getProducts();
    }
    else {
      this.getProductByCategory(value);
    }*/
    (value == 'all')? this.getProducts(): this.getProductByCategory(value);
  }

  getProductByCategory(cat: string){
    this.loading = true;
    this.service.getProductByCat(cat).subscribe({
      next: (result: any) => {
        this.products = result
        this.loading = false;
      },
      error: (error: any) => {
        alert(error)
        this.loading = false
      }
    })
  }

  addToCart(event: any){
    //console.log(event);
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(item => item.item.id == event.item.id);
      if (!exist) {

        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
      else {
        alert("This Product is already in your cart");
      }
    } 
    else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }

  }

}
