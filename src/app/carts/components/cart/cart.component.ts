import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cardProducts: any[] = [];
  total: any = 0;
  quantity: any = 0;
  constructor() { }

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

  getCartTotal(){
    this.total = 0; 
    for(let i in this.cardProducts){
      this.total += this.cardProducts[i].item.price * this.cardProducts[i].quantity;
    }
    //Math.round(this.total);
  }

}
