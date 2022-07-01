import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cardProducts: any[] = [];
  total: any = 0;
  quantity: any = 0;
  success: boolean = false;
  constructor(private service: CartsService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cardProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  setQuantityMinus(index: number){
    this.cardProducts[index].quantity--;
    if (this.cardProducts[index].quantity <= 0) {
      this.cardProducts[index].quantity = 0
    }
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cardProducts));
  }

  setQuantityPlus(index: number){
    this.cardProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cardProducts));
  }

  detectChange(){
    localStorage.setItem("cart", JSON.stringify(this.cardProducts));
  }

  deleteProduct(index: number){
    this.cardProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cardProducts));
  }

  clearCart(){
    this.cardProducts = [];
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cardProducts));
  }

  getCartTotal(){
    this.total = 0; 
    for(let i in this.cardProducts){
      this.total += this.cardProducts[i].item.price * this.cardProducts[i].quantity;
    }
    //Math.round(this.total);
  }

  addCart(){
    let products = this.cardProducts.map(item => {
      return {productId: item.item.id, quantity: item.quantity}
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this.service.createNewOrder(model).subscribe({
      next: result => this.success = true,
      error: error => this.success = false
    })

    console.log(model);
  }

}
