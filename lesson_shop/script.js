'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodItem{
    constructor(product,img ="img/product_img1.jpg"){
        this.title = product.product_name;
        this.price =  product.price;
        this.img = img;
        this.id = product.id_product;;
    };

    render() {
            return `<article class="product">
                        <div class="product_img">
                            <img src="${this.img}" alt="product-1">
                        </div>
                        <div class="product__overlay">
                            <!-- <button class="btn">Add to cart</button> -->
                            <a href="#" class="product__btn">
                            
                                <p class="text product__btn_text">Добавить в корзину</p>
                            </a>
            
                        </div>
                        <div class="product__info">
                            <a href="product.html" class="product__link">
                                <h3 class="heading_h3">${this.title}</h3>
                            </a>
                            <p class="text product__text">${this.id}</p>
                            <p class="product__text_pink padding_sale">${this.price}</p>
                        </div>
                </article>`;
        }
}


class Goods{
    constructor(){
        this.goods = [];
        this.sumGoods = 0;
        this._getProducts()
         .then(data => { //data - объект js
                 this.goods = [...data];
                 this.render()
            });
        this.summGoods();
        // this.render();
    }

    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    summGoods() {

       this.goods.forEach((good) => {
            if(good.price !== undefined) {
                this.sumGoods+= good.price;
               
            }
        });
        
    };

    render(){
         const block = document.querySelector('.products');

         this.goods.forEach(item => {
             const goodItem = new GoodItem(item);
              block.insertAdjacentHTML("beforeend",goodItem.render());
             
         });

         console.log(`Сумма товаров${this.sumGoods}`);

    };



}



class Basket {
    constructor(container=".header__basket") {
        this.container=container;
        this.goods =[];
        this._clickBasket();
        this._getBasketItem()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }


    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();
            
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }

    _clickBasket(){
        document.getElementById('header__saleButton').addEventListener('click',()=>{
            document.querySelector(this.container).classList.toggle('invisible');
        })
    }

}
class BasketItem {
  
    render(product) {
        return `<div class="header__sale-id" data-id="${product.id_product}">
    <img src="${product.img}" alt="Sale image">
    <div class="header__sale-content">
        <p class="header__sale-title">
            ${product.product_name}
        </p>
        <p class="header__price-item">Цена за товар:$${product.price}</p>
        <p class="header__sale-quantity">Количество: ${product.quantity}</p>
    </div>
    <div class="header__price">
        <p class="product-price">$${product.quantity * product.price}</p>
        
    </div>
    <div class="close">
    <button class="header__sale-close" data-id="${product.id_product}">&times;</button></div>
</div>`
    }
}

let bask = new Basket();



let list = new Goods();








