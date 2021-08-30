'use strict';

class GoodItem{
    constructor(item){
        this.title = item.title;
        this.price = item.price;
        this.img = item.img;
        this.description = item.description;
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
                            <p class="text product__text">${this.description}</p>
                            <p class="product__text_pink padding_sale">${this.price}</p>
                        </div>
                </article>`;
        }
}


class Goods{
    constructor(){
        this.goods = [];
        this.sumGoods = 0;
        this._generateProducts();
        this.summGoods();
        this.render();
    }

    _generateProducts(){
        this.goods = [
            { id: 1, title: 'Мужская куртка', price: 5500 ,img:'img/product_img1.jpg',description:'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
            { id: 2, title: 'Женский костюм', price: 3700,img:'img/product_img2.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...' },
            { id: 3, title: 'Мужские шорты', price: 1500,img:'img/product_img3.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...'  },
            { id: 4, title: 'Мужская куртка', price: 5500 ,img:'img/product_img1.jpg',description:'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'},
            { id: 5, title: 'Женский костюм', price: 3700,img:'img/product_img2.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...' },
            { id: 6, title: 'Мужские шорты', price: 1500,img:'img/product_img3.jpg',description:'Не следует, однако, забывать о том, что курс на социально-ориентированный...'  },
        ];
    };

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

class BasketItem {
    // constructor(title,price,img){

    // }

    // render(){

    // }
}

class Basket {
//     constructor() {}
       
    
//     // Добавление товара в корзину 
//     addToBasket() {
        
//     }

//     // Удаление товара из корзины 
//     deleteFromBasket() {}

//     // Считаем стоимость и количество товаров в корзине
//     calcBasket() {}

  
//     // Рендер динамического содержимого корзины
//     render() {}



}

let list = new Goods();








